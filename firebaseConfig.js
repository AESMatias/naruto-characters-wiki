// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyCq1BoUcJirikBey9fvZdZaoUqqJOxdYho",
    authDomain: "naruto-characters-wiki.firebaseapp.com",
    projectId: "naruto-characters-wiki",
    storageBucket: "naruto-characters-wiki.appspot.com",
    messagingSenderId: "314479945540",
    appId: "1:314479945540:web:915704d3d097e5d341d911",
    measurementId: "G-2LSDEF3QRG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
