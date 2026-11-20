import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Plato } from '../data/platos';

type PlatoCardProps = {
  plato: Plato;
};

const formatoPrecio = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

export function PlatoCard({ plato }: PlatoCardProps) {
  return (
    <Link href={{ pathname: '/menu/[id]', params: { id: plato.id } }} asChild>
      <Pressable style={styles.card}>
        <View style={styles.details}>
          <Text style={styles.name}>{plato.nombre}</Text>
          <Text style={styles.description}>{plato.descripcion}</Text>
        </View>
        <Text style={styles.price}>{formatoPrecio.format(plato.precio)}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#f1f5f2',
    borderRadius: 12,
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    padding: 16,
  },
  details: {
    flex: 1,
    gap: 4,
  },
  name: {
    color: '#1b2921',
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    color: '#52615a',
    fontSize: 14,
  },
  price: {
    color: '#215c3c',
    fontSize: 15,
    fontWeight: '700',
  },
});
