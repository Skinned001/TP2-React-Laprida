import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppProvider } from '../context/AppContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <Stack screenOptions={{ headerTitle: 'Comedor IPF' }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="categorias/[categoria]" options={{ title: 'Categoría' }} />
          <Stack.Screen name="buscar" options={{ title: 'Buscar' }} />
          <Stack.Screen
            name="confirmar"
            options={{ presentation: 'modal', title: 'Confirmar pedido' }}
          />
          <Stack.Screen name="turno/[numero]" options={{ title: 'Tu turno' }} />
          <Stack.Screen
            name="login"
            options={{ presentation: 'modal', title: 'Ingreso de cocina' }}
          />
          <Stack.Screen name="cocina" options={{ headerShown: false }} />
          <Stack.Screen name="ayuda" options={{ headerShown: false }} />
        </Stack>
      </AppProvider>
    </GestureHandlerRootView>
  );
}
