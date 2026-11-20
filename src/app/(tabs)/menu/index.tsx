import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { DondeEstoy } from '../../../components/DondeEstoy';
import { PlatoCard } from '../../../components/PlatoCard';
import { categoriasPlato, platos } from '../../../data/platos';

export default function MenuScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.intro}>Elegí algo rico para disfrutar.</Text>
      {categoriasPlato.map((categoria) => {
        const platosCategoria = platos.filter((plato) => plato.categoria === categoria.id);

        return (
          <View key={categoria.id} style={styles.section}>
            <Link
              href={{ pathname: '/categorias/[categoria]', params: { categoria: categoria.id } }}
              style={styles.categoryLink}
            >
              {categoria.nombre}
            </Link>
            {platosCategoria.map((plato) => (
              <PlatoCard key={plato.id} plato={plato} />
            ))}
          </View>
        );
      })}
      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
    padding: 20,
  },
  intro: {
    color: '#52615a',
    fontSize: 16,
  },
  section: {
    gap: 12,
  },
  categoryLink: {
    color: '#215c3c',
    fontSize: 21,
    fontWeight: '700',
  },
});
