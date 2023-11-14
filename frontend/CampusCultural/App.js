import { StatusBar } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { TipoPessoaProvider } from './src/contexts/TipoPessoaContext';

export default function App() {
  return (
    <NavigationContainer>
      <TipoPessoaProvider>
        <StatusBar barStyle="light-content"/>
        <Routes/>
      </TipoPessoaProvider>
    </NavigationContainer>
  );
}

