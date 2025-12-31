import { Button, Layout, Text } from '@ui-kitten/components';
import { useAuthStore } from '../../store/auth/useAuthStore';

export const HomeScreen = () => {
  const { logout } = useAuthStore();

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>HomeScreen</Text>

      <Button onPress={logout}>Cerrar Sesión</Button>
    </Layout>
  );
};
