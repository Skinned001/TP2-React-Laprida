import { useLocalSearchParams, usePathname, useSegments } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export const DEBUG = false;

export function DondeEstoy() {
  const pathname = usePathname();
  const segments = useSegments();
  const params = useLocalSearchParams();

  if (!DEBUG) return null;

  return (
    <View accessibilityLabel="Información de depuración de la ruta" style={styles.container}>
      <Text style={styles.title}>¿Dónde estoy?</Text>
      <Text style={styles.label}>usePathname()</Text>
      <Text style={styles.value}>{pathname}</Text>
      <Text style={styles.label}>useSegments()</Text>
      <Text style={styles.value}>{JSON.stringify(segments)}</Text>
      <Text style={styles.label}>useLocalSearchParams()</Text>
      <Text style={styles.value}>{JSON.stringify(params)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f5f2',
    borderRadius: 10,
    gap: 5,
    marginTop: 20,
    padding: 14,
  },
  title: {
    color: '#1b2921',
    fontSize: 14,
    fontWeight: '700',
  },
  label: {
    color: '#52615a',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  value: {
    color: '#215c3c',
    fontSize: 12,
  },
});
