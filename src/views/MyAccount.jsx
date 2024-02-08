import {
    StyleSheet, Text, View, Pressable, Button, Alert, Share, Linking,
    Image,
    ScrollView,
    TextInput, TouchableOpacity
} from 'react-native'
import React from 'react'
import { Modal } from '../components/Modal.jsx'
import { useState, useEffect } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
    onAuthStateChanged, signOut
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebaseConfig.js';
import { app } from '../../firebaseConfig.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { initializeAuth, setPersistence, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage correctamente
import { browserSessionPersistence } from "firebase/auth";
import { isEmpty, size } from 'lodash';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, clearUser } from '../store/slices/AccountSlice.jsx';


const auth = getAuth(app);

const LoggedScreen = () => {
    const { currentUser } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const navigation = useNavigation();



    return (
        <View style={styles.background}>
            <Text style={styles.text}>MY ACCOUNT: {currentUser ? currentUser : 'Not Logged'}</Text>
            <TouchableOpacity onPress={() => { handleLogOut(navigation, currentUser, dispatch) }}>
                <Text style={styles.text}>Sign out</Text>
            </TouchableOpacity>
        </View>
    )

}

const handleLogOut = (navigation, currentUser) => {
    signOut(auth);
    clearUser();
    console.log(currentUser, 'User signed out');
    // navigation.navigate('Login');
}

const LoginScreen = () => {

    const [email, setEmail] = useState(``)
    const [password, setPassword] = useState(``)
    const [isLogged, setIsLogged] = useState(false);

    //Redux Store
    const { currentUser } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();


    const navigation = useNavigation();

    auth.onAuthStateChanged((user) => {
        if (user) {
            navigation.navigate('Logged');
            setIsLogged(true);
        } else {
            dispatch(clearUser());
            setIsLogged(false);
            navigation.navigate('Login');
        }
    });

    const handleCreateAccount = () => {
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
                Alert.alert('Error creating user:', errorMessage);
            });
    }

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigation.navigate('Logged');
                dispatch(setUser(user.email)); // TODO:
                console.log(currentUser + 'UserReducer')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('Error signing in:', errorMessage, 'Code:', errorCode);
                Alert.alert('Error signing in:', errorMessage);
            });
    }

    return (
        < View style={styles.background} >
            < Image source={require('../assets/logo.png')} style={[styles.image, StyleSheet.absoluteFill]} />
            <View style={styles.backgroundObject}></View>
            <ScrollView contentContainerStyle={{
                flex: 1,
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            }}>

                <BlurView intensity={90} tint='light'>
                    <View style={styles.loginContainer}>
                        {/* <Pressable onPress={() => { openURL('https://twitter.com/AESMatias') }}>
                <FontAwesome name="twitter-square" size={100} color={'white'} />
            </Pressable> */}
                        <View style={styles.container_text}>
                            <Image source={require('../assets/logo.png')} style={styles.profileImage} />
                        </View>

                        <View>
                            <Text style={styles.text}>E-mail</Text>
                            <TextInput onChangeText={text => setEmail(text)} style={styles.text} placeholder="Your e-mail" />
                        </View>

                        <View>
                            <Text style={styles.text}>Password</Text>
                            <TextInput onChangeText={text => setPassword(text)} style={styles.text} placeholder="Your password" secureTextEntry={true} />
                        </View>

                        <TouchableOpacity onPress={handleSignIn} style={[styles.button, { backgroundColor: '#00CFEB90' }]}>
                            <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleCreateAccount} style={[styles.button, { backgroundColor: '#6792F090' }]}>
                            <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Create Account</Text>
                        </TouchableOpacity>
                    </View>
                </BlurView>
            </ScrollView>
        </View >)
}


export const MyAccount = () => {
    const { currentUser } = useSelector((state) => state.userReducer);

    const handleSignIn = () => {
        console.log('Sign in');
    };

    const handleCreateAccount = () => {
        console.log('Create account');
    };

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            {currentUser ? (
                <Stack.Screen name="Logged" component={LoggedScreen} />
            ) : (
                <Stack.Screen name="Login" component={LoginScreen} />
            )}
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 250,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderColor: '#fff',
        borderWidth: 1,
    },
    loginContainer: {
        width: 300,
        height: 400,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
    },
    backgroundObject: {
        width: 100,
        height: 100,
        backgroundColor: 'red',
        position: 'absolute',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 50,
        borderColor: 'white',
        marginVertical: 20,
    },
    image: {
        flex: 1,
        justifyContent: "center",
        resizeMode: "cover",
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
        padding: 20,
        margin: 20,
        color: 'white',
        fontSize: 20,
    },
})