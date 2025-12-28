import 'react-native-gesture-handler';
import * as eva from '@eva-design/eva';

import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { StackNavigator } from './presentation/navigation/StackNavigator';

export const ProductsApp = () => {
  const colorScheme     = useColorScheme();
  const theme           = colorScheme === 'dark' ? eva.dark : eva.light;
  const backgroundColor = (colorScheme === 'dark') ? theme['color-basic-800'] : theme['color-basic-100'];

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      
      <ApplicationProvider {...eva} theme={theme}>
        <NavigationContainer theme={{
          dark  : colorScheme === "dark",
          colors: {
            primary     : theme["color-primary-500"],
            background  : backgroundColor,
            card        : theme["color-basic-100"],
            text        : theme["text-basic-color"],
            border      : theme["color-basic-800"],
            notification: theme["color-primary-500"],
          },
          fonts: {
            regular: {
              fontFamily: 'System',
              fontWeight: '400',
            },
            medium: {
              fontFamily: 'System',
              fontWeight: '500',
            },
            bold: {
              fontFamily: 'System',
              fontWeight: '700',
            },
            heavy: {
              fontFamily: 'System',
              fontWeight: '900',
            },
          },
        }}>
          <StackNavigator />
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};
