import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { Router } from './app/routes';
import {AuthProvider} from './app/Providers/AuthProvider';

console.ignoredYellowBox = [
  'Setting a timer'
]

export default function App() {
  return (
    <AuthProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <Router/>
        </NavigationContainer>
      </NativeBaseProvider>
    </AuthProvider>
  );
}