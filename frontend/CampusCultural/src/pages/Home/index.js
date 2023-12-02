import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import HomeCard from '../../components/HomeCard';
import { BACKEND_URL } from '@env'
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

export default function Home() {

  const [animating, setAnimating] = useState(false);
  const [data, setData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const buscarEventos = async () => {
        setAnimating(true);
        try {
          const response = await axios.get(`${BACKEND_URL}/evento`).finally(() => setAnimating(false));
          setData(response.data);
        } catch (error) {
          console.log(error);
        }
      }
      buscarEventos();
    }, []) 
  );

  return (
    <View style={styles.container}>

      <View style={styles.container}>
        <ActivityIndicator animating={animating} size='large' />
      </View>

      <FlatList
        style={{ marginTop: 35 }}
        contentContainerStyle={{ marginHorizontal: 20 }}
        data={data}
        keyExtractor={item => String(item.idEvento)}
        renderItem={({ item }) =>
          <HomeCard
            personIcon={item.usuario.dsImagem}
            personName={item.usuario.dsNome}
            eventImage={item.dsImagem}
            eventTitle={item.dsTitulo}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
