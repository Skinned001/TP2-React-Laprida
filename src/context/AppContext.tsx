import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { Cola } from '../estructuras/Cola';
import { Pila } from '../estructuras/Pila';
import { Plato } from '../data/platos';

export type ItemCarrito = {
  plato: Plato;
  cantidad: number;
};

export type Pedido = {
  numero: number;
  items: ItemCarrito[];
  total: number;
  nota: string;
  creadoEn: string;
};

export type ResultadoLogin =
  | { exito: true }
  | { exito: false; mensaje: string };

type AppContextValue = {
  usuario: string | null;
  logueado: boolean;
  iniciarSesion: (usuario: string, clave: string) => ResultadoLogin;
  cerrarSesion: () => void;
  carrito: ItemCarrito[];
  cantidadCarrito: number;
  totalCarrito: number;
  puedeDeshacer: boolean;
  agregarAlCarrito: (plato: Plato) => void;
  deshacerUltimo: () => boolean;
  notaCarrito: string;
  setNotaCarrito: (nota: string) => void;
  pedidosPendientes: Pedido[];
  cantidadEnEspera: number;
  proximoPedido: Pedido | undefined;
  pedidosAtendidos: Pedido[];
  confirmarPedido: () => number;
  atenderSiguiente: () => Pedido | undefined;
};

const AppContext = createContext<AppContextValue | null>(null);

const USUARIO_COCINA = 'cocina';
const CLAVE_COCINA = 'ipf2026';

export function AppProvider({ children }: PropsWithChildren) {
  const [usuario, setUsuario] = useState<string | null>(null);
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [cantidadAccionesDeshacer, setCantidadAccionesDeshacer] = useState(0);
  const [notaCarrito, setNotaCarrito] = useState('');
  const [pedidosPendientes, setPedidosPendientes] = useState<Pedido[]>([]);
  const [pedidosAtendidos, setPedidosAtendidos] = useState<Pedido[]>([]);

  const carritoActual = useRef<ItemCarrito[]>([]);
  const accionesCarrito = useRef(new Pila<number>());
  const colaPedidos = useRef(new Cola<Pedido>());
  const historialAtendidos = useRef(new Pila<Pedido>());
  const proximoNumeroPedido = useRef(1);

  const iniciarSesion = useCallback((usuarioIngresado: string, clave: string): ResultadoLogin => {
    if (usuarioIngresado !== USUARIO_COCINA || clave !== CLAVE_COCINA) {
      return { exito: false, mensaje: 'El usuario o la clave no son correctos.' };
    }

    setUsuario(USUARIO_COCINA);
    return { exito: true };
  }, []);

  const cerrarSesion = useCallback(() => {
    setUsuario(null);
  }, []);

  const agregarAlCarrito = useCallback((plato: Plato) => {
    accionesCarrito.current.push(plato.id);
    setCantidadAccionesDeshacer(accionesCarrito.current.tamanio);

    const existente = carritoActual.current.find((item) => item.plato.id === plato.id);
    const nuevoCarrito = existente
      ? carritoActual.current.map((item) =>
          item.plato.id === plato.id ? { ...item, cantidad: item.cantidad + 1 } : item,
        )
      : [...carritoActual.current, { plato: { ...plato }, cantidad: 1 }];

    carritoActual.current = nuevoCarrito;
    setCarrito(nuevoCarrito);
  }, []);

  const deshacerUltimo = useCallback((): boolean => {
    const platoId = accionesCarrito.current.tope();
    if (platoId === undefined) return false;

    const item = carritoActual.current.find((actual) => actual.plato.id === platoId);
    if (!item) {
      throw new Error(`No se encontró el plato ${platoId} para deshacer la acción.`);
    }

    accionesCarrito.current.pop();
    setCantidadAccionesDeshacer(accionesCarrito.current.tamanio);

    const nuevoCarrito =
      item.cantidad === 1
        ? carritoActual.current.filter((actual) => actual.plato.id !== platoId)
        : carritoActual.current.map((actual) =>
            actual.plato.id === platoId ? { ...actual, cantidad: actual.cantidad - 1 } : actual,
          );

    carritoActual.current = nuevoCarrito;
    setCarrito(nuevoCarrito);
    return true;
  }, []);

  const confirmarPedido = useCallback((): number => {
    if (carritoActual.current.length === 0) {
      throw new Error('No se puede confirmar un pedido con el carrito vacío.');
    }

    const items = carritoActual.current.map((item) => ({
      plato: { ...item.plato },
      cantidad: item.cantidad,
    }));
    const numero = proximoNumeroPedido.current;
    const pedido: Pedido = {
      numero,
      items,
      total: items.reduce((total, item) => total + item.plato.precio * item.cantidad, 0),
      nota: notaCarrito,
      creadoEn: new Date().toISOString(),
    };

    colaPedidos.current.encolar(pedido);
    proximoNumeroPedido.current += 1;
    setPedidosPendientes(colaPedidos.current.aArray());

    carritoActual.current = [];
    setCarrito([]);
    while (!accionesCarrito.current.vacia) accionesCarrito.current.pop();
    setCantidadAccionesDeshacer(0);
    setNotaCarrito('');

    return numero;
  }, [notaCarrito]);

  const atenderSiguiente = useCallback((): Pedido | undefined => {
    const pedido = colaPedidos.current.desencolar();
    if (!pedido) return undefined;

    historialAtendidos.current.push(pedido);
    setPedidosPendientes(colaPedidos.current.aArray());
    setPedidosAtendidos(historialAtendidos.current.aArray().reverse());
    return pedido;
  }, []);

  const cantidadCarrito = carrito.reduce((total, item) => total + item.cantidad, 0);
  const totalCarrito = carrito.reduce(
    (total, item) => total + item.plato.precio * item.cantidad,
    0,
  );

  const value = useMemo<AppContextValue>(
    () => ({
      usuario,
      logueado: usuario !== null,
      iniciarSesion,
      cerrarSesion,
      carrito,
      cantidadCarrito,
      totalCarrito,
      puedeDeshacer: cantidadAccionesDeshacer > 0,
      agregarAlCarrito,
      deshacerUltimo,
      notaCarrito,
      setNotaCarrito,
      pedidosPendientes,
      cantidadEnEspera: pedidosPendientes.length,
      proximoPedido: pedidosPendientes[0],
      pedidosAtendidos,
      confirmarPedido,
      atenderSiguiente,
    }),
    [
      usuario,
      iniciarSesion,
      cerrarSesion,
      carrito,
      cantidadCarrito,
      totalCarrito,
      cantidadAccionesDeshacer,
      agregarAlCarrito,
      deshacerUltimo,
      notaCarrito,
      pedidosPendientes,
      pedidosAtendidos,
      confirmarPedido,
      atenderSiguiente,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe usarse dentro de AppProvider.');
  }
  return context;
}
