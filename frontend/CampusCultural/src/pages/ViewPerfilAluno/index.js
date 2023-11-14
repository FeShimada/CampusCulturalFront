import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import PerfilIcon from '../../components/PerfilIcon';

/** MÉTODOS AUXILIARES PARA SIMULAR UMA API */

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getFakeData() {
    let dataAux = {};

    dataAux = {
        id: "123",
        nome: "Maria",
        sobrenome: "Rodrigues",
        email: "claudia123@gmail.com",
        senha: "senha",
        personImage: require('../Home/assets/personaImage.jpg'),
    };

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

export default function ViewPerfilAluno() {

    const [data, setData] = useState({});
    const [animating, setAnimating] = useState(false);
    const [value, setValue] = useState(data);

    useEffect(() => {
        loadData()
    }, [])

    return (

        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

            <View style={styles.toastContainer}>
                <Toast/>
            </View>

            <View style={styles.loading}>
                <ActivityIndicator animating={animating} size='large' />
            </View>

            <View style={styles.containerTitle}>
                <PerfilIcon personImage={data.personImage} personName={data.nome} />
            </View>
            <View style={styles.containerForm}>
                <Text style={styles.label}>Primeiro Nome</Text>
                <TextInput
                    style={styles.input}
                    value={value.nome}
                    onChangeText={(text) => {
                        setValue({...value, nome: text})
                    }}
                />
                <Text style={styles.label}>Sobrenome</Text>
                <TextInput
                    style={styles.input}
                    value={value.sobrenome}
                    onChangeText={(text) => {
                        setValue({...value, sobrenome: text})
                    }}
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={value.email}
                    onChangeText={(text) => {
                        setValue({...value, email: text})
                    }}
                />
                <Text style={styles.label}>Senha</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    value={value.senha}
                    onChangeText={(text) => {
                        setValue({...value, senha: text})
                    }}
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>SALVAR</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
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
                setValue(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => setAnimating(false));
    }

    function handleSubmit() {
        setAnimating(true)
        setTimeout(() => {

            setData(value)

            Toast.show({
                type: 'success',
                text1: 'Sucesso',
                text2: 'Editado com sucesso'
            })

            setAnimating(false)
        }, 3000);
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    toastContainer: {
        zIndex: 9999
    },
    containerTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50
    },
    containerForm: {
        flex: 1,
        paddingStart: '10%',
        paddingEnd: '10%',
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#48b2fe'
    },
    input: {
        backgroundColor: '#e7e7e7',
        borderRadius: 5,
        marginBottom: 12,
        height: 50,
        padding: 10
    },
    button: {
        backgroundColor: '#6fc081',
        borderRadius: 50,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        width: '30%',
        alignSelf: 'flex-end',
        marginTop: 12
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
})
