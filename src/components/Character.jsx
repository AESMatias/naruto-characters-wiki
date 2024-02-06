import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export const Character = ({ charData, setcharModal, setFilledModal, FilledModal, ...props }) => {

    const handlePress = () => {
        setcharModal(true);
        setFilledModal(prevObject => ({ ...prevObject, ...charData }));
        // We fill the modal with the character data
    }
    return (
        <TouchableOpacity onPress={() => handlePress()}>
            <View style={styles.general_container}>
                <View style={styles.container}>
                    <Image
                        style={styles.image}
                        source={{ uri: `${charData.images[0]}` }}
                    />
                    <Text style={styles.text}>{charData.name}</Text>
                </View>
                {/* <View styles={styles.container_info}> */}
                {/* <Text style={styles.text_info}>Status: {charData.status}</Text>
                <Text style={styles.text_info}>Species: {charData.species}</Text>
                <Text style={styles.text_info}>Gender: {charData.gender}</Text>
                <Text style={styles.text_info}>Location: {charData.location.name}</Text> */}
                {/* </View> */}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container_info: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 5,
    },
    general_container: {
        flex: 1,
        flexDirection: 'column',
        padding: 5,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderWidth: 0.8,
        borderColor: 'rgba(200, 255, 200, 0.8)',
        borderRadius: 10,
        width: '75%',
        alignSelf: 'center'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        borderRadius: 5,
        margin: 5,

    },
    text: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: 'rgba(10, 200, 220, 1)',
        padding: 2,
        marginTop: 3,
        borderRadius: 5,
        textShadowColor: 'black',
        textShadowOffset: { width: 0.5, height: 0.5 },
        textShadowRadius: 1,
        textAlign: 'center',
        minWidth: '60%',
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'black',
        alignSelf: 'center',

    }
})