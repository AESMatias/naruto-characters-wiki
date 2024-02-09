import {
    StyleSheet, Text, View, Alert, Image, TextInput, TouchableOpacity
} from 'react-native'
import React from 'react'
import { useState } from 'react'
import { BlurView } from 'expo-blur';
import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut
} from 'firebase/auth';
import { app } from '../../firebaseConfig.js';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import 'firebase/firestore';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, clearUser } from '../store/slices/AccountSlice.jsx';


const auth = getAuth(app);

const LoggedScreen = () => {
    const { currentUser } = useSelector((state) => state.userReducer);
    const navigation = useNavigation();



    return (
        <View style={styles.background}>
            <Text style={styles.text}>MY ACCOUNT: {currentUser ? currentUser : 'Not Logged'}</Text>
            <TouchableOpacity onPress={() => { handleLogOut(navigation, currentUser) }}>
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
            // navigation.navigate('Logged');
            setIsLogged(true);
        } else {
            // navigation.navigate('Login');
            dispatch(clearUser());
            setIsLogged(false);
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
                // navigation.navigate('Logged');
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
                        <TextInput onChangeText={text => setEmail(text)} style={styles.input} placeholder="Your e-mail" />
                    </View>

                    <View>
                        <Text style={styles.text}>Password</Text>
                        <TextInput onChangeText={text => setPassword(text)} style={styles.input} placeholder="Your password" secureTextEntry={true} />
                    </View>

                    <TouchableOpacity onPress={handleSignIn} style={[styles.button, { backgroundColor: '#00CFEB90' }]}>
                        <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleCreateAccount} style={[styles.button, { backgroundColor: '#ec5578' }]}>
                        <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Create Account</Text>
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
            {currentUser ? (
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
        fontSize: 25,
        fontWeight: 'bold',
        backgroundColor: 'rgba(100, 100, 100, 0)',
        padding: 2,
        borderRadius: 5,
        textAlign: 'center',

        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
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
    button: {
        borderRadius: 5,
        padding: 10,
        margin: 5,
        color: 'white',
        fontSize: 20,
    },
})