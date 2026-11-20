# Respuestas del TP2

## Parte A — Estructuras de datos: la pila y la cola

### A1. Conceptos

**a)** LIFO significa *Last In, First Out*: el último elemento en entrar es el primero en salir. Es el criterio de una pila. FIFO significa *First In, First Out*: el primero en entrar es el primero en salir. Es el criterio de una cola.

**b)** En una pila, tanto el ingreso como la salida se hacen por el mismo extremo: el tope. En una cola, los elementos entran por el final y salen por el frente.

**c)**

- **Pila:** en la vida real, una pila de platos: se agrega y se saca por arriba. En una app, el historial de pantallas de navegación: al volver, se sale de la pantalla que está en el tope.
- **Cola:** en la vida real, una fila para comprar: atienden primero a quien llegó primero. En una app, los pedidos del comedor: la cocina atiende primero el pedido que lleva más tiempo esperando.

### A2. Seguimiento de una pila

Las operaciones dejan la pila así, de la base al tope:

1. Después de los primeros tres `push`: `['Inicio', 'Productos', 'Detalle 3']`.
2. `pop()` saca `'Detalle 3'`; después de agregar `'Perfil'`: `['Inicio', 'Productos', 'Perfil']`.
3. El primer `tope()` imprime **`Perfil`**.
4. El `pop()` imprime **`Perfil`** y la pila queda `['Inicio', 'Productos']`.
5. El segundo `tope()` imprime **`Productos`**.
6. `p.vacia` imprime **`false`**.

Estado final, de base a tope: **`['Inicio', 'Productos']`**.

### A3. Seguimiento de una cola

La cola va cambiando de esta manera:

1. Se encolan Ana y Beto: `['Ana', 'Beto']`.
2. Se desencola Ana y se agregan Caro y Dani: `['Beto', 'Caro', 'Dani']`.
3. `frente()` imprime **`Beto`**.
4. `desencolar()` imprime **`Beto`** y la cola queda `['Caro', 'Dani']`.
5. `c.vacia` imprime **`false`**.

Estado final, de frente a final: **`['Caro', 'Dani']`**.

### A4. Análisis de la implementación

**a)** En JavaScript, el prefijo `#` declara un campo privado de la clase. Por ejemplo, `#items` solo se puede usar desde esa clase; no se puede consultar ni modificar directamente desde afuera. Así se evita que otro código cambie la estructura interna y deje la pila o la cola en un estado inválido.

**b)** `Array.shift()` quita el primer elemento y reacomoda los índices del resto. En una cola grande esa operación puede costar tiempo proporcional a la cantidad de elementos. Una cola más eficiente guarda el índice del frente y lo avanza al desencolar; también puede usar un buffer circular o una lista enlazada.

**c)** Una pila agrega con `push()` y saca con `pop()`, ambos por el final del array. La implementación simple de una cola agrega con `push()` y saca con `shift()`, porque tiene que retirar el elemento más antiguo, que está al principio. No se puede usar `pop()` para sacar de esa cola porque quitaría el elemento más nuevo y cambiaría el comportamiento FIFO.

### A5. Programación: una cola eficiente

La cola guarda un índice para el frente. Al desencolar, avanza ese índice en vez de desplazar los elementos con `shift()`. Cuando ya no quedan elementos, reinicia el array; si se acumuló un tramo consumido grande, compacta lo que queda con `slice()`.

Si está vacía, `frente()` y `desencolar()` devuelven `undefined`.

```js
class ColaEficiente {
  #items = [];
  #frente = 0;

  encolar(x) {
    this.#items.push(x);
  }

  desencolar() {
    if (this.vacia) return undefined;

    const elemento = this.#items[this.#frente];
    this.#frente += 1;

    if (this.#frente === this.#items.length) {
      this.#items = [];
      this.#frente = 0;
    } else if (this.#frente >= 64 && this.#frente * 2 >= this.#items.length) {
      this.#items = this.#items.slice(this.#frente);
      this.#frente = 0;
    }

    return elemento;
  }

  frente() {
    return this.vacia ? undefined : this.#items[this.#frente];
  }

  get vacia() {
    return this.tamanio === 0;
  }

  get tamanio() {
    return this.#items.length - this.#frente;
  }
}
```

