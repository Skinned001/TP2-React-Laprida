import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { DondeEstoy } from '../../components/DondeEstoy';
import { useAppContext } from '../../context/AppContext';

export default function AtendidosScreen() {
  const { pedidosAtendidos, cerrarSesion } = useAppContext();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pedidos atendidos</Text>
        <Pressable accessibilityRole="button" onPress={cerrarSesion} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </Pressable>
      </View>
      {pedidosAtendidos.length === 0 ? (
        <Text style={styles.empty}>Todavía no se atendieron pedidos.</Text>
      ) : (
        <View style={styles.list}>
          {pedidosAtendidos.map((pedido) => (
            <View key={pedido.numero} style={styles.card}>
              <Text style={styles.orderNumber}>Pedido #{pedido.numero}</Text>
              {pedido.items.map(({ plato, cantidad }) => (
                <Text key={plato.id} style={styles.item}>
                  {cantidad} × {plato.nombre}
                </Text>
              ))}
            </View>
          ))}
        </View>
      )}
      <Link href="/cocina" style={styles.link}>
        Volver al pedido actual
      </Link>
      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 18,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  title: {
    color: '#1b2921',
    flex: 1,
    fontSize: 24,
    fontWeight: '700',
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
  list: {
    gap: 12,
  },
  card: {
    backgroundColor: '#f1f5f2',
    borderRadius: 12,
    gap: 7,
    padding: 16,
  },
  orderNumber: {
    color: '#215c3c',
    fontSize: 17,
    fontWeight: '700',
  },
  item: {
    color: '#1b2921',
  },
  empty: {
    color: '#52615a',
    fontSize: 16,
  },
  link: {
    color: '#215c3c',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
