import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BACKEND_URL } from '@env'
import { TipoPessoaContext } from '../../contexts/TipoPessoaContext';

export default function Login() {
  const navigation = useNavigation();
  const [appReady, setAppReady] = useState(false);
  const [dsEmail, setDsEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const { setTpPessoa } = useContext(TipoPessoaContext)

  const handleLogin = async () => {

    try {
      const response = await axios.post(`${BACKEND_URL}/usuario/login`, {
        dsEmail,
        senha,
      });

      setError('')

      if (response.status === 200) {
        setTpPessoa(response.data)
        navigation.navigate('AppNav');
      } 
    } catch (error) {
      setError("Credenciais incorretas")
    }

  };

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          'guess-sans': require('../../../assets/fonts/guess-sans.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppReady(true);
      }
    })();
  }, []);

  const onLayout = useCallback(() => {
    if (appReady) {
      SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayout}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>CAMPUS CULTURAL</Text>
      </View>
      <View style={styles.containerForm}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={dsEmail}
          onChangeText={(text) => setDsEmail(text)}
        />
        <Text style={styles.label}>Senha</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          value={senha}
          onChangeText={(text) => setSenha(text)}
        />
        {error === 'Credenciais incorretas' && (
          <Text style={styles.errorText}>Credenciais incorretas</Text>
        )}
      </View>
      <View style={styles.containerButtom}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>
        <View style={styles.buttonSubItens}>
          <TouchableOpacity style={styles.buttonSubItem} onPress={() => navigation.navigate('PassawordRecovery')}>
            <Text style={styles.subItemText}>Esqueceu a senha</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSubItem} onPress={() => navigation.navigate('Cadastro')}>
            <Text style={styles.subItemText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1ecff',
  },
  errorText: {
    color: 'red'
  },
  containerTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'guess-sans',
    fontSize: 32,
    color: '#48b2fe',
  },
  containerForm: {
    flex: 1,
    paddingStart: '10%',
    paddingEnd: '10%',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 12,
    height: 50,
    padding: 10
  },
  containerButtom: {
    flex: 1,
    paddingStart: '10%',
    paddingEnd: '10%',
  },
  button: {
    backgroundColor: '#48b2fe',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttonSubItens: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonSubItem: {
    marginTop: 8,
  },
  subItemText: {
    color: '#48b2fe',
    fontWeight: 'bold',
  },
});