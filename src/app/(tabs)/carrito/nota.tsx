import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAppContext } from '../../../context/AppContext';

export default function NotaScreen() {
  const { notaCarrito, setNotaCarrito } = useAppContext();

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        ¿Hay algo que la cocina debería tener en cuenta para preparar tu pedido?
      </Text>
      <TextInput
        accessibilityLabel="Nota para la cocina"
        maxLength={160}
        multiline
        onChangeText={setNotaCarrito}
        placeholder="Por ejemplo: sin sal"
        style={styles.input}
        textAlignVertical="top"
        value={notaCarrito}
      />
      <Text style={styles.counter}>{notaCarrito.length}/160</Text>
      <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.button}>
        <Text style={styles.buttonText}>Guardar nota</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    padding: 20,
  },
  description: {
    color: '#52615a',
    fontSize: 16,
    lineHeight: 23,
  },
  input: {
    backgroundColor: '#f1f5f2',
    borderColor: '#d9e2dc',
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 16,
    height: 140,
    padding: 14,
  },
  counter: {
    color: '#52615a',
    textAlign: 'right',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#215c3c',
    borderRadius: 10,
    padding: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
