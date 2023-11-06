import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import CalendarioCard from '../../components/CalendarioCard';

/** MÉTODOS AUXILIARES PARA SIMULAR UMA API */

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Os meses são zero indexados, então somamos 1.
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function getFakeData() {
  const dataAux = [];

  const qtdDados = getRandomInt(50, 100);
  for (let i = 0; i < qtdDados; i++) {
    dataAux.push({
      id: i.toString(),
      eventDate: formatDate(new Date()),
      eventImage: require('../Home/assets/mockEventImage.jpeg'),
    });
  }

  return dataAux;
}

async function apiRequestSimulation() {
  return new Promise((resolve, reject) => {
    if (getRandomInt(0, 100) === 22) {
      reject('Ocorreu um erro');
    } else {
      setTimeout(() => {
        resolve({ data: getFakeData(), status: 200 });
      }, 3000);
    }
  })
}
/** MÉTODOS AUXILIARES PARA SIMULAR UMA API */

export default function Calendario() {

  const [data, setData] = useState([]);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    loadData()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <ActivityIndicator animating={animating} size='large' />
      </View>

      <FlatList
        style={{ marginTop: 35 }}
        contentContainerStyle={{ marginHorizontal: 20 }}
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) =>
          <CalendarioCard
            eventDate={item.eventDate}
            eventImage={item.eventImage}
          />
        }
        numColumns={2}
      />
    </View>
  );

  /**
  * Carrega os dados
  *
  */
  function loadData(filters) {
    setAnimating(true)

    apiRequestSimulation()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setAnimating(false));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
