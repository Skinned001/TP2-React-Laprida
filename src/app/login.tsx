import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { DondeEstoy } from '../components/DondeEstoy';
import { useAppContext } from '../context/AppContext';

export default function LoginScreen() {
  const { iniciarSesion } = useAppContext();
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');

  function ingresar() {
    const resultado = iniciarSesion(usuario.trim(), clave);
    if (!resultado.exito) {
      setError(resultado.mensaje);
      return;
    }

    setError('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.description}>Ingresá con las credenciales del personal de cocina.</Text>
      <TextInput
        accessibilityLabel="Usuario"
        autoCapitalize="none"
        autoComplete="username"
        onChangeText={setUsuario}
        placeholder="Usuario"
        style={styles.input}
        value={usuario}
      />
      <TextInput
        accessibilityLabel="Clave"
        autoCapitalize="none"
        autoComplete="current-password"
        onChangeText={setClave}
        onSubmitEditing={ingresar}
        placeholder="Clave"
        secureTextEntry
        style={styles.input}
        value={clave}
      />
      {error ? (
        <Text accessibilityLiveRegion="polite" style={styles.error}>
          {error}
        </Text>
      ) : null}
      <Pressable accessibilityRole="button" onPress={ingresar} style={styles.button}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </Pressable>
      <Text style={styles.hint}>Usuario: cocina · Clave: ipf2026</Text>
      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    justifyContent: 'center',
    padding: 24,
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
    padding: 14,
  },
  error: {
    color: '#a33131',
    fontWeight: '600',
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
  hint: {
    color: '#52615a',
    fontSize: 13,
    textAlign: 'center',
  },
});
