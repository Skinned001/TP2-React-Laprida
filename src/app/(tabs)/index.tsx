import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comedor IPF</Text>
      <Text style={styles.message}>¡Hola! ¿Qué te gustaría hacer hoy?</Text>
      <View style={styles.cards}>
        <QuickLink href="/menu" title="Menú" description="Mirá los platos disponibles" />
        <QuickLink href="/buscar" title="Buscar" description="Encontrá algo rico" />
        <QuickLink href="/ayuda" title="Ayuda" description="Consultá cómo funciona" />
        <QuickLink href="/cocina" title="Cocina" description="Acceso para el personal" />
      </View>
    </View>
  );
}

function QuickLink({
  href,
  title,
  description,
}: {
  href: '/menu' | '/buscar' | '/ayuda' | '/cocina';
  title: string;
  description: string;
}) {
  return (
    <Link href={href} asChild>
      <Pressable style={styles.card}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    marginBottom: 24,
  },
  cards: {
    gap: 12,
  },
  card: {
    backgroundColor: '#f1f5f2',
    borderRadius: 12,
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDescription: {
    color: '#52615a',
  },
});
