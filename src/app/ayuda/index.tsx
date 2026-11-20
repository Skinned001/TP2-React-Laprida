import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { DondeEstoy } from '../../components/DondeEstoy';
import { articulosAyuda } from '../../data/ayuda';

export default function AyudaScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.intro}>Elegí un tema para resolver tus dudas.</Text>
      <View style={styles.list}>
        {articulosAyuda.map((articulo) => (
          <Link
            key={articulo.slug.join('/')}
            href={{ pathname: '/ayuda/[...slug]', params: { slug: articulo.slug } }}
            style={styles.link}
          >
            {articulo.titulo}
          </Link>
        ))}
      </View>
      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 18,
    padding: 20,
  },
  intro: {
    color: '#52615a',
    fontSize: 16,
  },
  list: {
    gap: 12,
  },
  link: {
    backgroundColor: '#f1f5f2',
    borderRadius: 10,
    color: '#215c3c',
    fontSize: 17,
    fontWeight: '600',
    padding: 16,
  },
});
