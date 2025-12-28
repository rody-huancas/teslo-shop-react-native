import { ScrollView } from 'react-native-gesture-handler';
import { StackScreenProps } from '@react-navigation/stack';
import { useWindowDimensions } from 'react-native';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { MyIcon } from '../../components/ui/MyIcon';
import { RootStackParams } from '../../navigation/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({ navigation }: Props) => {
  const { height } = useWindowDimensions();

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
            accessoryLeft={MyIcon({ name: 'email-outline', white: true })}
            style={{ marginBottom: 10 }}
          />

          <Input
            placeholder="Contraseña"
            autoCapitalize="none"
            secureTextEntry
            accessoryLeft={MyIcon({ name: 'lock-outline', white: true })}
            style={{ marginBottom: 10 }}
          />
        </Layout>

        {/* Space */}
        <Layout style={{ height: 20 }} />

        {/* Button */}
        <Layout>
          <Button
            accessoryRight={MyIcon({ name: 'arrow-forward-outline', white: true })}
            onPress={() => {}}
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
