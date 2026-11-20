# TP2-React-Laprida

App **Comedor IPF** para el TP2 de React Native, armada con Expo Router, TypeScript y Expo SDK 57.

## Arrancar la app

```bash
npm ci
npm run start
```

## Rutas y navegadores

```text
src/
├── app/
│   ├── _layout.tsx                  # Stack raíz y GestureHandlerRootView
│   ├── +not-found.tsx               # 404
│   ├── pedido.tsx                   # Redirección a /carrito
│   ├── buscar.tsx                   # /buscar, Stack raíz
│   ├── confirmar.tsx                # /confirmar, modal en el Stack raíz
│   ├── login.tsx                    # /login, modal en el Stack raíz
│   ├── categorias/
│   │   └── [categoria].tsx          # /categorias/:categoria, Stack raíz
│   ├── turno/
│   │   └── [numero].tsx             # /turno/:numero, Stack raíz
│   ├── ayuda/
│   │   ├── _layout.tsx              # Stack de ayuda
│   │   ├── index.tsx                # /ayuda
│   │   └── [...slug].tsx            # /ayuda/...
│   ├── cocina/
│   │   ├── _layout.tsx              # Drawer
│   │   ├── index.tsx                # /cocina
│   │   └── atendidos.tsx            # /cocina/atendidos
│   └── (tabs)/
│       ├── _layout.tsx              # Tabs de Inicio, Menú y Carrito
│       ├── index.tsx                # /
│       ├── menu/
│       │   ├── _layout.tsx          # Stack de la tab Menú
│       │   ├── index.tsx            # /menu
│       │   └── [id].tsx             # /menu/:id
│       └── carrito/
│           ├── _layout.tsx          # Stack de la tab Carrito
│           ├── index.tsx            # /carrito
│           └── nota.tsx             # /carrito/nota
├── components/
│   └── PlaceholderPage.tsx
├── data/
│   └── platos.ts
├── context/
│   └── AppContext.tsx
└── estructuras/
    ├── Pila.ts
    └── Cola.ts
```

El Stack raíz contiene las Tabs y las pantallas que deben abrirse por encima de ellas. Menú y Carrito tienen su propio Stack; Cocina tiene un Drawer. En esta primera etapa las rutas muestran pantallas provisionales: la lógica de datos, sesión y pedidos se completa en los próximos pasos.

`Pila<T>` y `Cola<T>` usan campos privados. La Cola avanza un índice de frente y compacta el almacenamiento cuando hace falta, sin usar `Array.shift()`. Ambas estructuras permiten consultar su tamaño y obtener una copia de sus elementos con `aArray()`.

`src/data/platos.ts` contiene 12 platos de ejemplo, tres por categoría. Los precios son valores de referencia en pesos argentinos.

El `AppProvider` del layout raíz comparte la sesión, el carrito, la cola de pedidos y el historial de atendidos. Para probar el acceso de cocina, el usuario fijo es `cocina` y la clave es `ipf2026`.