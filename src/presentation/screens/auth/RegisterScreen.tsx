import { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { Alert, useWindowDimensions } from 'react-native';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { MyIcon } from '../../components/ui/MyIcon';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { RootStackParams } from '../../navigation/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({ navigation }: Props) => {
   const { register } = useAuthStore()
  
  const [form, setForm] = useState({ email: '', password: '', fullName: '' });
  const [isPosting, setIsPosting] = useState(false)
  
  const { height } = useWindowDimensions();

  const onRegister = async () => {
    if (form.email.length === 0 || form.password.length === 0 || form.fullName.length === 0) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    
    setIsPosting(true);

    const wasSAccessful = await register(form.fullName, form.email, form.password);

    setIsPosting(false);

    if (wasSAccessful) return;

    Alert.alert('Error', 'Todos los campos son obligatorios');
  }

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>
        <Layout style={{ paddingTop: height * 0.3 }}>
          <Text category="h1">Crear cuenta</Text>
          <Text category="p2">Por favor, crea una cuenta para continuar</Text>
        </Layout>

        {/* Inputs */}
        <Layout style={{ marginTop: 20 }}>
           <Input
            placeholder="Nombre completo"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.fullName}
            onChangeText={(fullName) => setForm({ ...form, fullName })}
            accessoryLeft={MyIcon({ name: 'person-outline', white: true })}
            style={{ marginBottom: 10 }}
          />

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

        {/* Space */}
        <Layout style={{ height: 20 }} />

        {/* Button */}
        <Layout>
          <Button
            accessoryRight={MyIcon({
              name: 'arrow-forward-outline',
              white: true,
            })}
            onPress={onRegister}
            disabled={isPosting}
          >
            Crear cuenta
          </Button>
        </Layout>

        {/* Space */}
        <Layout style={{ height: 50 }} />

        {/* Información para crear cuenta */}
        <Layout
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text category="p2">¿Ya tienes una cuenta? </Text>
          <Text
            status="primary"
            category="s1"
            onPress={() => navigation.goBack()}
          >
            Inicia sesión
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
