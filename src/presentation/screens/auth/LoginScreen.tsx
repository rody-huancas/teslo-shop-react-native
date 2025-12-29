import { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { Alert, useWindowDimensions } from 'react-native';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { MyIcon } from '../../components/ui/MyIcon';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { RootStackParams } from '../../navigation/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({ navigation }: Props) => {
  const { login } = useAuthStore()

  const [isPosting, setIsPosting] = useState(false)

  const [form, setForm] = useState({ email: '', password: '' });

  const { height } = useWindowDimensions();

  const onLogin = async () => {
    if (form.email.length === 0 || form.password.length === 0) {
      return;
    }

    setIsPosting(true);

    const wasSAccessful = await login(form.email, form.password);

    setIsPosting(false);

    if (wasSAccessful) return;

    Alert.alert('Error', 'Revisa tus credenciales');
  }

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout style={{ paddingTop: height * 0.35 }}>
          <Text category="h1">Ingresar</Text>
          <Text category="p2">Por favor, ingresa para continuar</Text>
        </Layout>

        {/* Inputs */}
        <Layout style={{ marginTop: 20 }}>
          <Input
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(email) => setForm({ ...form, email })}
            accessoryLeft={MyIcon({ name: 'email-outline', white: true })}
            style={{ marginBottom: 10 }}
          />

          <Input
            placeholder="Contraseña"
            autoCapitalize="none"
            secureTextEntry
            value={form.password}
            onChangeText={(password) => setForm({ ...form, password })}
            accessoryLeft={MyIcon({ name: 'lock-outline', white: true })}
            style={{ marginBottom: 10 }}
          />
        </Layout>

        <Text>{JSON.stringify(form, null, 2)}</Text>

        {/* Space */}
        <Layout style={{ height: 20 }} />

        {/* Button */}
        <Layout>
          <Button
            accessoryRight={MyIcon({ name: 'arrow-forward-outline', white: true })}
            onPress={onLogin}
            // disabled={isPosting}
          >
            Ingresar
          </Button>
        </Layout>

        {/* Space */}
        <Layout style={{ height: 50 }} />

        {/* Información para crear cuenta */}
        <Layout style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text category="p2">¿No tienes una cuenta? </Text>
          <Text status="primary" category="s1" onPress={() => navigation.navigate('RegisterScreen')}>
            Crea una
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