### A6. Pila y cola dentro de Expo Router

**a)** El historial de pantallas de un `Stack` se comporta como una pila. La pantalla visible es la que está en el tope. La acción de volver (`back`) saca esa pantalla del tope y deja visible la anterior.

**b)** Las acciones de navegación se procesan como una cola: en general, se atienden en el orden en que llegan. Si se tocan dos links muy rápido, ambas acciones pueden quedar pendientes y ejecutarse una después de la otra; si las dos apilan pantallas, ambas pueden terminar en el historial.

## Parte B — Rutas basadas en archivos

### B1. Del archivo a la URL

| Archivo | URL o función |
|---|---|
| `src/app/(tabs)/index.tsx` | `/`: pantalla de inicio. El grupo `(tabs)` no aparece en la URL. |
| `src/app/acerca.tsx` | `/acerca`. |
| `src/app/(tabs)/perfil.tsx` | `/perfil`. |
| `src/app/(tabs)/productos/index.tsx` | `/productos`: índice de productos. |
| `src/app/(tabs)/productos/[id].tsx` | `/productos/:id`, por ejemplo `/productos/3`. `id` es un parámetro dinámico. |
| `src/app/docs/[...slug].tsx` | `/docs/...`: captura uno o más segmentos, por ejemplo `/docs/react/hooks`. |
| `src/app/_layout.tsx` | No genera una pantalla visitable; define el navegador y la configuración de las rutas hijas. |
| `src/app/+not-found.tsx` | No tiene una URL propia; muestra la pantalla de error para las rutas que no existen. |
| `src/app/Boton.tsx` | Crea una ruta `/Boton` si exporta una pantalla válida. Si era un componente reutilizable, conviene moverlo fuera de `src/app`, por ejemplo a `src/components`, para que no se convierta en una ruta. |

### B2. De la URL al archivo

| URL | Archivo |
|---|---|
| `/categorias/bebidas` y cualquier otra categoría | `src/app/categorias/[categoria].tsx` |
| `/buscar?q=mate&categoria=kiosco` | `src/app/buscar.tsx`; `q` y `categoria` son parámetros de búsqueda, no segmentos del archivo. |
| `/ayuda/pagos/tarjeta` y `/ayuda/horarios` | `src/app/ayuda/[...slug].tsx` |
| `/ayuda` | `src/app/ayuda/index.tsx` |

### B3. Verdadero o falso

**a) Falso.** Con Expo Router, crear un archivo de pantalla dentro de `src/app` define su ruta; no hay que registrarla en una tabla manual.

**b) Falso.** `_layout.tsx` configura cómo se relacionan y muestran sus rutas hijas; no es una pantalla que el usuario visite directamente.

**c) Verdadero.** Los grupos entre paréntesis, como `(tabs)`, organizan las rutas y los navegadores, pero no forman parte de la URL.

**d) Falso.** `npm install` puede instalar una versión que no sea compatible con el SDK del proyecto. Para paquetes de Expo conviene usar `npx expo install`, que elige una versión compatible.

**e) Verdadero.** `"main": "expo-router/entry"` configura el punto de entrada de Expo Router, en lugar del `App.tsx` tradicional como entrada de la app.

**f) Verdadero.** `/_sitemap` muestra las rutas generadas por Expo Router y sirve para inspeccionarlas durante el desarrollo.

**g) Verdadero.** Si existen `docs/index.tsx` y `docs/[...slug].tsx`, `/docs` corresponde a la ruta específica `docs/index.tsx`; la ruta catch-all atiende los segmentos que siguen a `/docs`.

**h) Verdadero.** En SDK 57, la versión mayor de `expo-router` también es 57; por ejemplo, pertenece a la serie `57.x`.

