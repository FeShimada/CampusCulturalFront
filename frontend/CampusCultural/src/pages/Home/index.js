import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import HomeCard from '../../components/HomeCard';

/** MÉTODOS AUXILIARES PARA SIMULAR UMA API */

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getFakeData() {
  const dataAux = [];

  const qtdDados = getRandomInt(50, 100);
  for (let i = 0; i < qtdDados; i++) {
    dataAux.push({
      id: i.toString(),
      personIcon: require('./assets/personaImage.jpg'),
      personName: 'Maria',
      eventImage: require('./assets/mockEventImage.jpeg'),
      eventTitle: 'Lorem ipsum dolor sit amet'
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

export default function Home() {

  const [animating, seAnimating] = useState(false);
  const [data, setData] = useState([]);

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
          <HomeCard
            personIcon={item.personIcon}
            personName={item.personName}
            eventImage={item.eventImage}
            eventTitle={item.eventTitle}
          />
        }
      />
    </View>
  );

  /**
  * Carrega os dados
  *
  */
  function loadData(filters) {
    seAnimating(true)

    apiRequestSimulation()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => seAnimating(false));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
