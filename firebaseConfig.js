// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/app';
import { getAuth, setPersistence } from "firebase/auth";
import { Alert } from "react-native";
import { browserSessionPersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser, clearUser } from './src/store/slices/AccountSlice.jsx';
import Constants from 'expo-constants';
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: Constants.expoConfig.environmentVars.apiKey,
    authDomain: Constants.expoConfig.environmentVars.authDomain,
    projectId: Constants.expoConfig.environmentVars.projectId,
    storageBucket: Constants.expoConfig.environmentVars.storageBucket,
    messagingSenderId: Constants.expoConfig.environmentVars.messagingSenderId,
    appId: Constants.expoConfig.environmentVars.appId,
    measurementId: Constants.expoConfig.environmentVars.measurementId
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Persistence for the user's session through the app
// const auth = getAuth(app);

// export const auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(AsyncStorage)
// });

// setPersistence(auth, AsyncStorage);
// Alert.alert('Firebase initialized', auth.currentUser)
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

