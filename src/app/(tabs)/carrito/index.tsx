import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAppContext } from '../../../context/AppContext';

const formatoPrecio = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

export default function CarritoScreen() {
  const {
    carrito,
    cantidadCarrito,
    totalCarrito,
    puedeDeshacer,
    deshacerUltimo,
    notaCarrito,
  } = useAppContext();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Tu pedido</Text>
      {carrito.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>Todavía no agregaste platos</Text>
          <Text style={styles.muted}>Cuando encuentres algo rico, va a aparecer acá.</Text>
          <Link href="/menu" style={styles.link}>
            Explorar el menú
          </Link>
        </View>
      ) : (
        <View style={styles.items}>
          {carrito.map(({ plato, cantidad }) => (
            <View key={plato.id} style={styles.item}>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{plato.nombre}</Text>
                <Text style={styles.muted}>
                  {cantidad} × {formatoPrecio.format(plato.precio)}
                </Text>
              </View>
              <Text style={styles.itemSubtotal}>
                {formatoPrecio.format(cantidad * plato.precio)}
              </Text>
            </View>
          ))}
        </View>
      )}

      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: !puedeDeshacer }}
        disabled={!puedeDeshacer}
        onPress={deshacerUltimo}
        style={[styles.secondaryButton, !puedeDeshacer && styles.disabledButton]}
      >
        <Text style={[styles.secondaryButtonText, !puedeDeshacer && styles.disabledButtonText]}>
          Deshacer último
        </Text>
      </Pressable>

      <Link href="/carrito/nota" style={styles.link}>
        {notaCarrito ? 'Editar nota para la cocina' : 'Agregar una nota para la cocina'}
      </Link>
      {notaCarrito ? <Text style={styles.notePreview}>“{notaCarrito}”</Text> : null}

      <View style={styles.summary}>
        <Text style={styles.summaryLabel}>Cantidad de ítems</Text>
        <Text style={styles.summaryValue}>{cantidadCarrito}</Text>
        <Text style={styles.summaryLabel}>Total</Text>
        <Text style={styles.total}>{formatoPrecio.format(totalCarrito)}</Text>
      </View>

      {carrito.length > 0 ? (
        <Link href="/confirmar" asChild>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Continuar a confirmar</Text>
          </Pressable>
        </Link>
      ) : (
        <Pressable disabled style={[styles.primaryButton, styles.disabledButton]}>
          <Text style={[styles.primaryButtonText, styles.disabledButtonText]}>
            Continuar a confirmar
          </Text>
        </Pressable>
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
    fontSize: 24,
    fontWeight: '700',
  },
  empty: {
    alignItems: 'flex-start',
    backgroundColor: '#f1f5f2',
    borderRadius: 12,
    gap: 8,
    padding: 18,
  },
  emptyTitle: {
    color: '#1b2921',
    fontSize: 17,
    fontWeight: '600',
  },
  muted: {
    color: '#52615a',
  },
  link: {
    color: '#215c3c',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  items: {
    gap: 10,
  },
  item: {
    alignItems: 'center',
    backgroundColor: '#f1f5f2',
    borderRadius: 12,
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    padding: 16,
  },
  itemDetails: {
    flex: 1,
    gap: 5,
  },
  itemName: {
    color: '#1b2921',
    fontSize: 16,
    fontWeight: '600',
  },
  itemSubtotal: {
    color: '#215c3c',
    fontWeight: '700',
  },
  secondaryButton: {
    alignItems: 'center',
    borderColor: '#215c3c',
    borderRadius: 10,
    borderWidth: 1,
    padding: 13,
  },
  secondaryButtonText: {
    color: '#215c3c',
    fontWeight: '700',
  },
  disabledButton: {
    backgroundColor: '#e5e9e6',
    borderColor: '#e5e9e6',
  },
  disabledButtonText: {
    color: '#849087',
  },
  notePreview: {
    color: '#52615a',
    fontStyle: 'italic',
  },
  summary: {
    borderTopColor: '#d9e2dc',
    borderTopWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingTop: 16,
  },
  summaryLabel: {
    color: '#52615a',
    flexGrow: 1,
  },
  summaryValue: {
    color: '#1b2921',
    fontWeight: '600',
  },
  total: {
    color: '#215c3c',
    fontSize: 18,
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
});
