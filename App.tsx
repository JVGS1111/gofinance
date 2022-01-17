
import React from 'react';
import { StatusBar } from 'react-native'
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import 'react-native-gesture-handler';

import { ThemeProvider } from 'styled-components/native';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading';
import theme from './src/Global/styles/theme';
import { NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from './src/routes/app.routes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { SignIn } from './src/Screens/SingIn'
import { AuthProvider } from './src/Hooks/Auth';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }
  return (
    <ThemeProvider theme={theme} >
      <NavigationContainer>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar barStyle='light-content' />
          <AuthProvider>
            <SignIn />
          </AuthProvider>
        </GestureHandlerRootView>
      </NavigationContainer>
    </ThemeProvider>
  );
}

