import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { PlatoCard } from '../../components/PlatoCard';
import { PlaceholderPage } from '../../components/PlaceholderPage';
import { categoriasPlato, esCategoriaPlato, platos } from '../../data/platos';

export default function CategoriaScreen() {
  const { categoria } = useLocalSearchParams<{ categoria: string }>();
  const categoriaValida = esCategoriaPlato(categoria);
  const categoriaEncontrada = categoriaValida
    ? categoriasPlato.find((item) => item.id === categoria)
    : undefined;

  if (!categoriaEncontrada) {
    return (
      <PlaceholderPage
        title="Categoría no disponible"
        description={`"${categoria}" no es una categoría del menú. Elegí desayuno, almuerzo, bebidas o kiosco.`}
      />
    );
  }

  const platosCategoria = platos.filter((plato) => plato.categoria === categoriaEncontrada.id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: categoriaEncontrada.nombre }} />
      <Text style={styles.intro}>Platos de {categoriaEncontrada.nombre.toLowerCase()}.</Text>
      <View style={styles.list}>
        {platosCategoria.map((plato) => (
          <PlatoCard key={plato.id} plato={plato} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    padding: 20,
  },
  intro: {
    color: '#52615a',
    fontSize: 16,
  },
  list: {
    gap: 12,
  },
});
