import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

export default function PerfilIcon(props) {
    const { personImage, personName, personNameColor, personFontSize } = props;

    const color = personNameColor || '#48b2fe';
    const fontSize = personFontSize || 25;

    return (
        <View style={styles.container}>
            <Image style={styles.personIcon} source={personImage} />
            <Text style={[styles.personName, { color, fontSize }]}>{personName}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width * 0.3, 
        height: Dimensions.get('window').width * 0.3,
        display: 'flex',
        alignItems: 'center',

    },
    personIcon: {
        height: '100%',
        width: '100%',
        borderRadius: Dimensions.get('window').width * 0.3 / 2,
        backgroundColor: '#d3d3d3',

    },
    personName: {
        fontWeight: 'bold',
        marginTop: 15
    },
})

