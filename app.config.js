import 'dotenv/config';

export default {
  "expo": {
    "name": "Naruto Characters Wiki",
    "slug": "naruto-characters-wiki",
    "version": "1.1.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#102339"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "versionCode": 2,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#102339"
      },
      "package": "com.aesmatias.narutocharacterswiki"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-router"
    ],
    "environmentVars": {
      // "apiKey": process.env.API_KEY,
      // "authDomain": process.env.AUTH_DOMAIN,
      // "projectId": process.env.PROJECT_ID,
      // "storageBucket": process.env.STORAGE_BUCKET,
      // "messagingSenderId": process.env.MESSAGING_SENDER_ID,
      // "appId": process.env.APP_ID,
      // "measurementId": process.env.MEASUREMENT_ID
      apiKey: "AIzaSyBYy2pt4TZaU5Tu3v36DMqeM6T_nP0uen0",
      authDomain: "naruto-characters-wiki-2.firebaseapp.com",
      projectId: "naruto-characters-wiki-2",
      storageBucket: "naruto-characters-wiki-2.appspot.com",
      messagingSenderId: "328352683861",
      appId: "1:328352683861:web:4e6a3cc7b67a95997901dc",
      measurementId: "G-DGQP7CHG22"
    },
    "owner": "plutarco1677",
    "extra": {
      "eas": {
        "projectId": "e91bdd87-cec4-4d02-8ad6-6186ab118986"
      }
    },
    "eas": {
      "projectId": process.env.PROJECT_ID
    },
    "projectId": process.env.PROJECT_ID
  }
}