## Parte C — Navegar: `<Link>`, router y la pila

### C1. Métodos de router

| Método | Qué le hace a la pila |
|---|---|
| `router.push(href)` | Agrega una nueva pantalla al tope, aunque ya haya otra instancia de esa ruta. |
| `router.navigate(href)` | Va a la ruta si ya está en la pila; si no está, la agrega. |
| `router.replace(href)` | Reemplaza la pantalla del tope; no deja la actual debajo. |
| `router.back()` | Vuelve a la pantalla anterior, sacando la actual del tope si se puede volver. |
| `router.dismissTo(href)` | Cierra las pantallas superiores hasta llegar a `href`. Si `href` no está en la pila, reemplaza la pantalla actual por esa ruta. |
| `router.dismissAll()` | Descarta las pantallas del tope y vuelve a la primera pantalla de la pila actual. |
| `router.canGoBack()` | Devuelve `true` si hay una pantalla anterior a la que volver; no modifica la pila. |
| `router.setParams({...})` | Actualiza los parámetros de la ruta actual sin agregar otra pantalla. |

### C2. Simulación de la pila

Tomo como base que `router.navigate` agrega `/productos/5` porque todavía no existe esa ruta en la pila.

| # | Instrucción | Pila resultante, de base a tope |
|---|---|---|
| Inicio | — | `['/productos']` |
| 1 | `router.push("/productos/1")` | `['/productos', '/productos/1']` |
| 2 | `router.push("/productos/2")` | `['/productos', '/productos/1', '/productos/2']` |
| 3 | `router.navigate("/productos/5")` | `['/productos', '/productos/1', '/productos/2', '/productos/5']` |
| 4 | `router.push("/perfil")` | `['/productos', '/productos/1', '/productos/2', '/productos/5', '/perfil']` |
| 5 | `router.replace("/buscar")` | `['/productos', '/productos/1', '/productos/2', '/productos/5', '/buscar']` |
| 6 | `router.back()` | `['/productos', '/productos/1', '/productos/2', '/productos/5']` |
| 7 | `router.dismissTo("/productos")` | `['/productos']` |
| 8 | `router.canGoBack()` | **`false`**; no hay una pantalla anterior en esta pila. |

### C3. ¿`Link` o `router`?

**a)** `<Link>` con la ruta del producto, por ejemplo `<Link href={{ pathname: '/productos/[id]', params: { id: '3' } }}>`. Es una navegación que empieza por un toque del usuario.

**b)** `router.push('/exito')` después de que la API confirme el guardado. La navegación ocurre como resultado de una lógica; uso `push` si quiero que se pueda volver al formulario.

**c)** `router.back()` en el botón “Cancelar”, para cerrar el modal y regresar a la pantalla desde la que se abrió.

**d)** `router.replace('/')` después del login. Así el botón “atrás” no lleva al usuario otra vez al formulario de login.

**e)** `router.dismissTo('/pedidos')`, para cerrar las pantallas que están encima de la lista y volver directamente a ella.

### C4. Escribí el código

**a) Link al producto con id 8 usando un objeto `href`:**

```tsx
<Link href={{ pathname: '/productos/[id]', params: { id: '8' } }}>
  Ver producto
</Link>
```

**b) Link a `/perfil` que siempre apile:**

```tsx
<Link href="/perfil" push>
  Ir al perfil
</Link>
```

**c) Un `Pressable` propio como link a `/carrito`, usando `asChild`:**

```tsx
<Link href="/carrito" asChild>
  <Pressable>
    <Text>Ir al carrito</Text>
  </Pressable>
</Link>
```

### C5. Pensar

En la web, un `<Link>` es un enlace real: el usuario puede copiar la dirección, abrirla en otra pestaña o compartirla, y el navegador ofrece opciones de accesibilidad y contexto. En el celular no suele haber una barra de direcciones, pero el enlace igual permite navegar dentro de la app y usar URLs para compartir o abrir una pantalla específica con un deep link.

