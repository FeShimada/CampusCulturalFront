import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useFonts } from "expo-font"
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';

export default function Cadastro() {

    const navigation = useNavigation(); 

    return (
        <View style={styles.container}>

            <View style={styles.buttonSubItens}>
                <TouchableOpacity style={styles.buttonSubItem} onPress={() => navigation.goBack()}>
                    <Text style={styles.subItemText}>Voltar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.containerForm}>
                <Text style={styles.label}>Primeiro Nome</Text>
                <TextInput style={styles.input} />
            </View>
            <View style={styles.containerForm}>
                <Text style={styles.label}>Sobrenome</Text>
                <TextInput style={styles.input} />
            </View>
            <View style={styles.containerForm}>
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} />
            </View>
            <View style={styles.containerForm}>
                <Text style={styles.label}>Senha</Text>
                <TextInput style={styles.input} />
            </View>
            <View style={styles.containerForm}>
                <Text style={styles.label}>Digite novamente a senha</Text>
                <TextInput style={styles.input} />
            </View>
            <View style={styles.containerButtom}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Inscrever-se</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d1ecff'
    },
    buttonSubItens: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonSubItem: {
        marginTop: 8
    },
    subItemText: {
        color: '#48b2fe',
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#48b2fe',
        borderRadius: 5,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    containerForm: {
        backgroundColor: 'white',
        paddingStart: '10%',
        paddingEnd: '10%'
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 12,
        height: 50
    },
    containerButtom: {
        flex: 1,
        paddingStart: '10%',
        paddingEnd: '10%'
    },
})