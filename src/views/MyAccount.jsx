import {
    StyleSheet, Text, View, Alert, Image, TextInput, TouchableOpacity
} from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { BlurView } from 'expo-blur';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { app } from '../../firebaseConfig.js';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, clearUser } from '../store/slices/AccountSlice.jsx';
import _ from 'lodash';
import { setAuthStorage, logOutStorage } from '../utils/setAuthData.jsx';
import { playSound } from '../utils/tapSound.jsx';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';


WebBrowser.maybeCompleteAuthSession();


export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const LoggedScreen = () => {
    const { currentUser } = useSelector((state) => state.userReducer);
    const navigation = useNavigation();

    return (
        <View style={styles.background}>
            <StatusBar style='auto' />
            <Text style={styles.text}>You are logged in as: </Text>
            <Text style={styles.text}>{currentUser ? JSON.parse(currentUser).email : 'Not Logged'}</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => { handleLogOut(navigation, currentUser) }}>
                <Text style={[styles.text, styles.textButton]}>Sign out</Text>
            </TouchableOpacity>
        </View>
    )

}

const handleLogOut = async (navigation, currentUser) => {
    navigation.navigate('Login');
    playSound();
    logOutStorage();
    await signOut(auth);
    dispatch(clearUser());
    console.log('User signed out, NOW EL CURRENT USER IS ', currentUser);
    navigation.navigate('Login');
}

const LoginScreen = () => {

    const [googleUserInfo, setGoogleUserInfo] = useState({});
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: 'https://328352683861-d12j76qqdps3i06d3s57ffcfdb0sig3v.apps.googleusercontent.com/',
    });

    const [email, setEmail] = useState(``)
    const [password, setPassword] = useState(``)
    const [isLogged, setIsLogged] = useState(false);

    //Redux Store
    const { currentUser } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();


    const navigation = useNavigation();

    const checkGoogleLocalUser = async () => {

        try {
            const userData = await AsyncStorage.getItem('@Gauth');
            const formattedUser = await JSON.parse(userData);

            if (formattedUser !== null) {
                return formattedUser;
                console.log('Google User is logged in:', formattedUser);
            }
        } catch (error) {
            console.error('Error at checkAuthStorage', error);
            return null;
        }
    };
    const saveGoogleLocalUser = async (token) => {
        if (!token) return null;
        try {
            const response = await fetch(`https://www.googleapis.com/userinfo/v2/me`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            const userInfo = await response.json();
            await AsyncStorage.setItem('@Gauth', JSON.stringify(userInfo));
            setGoogleUserInfo(userInfo);
        } catch (error) {
            console.error('Error at checkAuthStorage', error);
            return null;
        }
    };


    auth.onAuthStateChanged((user) => {

        // console.warn('teh current user is ', user, typeof user)

        if (user) {
            // setPersistence(auth, AsyncStorage);
            // navigation.navigate('Logged');
            setAuthStorage(user);
            setIsLogged(true);
        } else {
            // navigation.navigate('Login');
            // console.error('THE onAuthStateChanged is not working properly, the user is not logged in.');
            dispatch(clearUser());
            setIsLogged(false);
        }
        // console.log('onAuthStateChanged:', user.email);
    });

    const handleGoogleOAuth = () => {
        playSound();
        if (password === 'test') {
            try {
                console.log('promptAsync:', promptAsync);
                promptAsync();
                console.log('response:', response);
            }
            catch (error) {
                console.error('handleCreateAccount Error:', error);
            }
        } else {
            Alert.alert('Sorry, Google OAuth will be available in the next update.');
        }
    }

    const handleSignInWithGoogle = async () => {
        const user = checkGoogleLocalUser();
        if (!user) {
            console.log(' no hay user y la response es:', response)
            if (response && response.type === 'success') {
                saveGoogleLocalUser(response.authentication.accessToken);
            }
        } else {
            setGoogleUserInfo(user);
        }
    }

    useEffect(() => {
        handleSignInWithGoogle();
    }, [response]);

    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log('User is signed in with GOOGLE:', user.uid);
                setGoogleUserInfo(user);
            } else {
                console.log('User NOT LOGGED WITH GOOGLE');
            }
        });
        return () => subscriber();
    }, []);


    const handleCreateAccount = () => {
        playSound();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User created:', user);
                Alert.alert('User created:', user.email);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('Error creating user:', errorMessage, 'Code:', errorCode);
                Alert.alert('Error creating user:', errorMessage, 'Code:', errorCode);

            });
    }

    const handleSignIn = () => {
        playSound();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // navigation.navigate('Logged');
                // dispatch(setUser(user.email)); // TODO:
                dispatch(setUser(JSON.stringify(user)));
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('Error signing in:', errorMessage, 'Code:', errorCode);
                Alert.alert('Error signing in:', errorMessage);
            });
    }

    const emailInputHandle = (email) => {
        const emailHasSpaces = _.includes(email, ' ');
        if (emailHasSpaces) {
            const emailWithoutSpaces = _.replace(_.trim(email), ' ', '');
            return emailWithoutSpaces;
        } else {
            return email;
        }
    }

    return (
        < View style={styles.background} >
            <StatusBar style='auto' />
            {/* < Image source={require('../assets/logo.png')} style={[styles.image, StyleSheet.absoluteFill]} /> */}
            {/* <View style={styles.backgroundObject}></View> */}
            {/* <ScrollView contentContainerStyle={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
            }}> */}

            <BlurView intensity={90} tint='light' style={styles.BlurView}>
                <View style={styles.loginContainer}>
                    {/* <Pressable onPress={() => { openURL('https://twitter.com/AESMatias') }}>
                <FontAwesome name="twitter-square" size={100} color={'white'} />
            </Pressable> */}
                    <View style={styles.containerImage}>
                        <Image source={require('../assets/logo.png')} style={styles.profileImage} />
                    </View>

                    <View>
                        <Text style={styles.text}>E-mail</Text>
                        <TextInput onChangeText={text => setEmail(emailInputHandle(text))} style={styles.input} placeholder="Your e-mail" />
                    </View>

                    <View>
                        <Text style={styles.text}>Password</Text>
                        <TextInput onChangeText={text => setPassword(text)} style={styles.input} placeholder="Your password" secureTextEntry={true} />
                    </View>

                    <TouchableOpacity onPress={() => handleSignIn()} style={[styles.button, { backgroundColor: '#00CFEB90' }]}>
                        <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleCreateAccount()} style={[styles.button, { backgroundColor: '#ec5578' }]}>
                        <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Create Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleGoogleOAuth()} style={[styles.button, { backgroundColor: 'black' }]}>
                        <View style={{ flex: 1, flexDirection: 'row', padding: 3 }}>
                            <AntDesign name="google" size={15} color="yellow" style={{ margin: 2 }} />
                            <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Google OAuth</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </BlurView>
            {/* </ScrollView> */}
        </View >)
}


