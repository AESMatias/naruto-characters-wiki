import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import React from 'react'
import { searchByName } from './Fetching';

export const WriteNameComponent = ({ setdataFetched, onChangeText, text }) => {
    const handleFetch = async () => {
        const nameSearched = await searchByName(text);
        setdataFetched(nameSearched);

        // arrayOfCharacters.then((data) => {
        //     console.log('data', data);
        // })
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search by name"
                clearTextOnFocus={true}
                style={styles.input}
                onChangeText={text => onChangeText(text)}
                value={text}
            />
            <Pressable
                onPress={handleFetch}
                activeOpacity={0.5}
                style={styles.button}>
                <Text style={styles.text}>Search!</Text>
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1 / 10,
        width: '99%',
        flexDirection: 'column',
        backgroundColor: 'rgba(10,30,60,1)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25,
        marginBottom: 2,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
    },
    input: {
        height: 40,
        margin: 2,
        borderWidth: 1,
        width: '90%',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: 1,
        borderRadius: 5,
        textAlign: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        fontStyle: 'italic',
        color: 'rgba(0,0,0,0.5)',
        fontSize: 15,

    },
    button: {
        alignItems: "center",
        borderRadius: 5,
        borderColor: 'blue',
        backgroundColor: 'rgba(20,50,100,1)',
        borderWidth: 0.5,
        textTransform: 'uppercase',
        color: 'white',
        alignSelf: 'center',
        width: '80%',
        padding: 1,
        margin: 5,
    },
    text: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 6,
    }
});