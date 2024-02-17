import {
    StyleSheet, Text, View, Pressable, Button, Alert, Share, Linking, Switch
} from 'react-native'
import React from 'react'
import { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { playSound } from '../utils/tapSound.jsx';
import { openURL } from '../utils/openURL.jsx'
import { setMuted } from '../store/slices/AccountSlice.jsx'
import { useDispatch, useSelector } from 'react-redux';

export const About = () => {

    const { currentUser } = useSelector((state) => state.userReducer);
    const { muted } = useSelector((state) => state.userReducer);

    dispatch = useDispatch();
    const [isSwitchEnabled, setIsSwitchEnabled] = useState(true);


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
            await Linking.openURL(playStoreUrl, muted);
        } catch (error) {
            console.error('Error at opening the application on Play Store:', error);
        }
    };

    const toggleSwitch = () => {
        if (!isSwitchEnabled) {
            playSound();
        }

        setIsSwitchEnabled(previousState => !previousState);

        dispatch(setMuted(isSwitchEnabled));
    };


    return (
        <View style={styles.background}>
            <Text style={styles.text}>Hello {currentUser ? JSON.parse(currentUser).email : `Anonymous`}</Text>
            <Text style={styles.text}>Made by Wholeheartedly</Text>

            <View style={styles.container}>
                <Pressable onPress={() => { openURL('https://twitter.com/AESMatias', muted) }}>
                    <FontAwesome name="twitter-square" size={80} color={'white'} />
                </Pressable>
                <View style={styles.container_text}>
                    <Text style={styles.text}>Twitter / X: </Text>
                    <Text style={styles.text}>@AESMatias </Text>
                </View>
            </View>

            <View style={styles.container}>
                <Pressable onPress={() => { openURL('https://github.com/AESMatias', muted) }}>
                    <FontAwesome name="github-square" size={80} color={'white'} />
                </Pressable>
                <View style={styles.container_text}>
                    <Text style={styles.text}>GitHub: </Text>
                    <Text style={styles.text}>@AESMatias </Text>
                </View>
            </View>

            <View style={styles.containerButtons}>
                <Button title="Share the app!" onPress={() => { onShare() }} />
                <Button title="Rate on Play Store" onPress={() => { openPlayStoreForRating() }} />
            </View>

            <View>
                <Text style={{ color: 'white' }}>{(muted === false) ? 'Sound ON' : 'Sound OFF'}</Text>
                <Switch
                    trackColor={{ true: "#767577", false: "rgba(120,150,240,1)" }}
                    thumbColor={!isSwitchEnabled ? "rgba(100,150,150,1)" : "rgba(100,100,100,1)"}
                    onValueChange={toggleSwitch}
                    value={muted}
                    style={{ transform: [{ scale: 1.5 }] }}
                />
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
        flex: 1 / 6,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    container_text: {
        flex: 5 / 10,
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