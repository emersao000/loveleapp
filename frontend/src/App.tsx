import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './context/AuthContext';
import { PostPrivacyProvider } from './context/PostPrivacyContext';
import { AppNavigator } from './navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <PostPrivacyProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </PostPrivacyProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
