import { router } from 'expo-router';
import { useRef } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAppContext } from '../context/AppContext';

const formatoPrecio = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

export default function ConfirmarScreen() {
  const { carrito, cantidadCarrito, totalCarrito, notaCarrito, confirmarPedido } = useAppContext();
  const confirmando = useRef(false);

  function confirmar() {
    if (confirmando.current || cantidadCarrito === 0) return;

    confirmando.current = true;
    const numero = confirmarPedido();
    router.replace({ pathname: '/turno/[numero]', params: { numero: String(numero) } });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Revisá tu pedido antes de enviarlo.</Text>
      {carrito.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.muted}>No hay platos para confirmar.</Text>
          <Pressable onPress={() => router.replace('/menu')} style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Volver al menú</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <View style={styles.items}>
            {carrito.map(({ plato, cantidad }) => (
              <View key={plato.id} style={styles.item}>
                <Text style={styles.itemName}>
                  {cantidad} × {plato.nombre}
                </Text>
                <Text style={styles.itemPrice}>
                  {formatoPrecio.format(cantidad * plato.precio)}
                </Text>
              </View>
            ))}
          </View>
          {notaCarrito ? (
            <View style={styles.note}>
              <Text style={styles.noteTitle}>Nota para la cocina</Text>
              <Text style={styles.muted}>{notaCarrito}</Text>
            </View>
          ) : null}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Cantidad de ítems: {cantidadCarrito}</Text>
            <Text style={styles.total}>{formatoPrecio.format(totalCarrito)}</Text>
          </View>
          <Pressable accessibilityRole="button" onPress={confirmar} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Confirmar pedido</Text>
          </Pressable>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 18,
    padding: 20,
  },
  heading: {
    color: '#1b2921',
    fontSize: 20,
    fontWeight: '600',
  },
  empty: {
    alignItems: 'flex-start',
    gap: 16,
  },
  muted: {
    color: '#52615a',
    fontSize: 15,
  },
  items: {
    gap: 10,
  },
  item: {
    alignItems: 'center',
    backgroundColor: '#f1f5f2',
    borderRadius: 10,
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    padding: 15,
  },
  itemName: {
    color: '#1b2921',
    flex: 1,
    fontWeight: '600',
  },
  itemPrice: {
    color: '#215c3c',
    fontWeight: '700',
  },
  note: {
    backgroundColor: '#f1f5f2',
    borderRadius: 10,
    gap: 5,
    padding: 15,
  },
  noteTitle: {
    color: '#1b2921',
    fontWeight: '700',
  },
  totalRow: {
    alignItems: 'center',
    borderTopColor: '#d9e2dc',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
  },
  totalLabel: {
    color: '#52615a',
  },
  total: {
    color: '#215c3c',
    fontSize: 19,
    fontWeight: '700',
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#215c3c',
    borderRadius: 10,
    padding: 16,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    borderColor: '#215c3c',
    borderRadius: 10,
    borderWidth: 1,
    padding: 13,
  },
  secondaryButtonText: {
    color: '#215c3c',
    fontWeight: '700',
  },
});
