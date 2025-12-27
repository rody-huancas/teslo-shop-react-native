import 'react-native-gesture-handler';
import * as eva from '@eva-design/eva';

import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { StackNavigator } from './presentation/navigation/StackNavigator';

export const ProductsApp = () => {
  const colorScheme = useColorScheme();
  const theme       = colorScheme === 'dark' ? eva.dark : eva.light;

  return (
    <>
      <ApplicationProvider {...eva} theme={theme}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </ApplicationProvider>

      <IconRegistry icons={EvaIconsPack} />
    </>
  );
};
