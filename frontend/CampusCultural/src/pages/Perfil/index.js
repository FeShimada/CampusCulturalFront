import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Perfil() {
 return (
    <View style={styles.container}>
    <Text>Página Perfil</Text>
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
