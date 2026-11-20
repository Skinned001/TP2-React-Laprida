export type ArticuloAyuda = {
  slug: string[];
  titulo: string;
  parrafos: string[];
};

export const articulosAyuda: ArticuloAyuda[] = [
  {
    slug: ['pedidos', 'realizar'],
    titulo: '¿Cómo hago un pedido?',
    parrafos: [
      'Elegí un plato desde el menú y tocá “Agregar al carrito”. Podés sumar otros platos antes de continuar.',
      'En el carrito revisá las cantidades, agregá una nota si hace falta y tocá “Continuar a confirmar”.',
      'Cuando confirmes, vas a recibir un número de turno para consultar cuántos pedidos hay delante.',
    ],
  },
  {
    slug: ['pagos', 'efectivo'],
    titulo: 'Pago en efectivo',
    parrafos: [
      'El pedido se paga en el comedor cuando lo retirás.',
      'El total se muestra en el carrito y en el resumen antes de confirmar el pedido.',
    ],
  },
  {
    slug: ['pedidos', 'nota'],
    titulo: 'Aclaración para la cocina',
    parrafos: [
      'Desde el carrito podés escribir una nota breve para la cocina, por ejemplo “sin sal”.',
      'La nota se incluye en el resumen del pedido y se muestra junto al pedido en la pantalla de cocina.',
    ],
  },
  {
    slug: ['turnos', 'espera'],
    titulo: 'Consultar mi turno',
    parrafos: [
      'Después de confirmar, la pantalla muestra tu número de turno y cuántos pedidos hay antes que el tuyo.',
      'La espera estimada se calcula a razón de tres minutos por cada pedido que tenés adelante.',
    ],
  },
];
