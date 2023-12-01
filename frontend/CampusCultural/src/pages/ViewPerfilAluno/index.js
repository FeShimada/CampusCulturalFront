import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ToastAndroid, Alert } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import PerfilIcon from '../../components/PerfilIcon';
import { TipoPessoaContext } from '../../contexts/TipoPessoaContext';
import axios from 'axios';
import { BACKEND_URL } from '@env'
import * as ImagePicker from 'expo-image-picker';

export default function ViewPerfilAluno() {

    const [data, setData] = useState({});
    const [animating, setAnimating] = useState(false);
    const [initialValues, setInitialValues] = useState({
        dsNome: '',
        dsSobrenome: '',
        dsEmail: '',
        senha: '',
    });
    const { tpPessoa, setTpPessoa } = useContext(TipoPessoaContext)

    useEffect(() => {
        const buscarUsuario = async () => {
            setAnimating(true)
            try {
                const response = await axios.get(`${BACKEND_URL}/usuario/` + tpPessoa.idUsuario).finally(() => setAnimating(false));
                setInitialValues(response.data);
            } catch (error) {
                console.log(error)
            }
        }
        buscarUsuario()
    }, [])

    const handleChangePhoto = async () => {
        const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!granted) {
            Alert.alert(
                'Permissão necessária',
                'Permita que sua aplicação acesse as imagens'
            );
        } else {
            const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                base64: false,
                aspect: [4, 4],
                quality: 1,
            });

            if (canceled) {
                ToastAndroid.show('Operação cancelada', ToastAndroid.SHORT);
            } else {

                console.log(assets[0].uri)
                setInitialValues({...initialValues, dsImagem: assets[0].uri})
            }
        }
    }

    return (

        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

            <View style={styles.toastContainer}>
                <Toast />
            </View>

            <View style={styles.loading}>
                <ActivityIndicator animating={animating} size='large' />
            </View>

            <View style={styles.containerTitle}>
                <PerfilIcon personImage={initialValues.dsImagem} personName={tpPessoa.dsNome} handleChangePhoto={handleChangePhoto} />
            </View>
            <View style={styles.containerForm}>
                <Text style={styles.label}>Primeiro Nome</Text>
                <TextInput
                    style={styles.input}
                    value={initialValues.dsNome}
                    onChangeText={(text) => {
                        setInitialValues({ ...initialValues, dsNome: text })
                    }}
                />
                <Text style={styles.label}>Sobrenome</Text>
                <TextInput
                    style={styles.input}
                    value={initialValues.dsSobrenome}
                    onChangeText={(text) => {
                        setInitialValues({ ...initialValues, dsSobrenome: text })
                    }}
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={initialValues.dsEmail}
                    onChangeText={(text) => {
                        setInitialValues({ ...initialValues, dsEmail: text })
                    }}
                />
                <Text style={styles.label}>Senha</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    value={initialValues.senha}
                    onChangeText={(text) => {
                        setInitialValues({ ...initialValues, senha: text })
                    }}
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>SALVAR</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );

    async function handleSubmit() {
        setAnimating(true)

        try {
            await axios.put(`${BACKEND_URL}/usuario`, initialValues).finally(() => setAnimating(false));
            setTpPessoa(initialValues)
            Toast.show({
                type: 'success',
                text1: 'Sucesso',
                text2: 'Editado com sucesso'
            })
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Erro ao editar'
            })
        }
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
