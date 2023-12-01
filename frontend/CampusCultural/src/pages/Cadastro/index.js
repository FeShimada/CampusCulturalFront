import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Switch, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TipoUsuarioEnum } from '../../enumerations/tipo-usuario-enum';
import axios from 'axios';
import { BACKEND_URL } from '@env'
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export default function Cadastro() {

    const navigation = useNavigation();
    const [isTeacher, setIsTeacher] = useState(false);
    const [animating, setAnimating] = useState(false);
    const [usuario, setUsuario] = useState({
        dsNome: '',
        dsSobrenome: '',
        dsEmail: '',
        senha: '',
        tpUsuario: TipoUsuarioEnum.ALUNO,
        dsImagem: '',
        dsUsuario: ''
    })
    const [error, setError] = useState('');

    const [senhaConfimar, setSenhaconfimar] = useState('')

    const toggleSwitch = () => setIsTeacher(previousState => !previousState);

    const handleSubmit = async () => {
        let tpUsuario = isTeacher ? TipoUsuarioEnum.PROFESSOR : TipoUsuarioEnum.ALUNO
        if (senhaConfimar !== usuario.senha) {
            setError("Senha não combina")
            return
        } else {
            setError('')
        }

        setAnimating(true)

        const obj = { ...usuario, tpUsuario: tpUsuario }

        try {
            await axios.post(`${BACKEND_URL}/usuario`, obj);
            Toast.show({
                type: 'success',
                text1: 'Sucesso',
                text2: 'Cadastrado com sucesso'
            })
            setTimeout(() => {
                setAnimating(false)
                navigation.goBack()
            }, 1000)
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Erro ao cadastrar'
            })
        }

    }

    return (
        <View style={styles.container}>

            <View style={styles.toastContainer}>
                <Toast />
            </View>

            <View style={styles.loading}>
                <ActivityIndicator animating={animating} size='large' />
            </View>

            <View style={styles.containerTitle}>
                <Text style={styles.title}>Cadastro</Text>
            </View>

            <View style={styles.containerForm}>
                <Text style={styles.label}>Primeiro Nome</Text>
                <TextInput
                    style={styles.input}
                    value={usuario.dsNome}
                    onChangeText={(text) => {
                        setUsuario({ ...usuario, dsNome: text })
                    }}
                />
            </View>
            <View style={styles.containerForm}>
                <Text style={styles.label}>Sobrenome</Text>
                <TextInput
                    style={styles.input}
                    value={usuario.dsSobrenome}
                    onChangeText={(text) => {
                        setUsuario({ ...usuario, dsSobrenome: text })
                    }}
                />
            </View>
            <View style={styles.containerForm}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={usuario.dsEmail}
                    onChangeText={(text) => {
                        setUsuario({ ...usuario, dsEmail: text })
                    }}
                />
            </View>
            <View style={styles.containerForm}>
                <Text style={styles.label}>Senha</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    value={usuario.senha}
                    onChangeText={(text) => {
                        setUsuario({ ...usuario, senha: text })
                    }}
                />
            </View>
            <View style={styles.containerForm}>
                <Text style={styles.label}>Digite novamente a senha</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    value={senhaConfimar}
                    onChangeText={(text) => {
                        setSenhaconfimar(text)
                    }}
                />
            </View>

            {error !== '' && (
                <Text style={styles.errorText}>{error}</Text>
            )}

            <View style={styles.switchContainer}>
                <Text style={styles.switchText}>Aluno</Text>
                <Switch
                    trackColor={{ false: "#48b2fe", true: "#3e3e3e" }}
                    thumbColor={isTeacher ? "#48b2fe" : "#48b2fe"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isTeacher}
                />
                <Text style={styles.switchText}>Professor</Text>
            </View>

            <View style={styles.containerButtom}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Inscrever-se</Text>
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
        backgroundColor: '#d1ecff',
    },
    errorText: {
        color: 'red',
        paddingStart: '10%',
        paddingEnd: '10%',
      },
    toastContainer: {
        zIndex: 9999
    },
    containerTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'guess-sans',
        fontSize: 32,
        color: '#48b2fe',
    },
    containerForm: {
        flex: 1,
        marginVertical: -45,
        paddingStart: '10%',
        paddingEnd: '10%',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 25,
        marginBottom: 10,
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 5,
        marginTop: -10,
        marginBottom: 12,
        height: 50,
        padding: 10,
    },
    containerButtom: {
        flex: 1,
        paddingStart: '10%',
        paddingEnd: '10%',
    },
    button: {
        backgroundColor: '#48b2fe',
        borderRadius: 5,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    buttonSubItens: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonSubItem: {
        marginTop: 8,
    },
    subItemText: {
        color: '#48b2fe',
        fontWeight: 'bold',
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    switchText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
        marginLeft: 10,
    },
});
