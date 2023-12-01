import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HomeCard from '../../components/HomeCard';
import PerfilIcon from '../../components/PerfilIcon';
import Icon from 'react-native-vector-icons/EvilIcons'
import { useNavigation } from '@react-navigation/native';
import { TipoPessoaContext } from '../../contexts/TipoPessoaContext';
import { BACKEND_URL } from '@env'
import axios from 'axios';

export default function ViewProfessor() {

    const [data, setData] = useState({});
    const [animating, setAnimating] = useState(false);
    const navigation = useNavigation();
    const { tpPessoa } = useContext(TipoPessoaContext)

    useEffect(() => {
        const buscarEventos = async () => {
            setAnimating(true)
            try {
                const response = await axios.get(`${BACKEND_URL}/evento/usuario/` + tpPessoa.idUsuario).finally(() => setAnimating(false));
                setData(response.data);
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        buscarEventos()
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
                <PerfilIcon
                    personImage={tpPessoa.dsImagem}
                    personName={tpPessoa.dsNome}
                    personNameColor="black"
                    personFontSize={35}
                />

            </View>

            <View style={styles.containerDescricao}>
                <Text style={styles.textDescricao}>{tpPessoa.dsUsuario}</Text>
            </View>

            <View style={styles.flatListContainer}>
                <FlatList
                    style={{ marginTop: 35 }}
                    contentContainerStyle={{ marginHorizontal: 20 }}
                    data={data || []}
                    keyExtractor={item => String(item.idEvento)}
                    renderItem={({ item }) =>
                        <HomeCard
                            personIcon={item.usuario.dsImagem}
                            personName={item.usuario.dsNome}
                            eventImage={item.dsImagem}
                            eventTitle={item.dsTitulo}
                        />
                    }
                />
            </View>

        </View>
    )
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
