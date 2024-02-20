import {
    StyleSheet, Text, View, Pressable, Button, Alert, Share, Linking, Switch
    , Image
} from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { playSound } from '../utils/tapSound.jsx';
import { openURL } from '../utils/openURL.jsx'
import { setMuted } from '../store/slices/AccountSlice.jsx'
import { useDispatch, useSelector } from 'react-redux';

export const About = () => {


    const { currentUser, muted } = useSelector((state) => state.userReducer);
    dispatch = useDispatch();

    [isSound, setIsSound] = useState(false);

    useLayoutEffect(() => {
        setIsSound(muted);
    }, [muted]);

    const URL = 'https://play.google.com/store/apps/details?id=com.aesmatias.narutocharacterswiki'

    const onShare = async () => {

        if (!isSound) {
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
        if (isSound === false) {
            playSound();
        }

        const packageName = 'com.aesmatias.narutocharacterswiki';
        const playStoreUrl = `market://details?id=${packageName}`;

        try {
            await Linking.openURL(playStoreUrl, isSound);
        } catch (error) {
            console.error('Error at opening the application on Play Store:', error);
        }
    };

    const toggleSwitch = () => {
        // if (!isSwitchEnabled) {
        //     playSound();
        // }

        // setIsSwitchEnabled(previousState => !previousState);

        dispatch(setMuted(!isSound));
    };


    return (
        <View style={styles.background}>

            <View style={styles.containerImage}>
                <Image source={require('../assets/logo02.png')} style={styles.profileImage} />
            </View>
            <Text style={styles.text}>{currentUser ? `Hello, ` + JSON.parse(currentUser).email + `!` : null}</Text>

            <View style={styles.container}>
                <Pressable style={{ marginHorizontal: 10 }} onPress={() => { openURL('https://twitter.com/AESMatias', isSound) }}>
                    <FontAwesome name="twitter-square" size={60} color={'white'} />
                </Pressable>
                {/* <View style={styles.container_text}>
                    <Text style={styles.text}>Twitter / X: </Text>
                    <Text style={styles.text}>@AESMatias </Text>
                </View> */}
                <Pressable style={{ marginHorizontal: 10 }} onPress={() => { openURL('https://github.com/AESMatias', isSound) }}>
                    <FontAwesome name="github-square" size={60} color={'white'} />
                </Pressable>
                {/* <View style={styles.container_text}>
                    <Text style={styles.text}>GitHub: </Text>
                    <Text style={styles.text}>@AESMatias </Text>
                </View> */}
            </View>

            <View style={styles.containerButtons}>
                <Button title="Share the app!" onPress={() => { onShare() }} />
                <Button title="Rate on Play Store" onPress={() => { openPlayStoreForRating() }} />
            </View>

            <View>
                <Text style={{ color: 'white', marginTop: 3 }}>{(isSound === true) ? 'Sound OFF' : 'Sound ON'}</Text>
                <Switch
                    trackColor={{ true: "rgba(120,150,240,1)", false: "#767577" }}
                    thumbColor={isSound ? "rgba(100,100,100,1)" : "rgba(100,100,100,1)"}
                    onValueChange={toggleSwitch}
                    value={!isSound}
                    style={{ transform: [{ scale: 1.5 }] }}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    profileImage: {
        width: 280,
        height: 170,
        marginVertical: 10,
        padding: 20,
    },
    containerImage: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

    },
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
        justifyContent: 'space-between',
    },
    container_text: {
        flex: 5 / 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        marginHorizontal: 0,
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
        fontSize: 16,
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