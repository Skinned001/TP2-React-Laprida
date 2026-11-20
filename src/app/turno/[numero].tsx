import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useAppContext } from '../../context/AppContext';

export default function TurnoScreen() {
  const { numero } = useLocalSearchParams<{ numero: string }>();
  const numeroPedido = Number(numero);
  const numeroValido = Number.isSafeInteger(numeroPedido) && numeroPedido > 0;
  const { pedidosPendientes, pedidosAtendidos } = useAppContext();
  const posicion = numeroValido
    ? pedidosPendientes.findIndex((pedido) => pedido.numero === numeroPedido)
    : -1;
  const atendido =
    numeroValido && pedidosAtendidos.some((pedido) => pedido.numero === numeroPedido);

  if (!numeroValido || (posicion === -1 && !atendido)) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No encontramos ese turno</Text>
        <Text style={styles.description}>
          El número “{numero}” no corresponde a un pedido pendiente o atendido en esta sesión.
        </Text>
      </View>
    );
  }

  const minutosEstimados = posicion * 3;

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        {atendido ? 'Este pedido ya fue atendido.' : '¡Listo! Tu pedido ya está en la cola de cocina.'}
      </Text>
      <Text style={styles.title}>Turno #{numeroPedido}</Text>
      {!atendido ? (
        <>
          <Text style={styles.waiting}>
            {posicion} {posicion === 1 ? 'pedido' : 'pedidos'} adelante
          </Text>
          <Text style={styles.description}>
            Espera estimada: {minutosEstimados === 0 ? 'menos de 3 minutos' : `unos ${minutosEstimados} minutos`}
          </Text>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 14,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: '#215c3c',
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
  },
  waiting: {
    color: '#1b2921',
    fontSize: 20,
    fontWeight: '700',
  },
  description: {
    color: '#52615a',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
});
