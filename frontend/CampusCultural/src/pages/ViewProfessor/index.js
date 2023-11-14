import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HomeCard from '../../components/HomeCard';
import PerfilIcon from '../../components/PerfilIcon';
import Icon from 'react-native-vector-icons/EvilIcons'
import { useNavigation } from '@react-navigation/native';

/** MÉTODOS AUXILIARES PARA SIMULAR UMA API */

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getFakeData() {
    let dataAux = {
        professor: {
            id: "123",
            nome: "Maria",
            sobrenome: "Rodrigues",
            email: "claudia123@gmail.com",
            senha: "senha",
            personImage: require('../Home/assets/personaImage.jpg'),
            descricao: "Professora de Artes na UTFPR."
        },
        eventos: []
    };

    const qtdDados = getRandomInt(50, 100);
    for (let i = 0; i < qtdDados; i++) {
        dataAux.eventos.push({
            idEvento: i.toString(),
            eventImage: require('../Home/assets/mockEventImage.jpeg'),
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

export default function ViewProfessor() {

    const [data, setData] = useState({});
    const [animating, setAnimating] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        loadData()
    }, [])

    return (
        <View style={styles.container}>

            <View style={styles.loading}>
                <ActivityIndicator animating={animating} size='large' />
            </View>

            <View style={styles.containerBotoes}>
                <TouchableOpacity >
                    <Icon style={styles.plus} name='plus' size={50} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('ViewPerfilAluno')} >
                    <Icon style={styles.gear} name='gear' size={50} onPress={() => navigation.navigate('ViewPerfilAluno')} />
                </TouchableOpacity>
            </View>

            <View style={styles.containerIcon}>
                {data.professor && (
                    <PerfilIcon
                        personImage={data.professor.personImage}
                        personName={data.professor.nome}
                        personNameColor="black"
                        personFontSize={35}
                    />


                )}

            </View>

            <View style={styles.containerDescricao}>
                {data.professor && (
                    <Text style={styles.textDescricao}>{data.professor.descricao}</Text>
                )}
            </View>

            <View style={styles.flatListContainer}>
                <FlatList
                    style={{ marginTop: 35 }}
                    contentContainerStyle={{ marginHorizontal: 20 }}
                    data={data.eventos || []}
                    keyExtractor={item => String(item.idEvento)}
                    renderItem={({ item }) =>
                        <HomeCard
                            personIcon={data.professor.personImage}
                            personName={data.professor.nome}
                            eventImage={item.eventImage}
                            eventTitle={item.eventTitle}
                        />
                    }
                />
            </View>

        </View>
    )

    /**
     * Carrega os dados
     *
    */
    function loadData(filters) {
        setAnimating(true)

        apiRequestSimulation()
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => setAnimating(false));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerBotoes: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    containerIcon: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    containerDescricao: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 4,
        borderBottomColor: '#d9d9d9',
        width: '80%'
    },
    textDescricao: {
        fontSize: 18,
        marginBottom: 5
    },
    flatListContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    gear: {
        position: 'absolute',
        left: 30
    },
    plus: {
        position: 'absolute',
        right: 30
    }
})