export const MyAccount = () => {
    const { currentUser } = useSelector((state) => state.userReducer);
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            {/* {(currentUser) ? ( */}
            {(currentUser && currentUser !== undefined && currentUser !== null) ? (
                <Stack.Screen name="Logged" component={LoggedScreen}
                    options={{
                        headerShown: false, // Hide the header
                    }}
                />
            ) : (<Stack.Screen name="Login" component={LoginScreen}
                options={{
                    headerShown: false, // Hide the header
                }} />)}
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    BlurView: {
        flex: 5 / 8,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',

        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 2,
        minHeight: 300,
    },
    StackNavigator: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        headerStyle: {
            backgroundColor: 'rgba(16,41,78,1)', // Header background color
            borderBottomWidth: 0.5, // Header bottom border width
            borderBottomColor: 'red', // Header bottom border color
            elevation: 0, // Header elevation in Android (to avoid shadow)
            height: 0,
        },


    },
    button: {
        width: 180,
        height: 35,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        borderColor: '#fff',
        borderWidth: 1,
        backgroundColor: 'rgba(100, 100, 100, 0.5)',

    },
    loginContainer: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        width: 300,
        height: 400,
        // borderColor: 'red',
        // borderWidth: 1,
        // borderRadius: 50,
        padding: 10,
        alignItems: 'center',
    },
    backgroundObject: {
        width: 200,
        height: 200,
        backgroundColor: 'red',
        position: 'absolute',
        borderTopWidth: 50,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'white',
        marginVertical: 10,
        padding: 10,
    },
    image: {
        flex: 1,
        justifyContent: "center",
        resizeMode: "cover",
        justifyContent: "center",
        margin: 10,
        padding: 10,
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
        justifyContent: 'space-evenly',
    },
    containerImage: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5%',
        // borderColor: 'red',
        // borderWidth: 4,
        // borderRadius: 2,

    },
    background: {
        flex: 1,
        backgroundColor: '#0a1e3c',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',


    },
    text: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        backgroundColor: 'rgba(100, 100, 100, 0)',
        padding: 2,
        borderRadius: 5,
        textAlign: 'center',
        margin: 5,
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
    },
    textButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    input: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 5,
        padding: 2,
        paddingHorizontal: 15,
        margin: 5,
        color: 'white',
        fontSize: 17,
        textAlign: 'center',
    },

})