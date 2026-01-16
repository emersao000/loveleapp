import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './context/AuthContext';
import { AppNavigator } from './navigation/AppNavigator';

function NavigationApp() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

function AppRoot() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationApp />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default AppRoot;
