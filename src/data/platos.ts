export type CategoriaPlato = 'desayuno' | 'almuerzo' | 'bebidas' | 'kiosco';

export type Plato = {
  id: number;
  nombre: string;
  categoria: CategoriaPlato;
  precio: number;
  descripcion: string;
};

export const platos: Plato[] = [
  {
    id: 1,
    nombre: 'Café con leche',
    categoria: 'desayuno',
    precio: 1800,
    descripcion: 'Café con leche caliente, servido en taza.',
  },
  {
    id: 2,
    nombre: 'Medialunas',
    categoria: 'desayuno',
    precio: 1500,
    descripcion: 'Dos medialunas de manteca recién horneadas.',
  },
  {
    id: 3,
    nombre: 'Tostado de jamón y queso',
    categoria: 'desayuno',
    precio: 3200,
    descripcion: 'Pan tostado con jamón y queso fundido.',
  },
  {
    id: 4,
    nombre: 'Milanesa con puré',
    categoria: 'almuerzo',
    precio: 6500,
    descripcion: 'Milanesa de carne con puré de papas.',
  },
  {
    id: 5,
    nombre: 'Tarta de verduras',
    categoria: 'almuerzo',
    precio: 4800,
    descripcion: 'Porción de tarta casera de verduras de estación.',
  },
  {
    id: 6,
    nombre: 'Empanadas de carne',
    categoria: 'almuerzo',
    precio: 4200,
    descripcion: 'Dos empanadas de carne al horno.',
  },
  {
    id: 7,
    nombre: 'Agua mineral',
    categoria: 'bebidas',
    precio: 1200,
    descripcion: 'Botella de agua mineral sin gas de 500 ml.',
  },
  {
    id: 8,
    nombre: 'Jugo de naranja',
    categoria: 'bebidas',
    precio: 1800,
    descripcion: 'Jugo de naranja frío, botella de 300 ml.',
  },
  {
    id: 9,
    nombre: 'Gaseosa',
    categoria: 'bebidas',
    precio: 2000,
    descripcion: 'Lata de gaseosa de 354 ml.',
  },
  {
    id: 10,
    nombre: 'Alfajor de chocolate',
    categoria: 'kiosco',
    precio: 1300,
    descripcion: 'Alfajor relleno de dulce de leche y cubierto de chocolate.',
  },
  {
    id: 11,
    nombre: 'Turrón de maní',
    categoria: 'kiosco',
    precio: 900,
    descripcion: 'Barrita de turrón de maní.',
  },
  {
    id: 12,
    nombre: 'Papas fritas',
    categoria: 'kiosco',
    precio: 1600,
    descripcion: 'Paquete individual de papas fritas.',
  },
];
