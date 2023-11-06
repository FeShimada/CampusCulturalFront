import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

export default function PerfilIcon(props) {
    const { personImage, personName } = props;

    return (
        <View style={styles.container}>
            <Image style={styles.personIcon} source={personImage} />
            <Text style={styles.personName}>{personName}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width * 0.4, 
        height: Dimensions.get('window').width * 0.4,
        display: 'flex',
        alignItems: 'center',

    },
    personIcon: {
        height: '100%',
        width: '100%',
        borderRadius: Dimensions.get('window').width * 0.4 / 2,
        backgroundColor: '#d3d3d3',

    },
    personName: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#48b2fe',
        marginTop: 15
    },
})

