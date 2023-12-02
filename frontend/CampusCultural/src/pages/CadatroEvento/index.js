import React, { useContext, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ToastAndroid, Alert, Image, Button } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { TipoPessoaContext } from '../../contexts/TipoPessoaContext';
import axios from 'axios';
import { BACKEND_URL } from '@env'
import * as ImagePicker from 'expo-image-picker';
import { SimNaoenum } from '../../enumerations/sim-nao-enum';
import { useNavigation } from '@react-navigation/native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

export default function CadastroEvento() {

    const [animating, setAnimating] = useState(false);
    const [initialValues, setInitialValues] = useState({
        dsTitulo: '',
        dsImagem: '',
        snPublicado: SimNaoenum.SIM,
        dsEvento: '',
        usuario: undefined
    });
    const { tpPessoa } = useContext(TipoPessoaContext)
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date());

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };

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
                setInitialValues({ ...initialValues, dsImagem: assets[0].uri })
            }
        }
    }

    const day = new Intl.DateTimeFormat('pt-BR', { day: '2-digit' }).format(date);
    const month = new Intl.DateTimeFormat('pt-BR', { month: '2-digit' }).format(date);
    const year = new Intl.DateTimeFormat('pt-BR', { year: 'numeric' }).format(date);

    const formattedDate = `${day}/${month}/${year}`;

    return (

        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

            <View style={styles.toastContainer}>
                <Toast />
            </View>

            <View style={styles.loading}>
                <ActivityIndicator animating={animating} size='large' />
            </View>

            <View style={styles.containerTitle}>
                <TouchableOpacity style={styles.personIcon} onPress={handleChangePhoto}>
                    <Image
                        style={styles.personIcon}
                        source={
                            initialValues.dsImagem
                                ? { uri: initialValues.dsImagem }
                                : require('../../../assets/greyscreen.png')
                        }
                        onError={(error) =>
                            console.error('Erro ao carregar a imagem:', error.nativeEvent.error)
                        }
                    />

                </TouchableOpacity>
            </View>
            <View style={styles.containerForm}>
                <Text style={styles.label}>Nome Evento</Text>
                <TextInput
                    style={styles.input}
                    value={initialValues.dsTitulo}
                    onChangeText={(text) => {
                        setInitialValues({ ...initialValues, dsTitulo: text })
                    }}
                />
                <View style={styles.datePicker}>
                    <Button onPress={showDatepicker} title="Escolher data" />
                    <Text style={styles.dateText}>{formattedDate}</Text>
                </View>
                <Text style={styles.label}>Descrição</Text>
                <TextInput
                    style={styles.input}
                    value={initialValues.dsEvento}
                    onChangeText={(text) => {
                        setInitialValues({ ...initialValues, dsEvento: text })
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

        const obj = {
            ...initialValues, usuario: tpPessoa, dtEvento: date
        }

        try {
            await axios.post(`${BACKEND_URL}/evento`, obj)
            Toast.show({
                type: 'success',
                text1: 'Sucesso',
                text2: 'Cadastro com sucesso'
            })

            setTimeout(() => {
                setAnimating(false)
                navigation.goBack()
            }, 1000)
        } catch (error) {
            console.log(error)
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Erro ao cadastrar'
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    personIcon: {
        height: '100%',
        width: '100%',
        backgroundColor: '#d3d3d3',
        borderRadius: 20,
        height: 300
    },
    toastContainer: {
        zIndex: 9999
    },
    containerTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
        width: '80%',
        alignSelf: 'center',
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
        marginTop: 12,
        marginBottom: 24
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    datePicker: {
        width: '100%',
        marginBottom: 12,
    },
    dateText: {
        backgroundColor: '#e7e7e7',
        borderRadius: 5,
        marginTop: 12,
        height: 50,
        padding: 10,
        textAlignVertical: 'center'
    },
})