## Parte D — Navegadores: Stack, Tabs y Drawer

### D1. Comparación

| | Stack | Tabs | Drawer |
|---|---|---|---|
| ¿Apila pantallas? | Sí; las agrega y las quita del tope. | No entre las pestañas; cada tab puede tener su propio Stack. | No por cambiar de opción; cada opción puede contener su propio navegador. |
| ¿Cómo cambia de pantalla el usuario? | Avanza a una pantalla y vuelve con “atrás”. | Toca una pestaña de la barra. | Elige una opción del menú lateral, que también puede abrirse con un gesto. |
| ¿Desde dónde se importa en SDK 57? | `Stack` desde `expo-router`. | `Tabs` desde `expo-router/js-tabs`. | `Drawer` desde `expo-router/drawer`. |
| Un caso de uso típico | Lista y detalle de un producto. | Secciones principales como Inicio, Menú y Carrito. | Secciones de administración o cocina. |

### D2. Cada tab tiene su pila

Al volver a Productos, se ve otra vez el detalle del producto 4. La tab de Productos conserva su Stack mientras el usuario cambia a Inicio; cambiar de tab no reinicia automáticamente esa pila. Un ejemplo parecido es abrir una conversación desde una lista, cambiar a otra pestaña y volver a la conversación.

### D3. ¿Dónde va cada pantalla?

**a)** El detalle del producto va dentro del Stack de la tab Menú, para que la barra de pestañas siga visible.

**b)** El modal para confirmar la compra va en el Stack raíz, por encima de las tabs, para que tape la barra.

**c)** El login que se abre como modal va en el Stack raíz.

**d)** “Mis pedidos anteriores” va dentro del navegador de la tab Perfil, por ejemplo en el Stack anidado de esa tab.

### D4. Configurar el Stack

**a)** `screenOptions` establece opciones comunes para las pantallas de ese `Stack`. Las `options` de un `Stack.Screen` ajustan una ruta particular y pueden sobrescribir las opciones comunes.

**b)** Se oculta el header del Stack raíz para `(tabs)` porque el navegador de pestañas o el Stack de cada pestaña puede manejar su propio header. Así no aparecen dos encabezados uno encima del otro.

**c)** Sí, la pantalla existe aunque no se declare como `Stack.Screen`: Expo Router la crea a partir del archivo. Declararla sirve para configurar sus opciones, como el título, la presentación o si se muestra el header.

**d)** Algunos valores de `presentation` son `card`, `modal`, `fullScreenModal` y `formSheet`. Para una hoja inferior que empieza abierta al 50%, usaría `formSheet` con `sheetAllowedDetents: [0.5, 0.9]`.

**e)** En la pantalla de detalle se puede configurar el título dinámicamente con `Stack.Screen`:

```tsx
const { id } = useLocalSearchParams<{ id: string }>();

return (
  <>
    <Stack.Screen options={{ title: `Producto ${id}` }} />
    {/* Contenido del detalle */}
  </>
);
```

### D5. Tabs y Drawer en SDK 57

**a)** Para las pestañas de JavaScript que pide este TP se importa `Tabs` desde `expo-router/js-tabs`. La alternativa de pestañas nativas todavía experimental en SDK 57 es `NativeTabs` desde `expo-router/unstable-native-tabs`.

**b)** Para las animaciones del Drawer en SDK 57 se usan `react-native-reanimated` y `react-native-worklets`; también se necesita `react-native-gesture-handler` para los gestos. Conviene envolver la navegación en un `GestureHandlerRootView` en el layout raíz.

**c)** No hace falta instalar `@react-navigation/drawer`: en SDK 57 el Drawer ya viene integrado con Expo Router. Se importa desde `expo-router/drawer`.

**d)** `router.back()` vuelve primero dentro del navegador activo que tenga historial. En navegadores anidados, normalmente vuelve por el Stack más interno; si ese Stack no puede volver, la acción puede resolverse en el navegador padre.

