import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { DondeEstoy } from '../../components/DondeEstoy';
import { articulosAyuda } from '../../data/ayuda';

export default function ArticuloAyudaScreen() {
  const { slug } = useLocalSearchParams<{ slug: string[] }>();
  const slugActual = slug.join('/');
  const articulo = articulosAyuda.find((item) => item.slug.join('/') === slugActual);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: articulo?.titulo ?? 'Artículo no encontrado' }} />
      {articulo ? (
        articulo.parrafos.map((parrafo) => (
          <Text key={parrafo} style={styles.paragraph}>
            {parrafo}
          </Text>
        ))
      ) : (
        <>
          <Text style={styles.paragraph}>
            No encontramos el artículo “{slugActual}”. Volvé al índice de ayuda para ver los temas disponibles.
          </Text>
          <Link href="/ayuda" style={styles.link}>
            Volver a Ayuda
          </Link>
        </>
      )}
      <DondeEstoy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    padding: 20,
  },
  paragraph: {
    color: '#33443a',
    fontSize: 16,
    lineHeight: 24,
  },
  link: {
    color: '#215c3c',
    fontSize: 16,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
