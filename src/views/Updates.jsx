import { StyleSheet, Text, View, Pressable, Button, Alert, Share, Linking } from 'react-native'

import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { openURL } from '../utils/openURL'
import { useNavigation } from '@react-navigation/native';
import { playSound } from '../utils/tapSound.jsx';
import { useSelector } from 'react-redux';

export const Updates = () => {

    const { muted } = useSelector((state) => state.userReducer);

    const URL = 'https://play.google.com/store/apps/details?id=com.aesmatias.narutocharacterswiki'

    const onShare = async () => {
        if (!muted) {
            playSound();
        }
        try {
            const result = await Share.share({
                message:
                    `Naruto Characters Wiki! An application to search for your favorite characters from the Naruto series! Try it now on the Play Store! ${URL}`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    const openPlayStoreForRating = async () => {
        if (!muted) {
            playSound();
        }
        const packageName = 'com.aesmatias.narutocharacterswiki';
        const playStoreUrl = `market://details?id=${packageName}`;

        try {
            await Linking.openURL(playStoreUrl);
        } catch (error) {
            console.error('Error at opening the application on Play Store:', error);
        }
    };

    const navigation = useNavigation();

    return (
        <View style={styles.background}>
            <Text style={styles.text}>Updates and change logs</Text>

            <View style={styles.container}>
                <Pressable onPress={() => { openURL('https://twitter.com/AESMatias') }}>
                    <FontAwesome name="twitter-square" size={100} color={'white'} />
                </Pressable>
                <View style={styles.container_text}>
                    <Text style={styles.text}>Twitter / X: </Text>
                    <Text style={styles.text}>@AESMatias </Text>
                </View>
            </View>

            <View style={styles.containerButtons}>
                <Button title="Share the app!" onPress={() => { onShare() }} />
                <Button title="Rate on Play Store" onPress={() => { openPlayStoreForRating() }} />
                <Button title="Close" onPress={() => navigation.goBack()} />
            </View>
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
        flex: 1 / 5,
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
        backgroundColor: 'rgba(5,10,15,0.97)',
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