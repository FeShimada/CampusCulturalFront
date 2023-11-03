import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

export default function CalendarioCard(props) {
  const { eventDate, eventImage } = props;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{eventDate}</Text>
      </View>
      <Image style={styles.imageStyle} source={eventImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 180,
    height: 120,
    marginBottom: 60,
    marginRight: 5,
    marginLeft: 5 
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  personIcon: {
    height: 50,
    borderRadius: 100,
    width: 50
  },
  date: {
    fontWeight: 'bold',
    marginHorizontal: 5,
    fontSize: 18,
    color: '#48b2fe'
  },
  imageStyle: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#dedfdf',
  },
  titleStyle: {
    fontSize: 20,
    marginVertical: 5
  }
})