## Parte E — Rutas dinámicas, parámetros y hooks

### E1. Encontrá el error

`id` llega como texto, pero `p.id` es numérico. Por eso `p.id === id` compara, por ejemplo, `3` con `'3'` y no encuentra coincidencia. La condición `id === 3` también compara un texto con un número.

Lo corregiría convirtiendo y validando el parámetro antes de comparar:

```tsx
const { id } = useLocalSearchParams<{ id: string }>();
const idNumero = Number(id);
const producto = productos.find((p) => p.id === idNumero);

if (idNumero === 3) console.log('Es el chipá');
if (!producto) return <Text>No existe el producto {id}</Text>;

return <Text>{producto.nombre}</Text>;
```

### E2. Catch-all

En `src/app/docs/[...slug].tsx`, `slug` es un array de segmentos:

| URL | `slug` |
|---|---|
| `/docs/react` | `['react']` |
| `/docs/react/hooks/useState` | `['react', 'hooks', 'useState']` |
| `/docs` | No coincide con `[...slug]`, porque no hay ningún segmento para capturar. Para esa URL hace falta una ruta propia, como `docs/index.tsx`. |

### E3. Anatomía de una URL

Dada `rutasipf://buscar?q=mate&categoria=bebidas`:

**a)** El scheme es `rutasipf`; la ruta de Expo Router es `/buscar`; los parámetros de búsqueda son `q=mate` y `categoria=bebidas`.

**b)** En `buscar.tsx`, `useLocalSearchParams()` devuelve `{ q: 'mate', categoria: 'bebidas' }`.

**c)** No hacen falta corchetes para `q`: los corchetes indican segmentos dinámicos de la ruta, mientras que `q` y `categoria` vienen después de `?` y son parámetros de búsqueda.

**d)** `router.setParams({ q: texto })` actualiza la URL de la búsqueda actual sin apilar una pantalla por cada tecla. Además, el estado de búsqueda queda representado en la URL y se puede compartir o volver a abrir.

### E4. ¿Dónde estoy?

| Hook | En `/productos/3` | En `/buscar?q=chipa` |
|---|---|---|
| `usePathname()` | `'/productos/3'` | `'/buscar'` |
| `useSegments()` | `['(tabs)', 'productos', '[id]']` | `['buscar']` |
| `useLocalSearchParams()` | `{ id: '3' }` | `{ q: 'chipa' }` |

### E5. Local vs. global

**a)** `useLocalSearchParams()` devuelve los parámetros de la pantalla en la que está montado el componente y no cambia por cada actualización de la URL de otra pantalla. `useGlobalSearchParams()` sigue los parámetros globales y puede hacer que pantallas que quedaron detrás se vuelvan a renderizar. La opción recomendada normalmente es `useLocalSearchParams()` para que la pantalla anterior conserve sus propios parámetros.

**b)** `useFocusEffect` ejecuta un efecto cuando la pantalla recibe el foco y permite limpiarlo cuando lo pierde o se desmonta. Por ejemplo, sirve para volver a cargar la lista de pedidos cada vez que el usuario regresa a esa pantalla.

**c)** No es un error de Expo Router: `[id].tsx` define una ruta para cualquier texto en esa posición, así que `/productos/mate` puede abrir la pantalla. La app tiene que validar el parámetro y comprobar que el producto exista antes de mostrarlo.

## Parte F — Redirecciones, rutas protegidas y deep links

### F1. Redirect

**a)** `<Redirect href="/productos" />` envía al usuario a `/productos` sin dejar la pantalla actual en el historial. Equivale a `router.replace('/productos')`.

**b)** La redirección reemplaza para no dejar en la pila la pantalla que redirige. Si se apilara, al tocar “atrás” el usuario volvería a esa pantalla y podría entrar en un ciclo de redirecciones.

### F2. `Stack.Protected`

Los guards quedan así:

