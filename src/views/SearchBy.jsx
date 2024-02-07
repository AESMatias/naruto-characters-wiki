import {
    StyleSheet, Text, View, Pressable, Button, Alert, Share, Linking
} from 'react-native'
import React, { useEffect } from 'react'
import { Modal } from '../components/Modal.jsx'
import { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';

export const SearchBy = () => {

    const [progress, setProgress] = useState(0);
    let timer;

    const handlePressIn = () => {
        clearInterval(timer);
        setProgress(0);
        timer = setInterval(() => {
            setProgress(prevProgress => prevProgress + 1);
        }, 100);
    };

    const handlePressOut = () => {
        clearInterval(timer);
        setProgress(0);
        console.log(' SOLTADOOOOOOOOOOOOOOOOOOOOO')
    };

    return (
        <View style={styles.background}>
            <Text style={styles.text}>SEARCH BY</Text>
            {//texto que aparece si se presiono 3s o mas el boton de presionar
                progress >= 100 ? <Text style={styles.text}>Pressed for {progress} seconds</Text> : null
            }
            <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={({ pressed }) => [
                    {
                        opacity: pressed ? 0.5 : 1.0,
                        backgroundColor: pressed ? 'blue' : 'gray',
                        width: 200,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                ]}
            // onPress={() => console.log('Pressed')}
            >

            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1 / 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerButtons: {
        flex: 1 / 6,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    container_text: {
        flex: 6 / 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        marginHorizontal: 45,
    },
    background: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: 'rgba(100, 100, 100, 0)',
        padding: 2,
        borderRadius: 5,
        textAlign: 'center',

    },
    button: {
        backgroundColor: 'rgba(20,20,25,1)',
        borderRadius: 5,
        padding: 20, // Ajusta el padding para hacer el botón más grande
        margin: 20,
        color: 'white',
        fontSize: 20, // Ajusta el tamaño de fuente del botón
    },
})