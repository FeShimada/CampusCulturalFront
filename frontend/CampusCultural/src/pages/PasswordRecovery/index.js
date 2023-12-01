import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { useCallback, useEffect } from 'react';


export default function PasswordRecovery() {

    const navigation = useNavigation();
    const [appReady, setAppReady] = useState(false);

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
                <Text style={styles.title}>RECUPERAÇÃO DE SENHA</Text>
            </View>

            <View style={styles.containerForm}>
                <Text style={styles.label}>E-mail</Text>
                <TextInput style={styles.input} />
            </View>

            <View style={styles.containerButtom}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>ENVIAR LINK DE RECUPERAÇÃO</Text>
                </TouchableOpacity>

                <View style={styles.buttonSubItens}>
                    <TouchableOpacity style={styles.buttonSubItem} onPress={() => navigation.goBack()}>
                        <Text style={styles.subItemText}>Voltar para o login</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d1ecff'
    },

    containerTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'guess-sans',
        fontSize: 32,
        color: '#48b2fe',
        textAlign: 'center'
    },

    containerForm: {
        flex: 1,
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
        height: 50,
        padding: 10
    },

    containerButtom: {
        flex: 1,
        paddingStart: '10%',
        paddingEnd: '10%'
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
    }
})