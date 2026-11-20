import { Stack } from 'expo-router';

export default function AyudaLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Ayuda' }} />
      <Stack.Screen name="[...slug]" options={{ title: 'Artículo de ayuda' }} />
    </Stack>
  );
}
