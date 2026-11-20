import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { DondeEstoy } from '../../components/DondeEstoy';
import { useAppContext } from '../../context/AppContext';

const formatoPrecio = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

export default function CocinaScreen() {
  const { proximoPedido, cantidadEnEspera, atenderSiguiente, cerrarSesion } = useAppContext();

  function salir() {
    cerrarSesion();
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>Cocina</Text>
          <Text style={styles.description}>
            {cantidadEnEspera} {cantidadEnEspera === 1 ? 'pedido pendiente' : 'pedidos pendientes'}
          </Text>
        </View>
        <Pressable accessibilityRole="button" onPress={salir} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </Pressable>
      </View>

      {proximoPedido ? (
        <View style={styles.card}>
          <Text style={styles.eyebrow}>Siguiente en la cola</Text>
          <Text style={styles.orderNumber}>Pedido #{proximoPedido.numero}</Text>
          <View style={styles.items}>
            {proximoPedido.items.map(({ plato, cantidad }) => (
              <Text key={plato.id} style={styles.item}>
                {cantidad} × {plato.nombre}
              </Text>
            ))}
          </View>
          {proximoPedido.nota ? (
            <View style={styles.note}>
              <Text style={styles.noteTitle}>Nota</Text>
              <Text style={styles.description}>{proximoPedido.nota}</Text>
            </View>
          ) : null}
          <Text style={styles.total}>Total: {formatoPrecio.format(proximoPedido.total)}</Text>
          <Pressable
            accessibilityRole="button"
            onPress={atenderSiguiente}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>Atender siguiente</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>No hay pedidos pendientes</Text>
          <Text style={styles.description}>Cuando llegue un pedido, va a aparecer acá.</Text>
        </View>
      )}
      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    gap: 20,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  headerText: {
    flex: 1,
    gap: 4,
  },
  title: {
    color: '#1b2921',
    fontSize: 26,
    fontWeight: '700',
  },
  description: {
    color: '#52615a',
    fontSize: 15,
  },
  logoutButton: {
    borderColor: '#b7c8bc',
    borderRadius: 9,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  logoutText: {
    color: '#215c3c',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#f1f5f2',
    borderRadius: 14,
    gap: 15,
    padding: 20,
  },
  eyebrow: {
    color: '#52615a',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  orderNumber: {
    color: '#215c3c',
    fontSize: 28,
    fontWeight: '800',
  },
  items: {
    gap: 8,
  },
  item: {
    color: '#1b2921',
    fontSize: 17,
    fontWeight: '600',
  },
  note: {
    backgroundColor: '#fff',
    borderRadius: 9,
    gap: 4,
    padding: 13,
  },
  noteTitle: {
    color: '#1b2921',
    fontWeight: '700',
  },
  total: {
    color: '#1b2921',
    fontSize: 16,
    fontWeight: '700',
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#215c3c',
    borderRadius: 10,
    padding: 15,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  empty: {
    backgroundColor: '#f1f5f2',
    borderRadius: 12,
    gap: 8,
    padding: 18,
  },
  emptyTitle: {
    color: '#1b2921',
    fontSize: 18,
    fontWeight: '700',
  },
});
