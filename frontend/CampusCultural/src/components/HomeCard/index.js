import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

export default function HomeCard(props) {
  const { personIcon, personName, eventImage, eventTitle } = props;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.titleContainer}>
        <Image style={styles.personIcon} source={{ uri: personIcon }} onError={(error) => console.error('Erro ao carregar a imagem:', error.nativeEvent.error)} />
        <Text style={styles.personName}>{personName}</Text>
      </View>
      <Image style={styles.imageStyle} source={{ uri: eventImage }} onError={(error) => console.error('Erro ao carregar a imagem:', error.nativeEvent.error)} />
      <Text style={styles.titleStyle}>{eventTitle}</Text>
    </View>
  );
}


const deviceWidth = Math.round(Dimensions.get('window').width)
const styles = StyleSheet.create({
  cardContainer: {
    width: deviceWidth - 100,
    height: 200,
    marginBottom: 150
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center'
  },
  personIcon: {
    height: 50,
    borderRadius: 100,
    width: 50
  },
  personName: {
    fontWeight: 'bold',
    marginHorizontal: 5,
    fontSize: 18
  },
  imageStyle: {
    height: '100%',
    width: deviceWidth - 100,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#dedfdf',
  },
  titleStyle: {
    fontSize: 20,
    marginVertical: 5
  }
})
