import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router/js-tabs';
import { useAppContext } from '../../context/AppContext';

export default function TabsLayout() {
  const { cantidadCarrito } = useAppContext();

  return (
    <Tabs screenOptions={{ headerTitle: 'Comedor IPF' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menú',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="restaurant-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="carrito"
        options={{
          title: 'Carrito',
          headerShown: false,
          tabBarBadge: cantidadCarrito > 0 ? cantidadCarrito : undefined,
          tabBarIcon: ({ color, size }) => <Ionicons name="cart-outline" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
