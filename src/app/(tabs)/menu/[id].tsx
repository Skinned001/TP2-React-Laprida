import { Stack, useLocalSearchParams, Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { DondeEstoy } from '../../../components/DondeEstoy';
import { PlaceholderPage } from '../../../components/PlaceholderPage';
import { useAppContext } from '../../../context/AppContext';
import { platos } from '../../../data/platos';

const formatoPrecio = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

export default function PlatoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const idNumero = Number(id);
  const plato =
    Number.isSafeInteger(idNumero) && idNumero > 0
      ? platos.find((item) => item.id === idNumero)
      : undefined;
  const { agregarAlCarrito } = useAppContext();
  const [agregado, setAgregado] = useState(false);

  if (!plato) {
    return (
      <PlaceholderPage
        title="No encontramos ese plato"
        description={`El identificador "${id}" no corresponde a un plato del menú.`}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: plato.nombre }} />
      <Text style={styles.category}>{plato.categoria}</Text>
      <Text style={styles.name}>{plato.nombre}</Text>
      <Text style={styles.price}>{formatoPrecio.format(plato.precio)}</Text>
      <Text style={styles.description}>{plato.descripcion}</Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => {
          agregarAlCarrito(plato);
          setAgregado(true);
        }}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>Agregar al carrito</Text>
      </Pressable>
      {agregado && (
        <View style={styles.feedback}>
          <Text style={styles.feedbackText}>¡Agregado al carrito!</Text>
          <Link href="/carrito" style={styles.cartLink}>
            Ver carrito
          </Link>
        </View>
      )}
      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    padding: 24,
  },
  category: {
    color: '#52615a',
    fontSize: 14,
    textTransform: 'capitalize',
  },
  name: {
    color: '#1b2921',
    fontSize: 28,
    fontWeight: '700',
  },
  price: {
    color: '#215c3c',
    fontSize: 22,
    fontWeight: '700',
  },
  description: {
    color: '#52615a',
    fontSize: 16,
    lineHeight: 24,
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: '#215c3c',
    borderRadius: 10,
    marginTop: 8,
    padding: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  feedback: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
  },
  feedbackText: {
    color: '#215c3c',
    fontWeight: '600',
  },
  cartLink: {
    color: '#215c3c',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
