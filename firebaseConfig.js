// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/app';
import { getAuth, setPersistence } from "firebase/auth";
import { Alert } from "react-native";
import { browserSessionPersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import AsyncStorage from '@react-native-community/async-storage'
import { setUser, clearUser } from './src/store/slices/AccountSlice.jsx';
import Constants from 'expo-constants';
import { getFirestore } from 'firebase/firestore';

//TODO: To create the apk> eas build -p android --profile preview


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyBYy2pt4TZaU5Tu3v36DMqeM6T_nP0uen0",
    authDomain: "naruto-characters-wiki-2.firebaseapp.com",
    projectId: "naruto-characters-wiki-2",
    storageBucket: "naruto-characters-wiki-2.appspot.com",
    messagingSenderId: "328352683861",
    appId: "1:328352683861:web:4e6a3cc7b67a95997901dc",
    measurementId: "G-DGQP7CHG22",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Persistence for the user's session through the app

export const database = getFirestore(app);

export const CheckAuthStorage = async () => {

    // const { currentUser } = useSelector((state) => state.userReducer);

    try {
        const userData = await AsyncStorage.getItem('auth');
        const formattedUser = await JSON.parse(userData);

        if (formattedUser !== null) {
            return formattedUser;
        }
    } catch (error) {
        console.error('Error at checkAuthStorage', error);
        return null;
    }
};

CheckAuthStorage();

export const analytics = getAnalytics(app);