```tsx
<Stack.Protected guard={conSesion}>
  <Stack.Screen name="privado" />
</Stack.Protected>
<Stack.Protected guard={!conSesion}>
  <Stack.Screen name="login" options={{ presentation: 'modal' }} />
</Stack.Protected>
```

**a)** Con el guard en `false`, la ruta protegida no está disponible en ese navegador. Si se estaba mostrando y el guard cambia a `false`, Expo Router la quita del historial y redirige a la ruta ancla o a otra pantalla disponible.

**b)** Al iniciar sesión, `conSesion` pasa a `true` y el guard del login queda en `false`. Expo Router retira el login del navegador y vuelve a una pantalla disponible; por eso no hace falta llamar a `router.back()`.

**c)** El aviso aparece si se intenta navegar a una pantalla que no está disponible en el navegador, por ejemplo porque su guard sigue en `false`. Hay que dejar que el estado de sesión actualice el guard antes de navegar a una ruta protegida y no ofrecer acciones que apunten a rutas inaccesibles.

**d)** `Stack.Protected` concentra la condición en el layout: protege la ruta incluso si se llega por un deep link y la retira del historial cuando deja de estar permitida. Con redirects repetidos en cada pantalla es fácil olvidar un caso o dejar rutas protegidas accesibles por otra entrada.

### F3. 404, anchor y rutas tipadas

**a)** `+not-found.tsx` muestra una pantalla propia cuando la URL no coincide con ninguna ruta. Se define dentro de `src/app`.

**b)** `export const unstable_settings = { anchor: '(tabs)' }` se declara en un `_layout.tsx` de Stack. Define la ruta que queda como base debajo de una pantalla abierta directamente por deep link; en este caso, las pestañas.

**c)** `typedRoutes` activa la comprobación estática de los enlaces. Con esa opción, `<Link href="/prodcutos" />` da un error de TypeScript si esa ruta no existe. Expo CLI genera los tipos a partir de los archivos de `src/app` al iniciar el servidor; se guardan en `.expo/types/router.d.ts`.

### F4. Deep links

Para abrir `/menu/7`:

| Dónde | URL |
|---|---|
| App instalada en un build propio | `comedoripf://menu/7` |
| Expo Go en desarrollo | `exp://192.168.1.20:8081/--/menu/7` |
| Web, con el servidor en el puerto predeterminado | `http://192.168.1.20:8081/menu/7` (o `http://localhost:8081/menu/7` desde la misma computadora). |

`/--/` separa la dirección del servidor de desarrollo de la ruta que debe abrir Expo Router dentro de la app. El scheme `comedoripf` se registra en el build nativo propio; Expo Go no instala ese scheme para cada proyecto, porque usa el suyo para abrir proyectos en desarrollo.

### F5. Errores comunes

**a)** `asChild` combina las props del `<Link>` con las del `Pressable`, y ese `style` como array puede causar el aviso de `Slot`. Se puede aplanar antes de pasarlo:

```tsx
<Link href="/perfil" asChild>
  <Pressable
    style={StyleSheet.flatten([
      estilos.boton,
      activo && estilos.activo,
    ])}
  >
    <Text>Perfil</Text>
  </Pressable>
</Link>
```

**b)** Los archivos dentro de `src/app` se interpretan como rutas. Si `TarjetaProducto.tsx` es un componente reutilizable y no una pantalla, hay que moverlo a `src/components/TarjetaProducto.tsx`.

**c)** `router.push('/')` deja el login debajo en la pila, así que “atrás” podría volver a mostrarlo. Después del acceso conviene usar `router.replace('/')`. Si el login está protegido con `Stack.Protected`, al iniciar sesión su guard pasa a `false` y Expo Router lo quita del historial.

**d)** `npm install` puede traer una versión incompatible con el SDK y hacer que Expo Go indique que el proyecto no es compatible. Hay que instalar paquetes de Expo con `npx expo install <paquete>` para obtener una versión compatible con el SDK del proyecto.
