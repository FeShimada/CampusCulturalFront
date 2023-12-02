import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import CalendarioCard from '../../components/CalendarioCard';
import axios from 'axios';
import { BACKEND_URL } from '@env'
import { useFocusEffect } from '@react-navigation/native';

export default function Calendario() {

  const [data, setData] = useState([]);
  const [animating, setAnimating] = useState(false);

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
          <CalendarioCard
            eventDate={item.dtEvento}
            eventImage={item.dsImagem}
          />
        }
        numColumns={2}
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
