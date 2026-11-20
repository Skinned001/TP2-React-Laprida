import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { PlatoCard } from '../components/PlatoCard';
import { categoriasPlato, esCategoriaPlato, platos } from '../data/platos';

export default function BuscarScreen() {
  const { q = '', categoria } = useLocalSearchParams<{ q?: string; categoria?: string }>();
  const categoriaSeleccionada = categoria && esCategoriaPlato(categoria) ? categoria : undefined;
  const consulta = q.trim().toLocaleLowerCase('es');
  const resultados = platos.filter((plato) => {
    const coincideCategoria = !categoriaSeleccionada || plato.categoria === categoriaSeleccionada;
    const coincideTexto =
      !consulta ||
      `${plato.nombre} ${plato.descripcion}`.toLocaleLowerCase('es').includes(consulta);

    return coincideCategoria && coincideTexto;
  });

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.label}>¿Qué tenés ganas de comer?</Text>
      <TextInput
        accessibilityLabel="Buscar platos"
        onChangeText={(texto) => router.setParams({ q: texto || undefined })}
        placeholder="Ej.: milanesa, café..."
        returnKeyType="search"
        style={styles.input}
        value={q}
      />
      <Text style={styles.label}>Categoría</Text>
      <View style={styles.filters}>
        <CategoryFilter
          label="Todas"
          selected={!categoriaSeleccionada}
          onPress={() => router.setParams({ categoria: undefined })}
        />
        {categoriasPlato.map((item) => (
          <CategoryFilter
            key={item.id}
            label={item.nombre}
            selected={categoriaSeleccionada === item.id}
            onPress={() => router.setParams({ categoria: item.id })}
          />
        ))}
      </View>
      <Text accessibilityLiveRegion="polite" style={styles.count}>
        {resultados.length} {resultados.length === 1 ? 'plato encontrado' : 'platos encontrados'}
      </Text>
      {resultados.length > 0 ? (
        <View style={styles.results}>
          {resultados.map((plato) => (
            <PlatoCard key={plato.id} plato={plato} />
          ))}
        </View>
      ) : (
        <Text style={styles.empty}>No encontramos platos con esos filtros.</Text>
      )}
    </ScrollView>
  );
}

function CategoryFilter({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.filter, selected && styles.selectedFilter]}
    >
      <Text style={[styles.filterText, selected && styles.selectedFilterText]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 14,
    padding: 20,
  },
  label: {
    color: '#1b2921',
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#f1f5f2',
    borderColor: '#d9e2dc',
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 16,
    padding: 14,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filter: {
    borderColor: '#b7c8bc',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  selectedFilter: {
    backgroundColor: '#215c3c',
    borderColor: '#215c3c',
  },
  filterText: {
    color: '#215c3c',
    fontWeight: '600',
  },
  selectedFilterText: {
    color: '#fff',
  },
  count: {
    color: '#52615a',
    fontSize: 14,
  },
  results: {
    gap: 12,
  },
  empty: {
    color: '#52615a',
    fontSize: 16,
    paddingVertical: 12,
  },
});
