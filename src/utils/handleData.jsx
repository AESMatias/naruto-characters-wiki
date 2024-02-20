import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import AsyncStorage from '@react-native-community/async-storage'
import { database } from "../../firebaseConfig.js";
import { doc, getDoc, setDoc, updateDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Alert } from "react-native";
import { setFirebaseFavoritesFetched } from "../store/slices/AccountSlice.jsx";
import { useDispatch } from "react-redux";

export const saveUserPreferences = async (newFavoritesList) => {

    try {
        // Get the user auth data from the AsyncStorage
        const storedData = await AsyncStorage.getItem('auth');
        const authData = await JSON.parse(storedData);
        // Object to save in the database
        const itemToSave = { auth: authData, favorites: newFavoritesList };
        // Reference to the document with the user's email
        const userDocRef = doc(database, "users", authData.uid);
        // console.log('With user data', newFavoritesList)
        // Save the data in the database
        await setDoc(userDocRef, itemToSave);
        // Alert.alert('Your favorites have been saved in the cloud!')
        console.log('SaveUserPreferences - data saved successfully for UID:', authData.uid);
    } catch (error) {
        Alert.alert('Error saving the user favorites in the cloud, please try again later!')
        console.error('Error saving the user favorites at saveUserPreferences:', error);
    }
}


export const updateFavoritesLength = async (incrementCounterFavorites, dispatch, currentUser) => {
    try {
        const data = await retrieveData(currentUser, dispatch);
        const dataArray = Object.values(data);
        const favoritesLength = dataArray.length;
        // dispatch(incrementCounterFavorites(favoritesLength)); //TODO: This refresh the entire view and goes back to Home
        // const memoizedIncrementCounter = useMemo(() => dispatch(incrementCounterFavorites), [dispatch]);
        // console.warn('FAV Length:', favoritesLength);
        return favoritesLength;
    } catch (error) {
        console.error('FAV Error retrieving favorites length:', error);
        return 0;
    }
};

export const toStoreFavChar = async (value, dispatch) => {
    //TODO:
    // try {
    //     const jsonValue = JSON.stringify(value)
    //     await AsyncStorage.setItem(`fav_Char_${value.id}`, jsonValue)
    // } catch (e) {
    //     console.error('Error saving the data:', e);
    // }
}
export const toRemoveFavChar = async (value, dispatch) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.removeItem(`fav_Char_${value.id}`)
    } catch (e) {
        console.error('Error removing the data:', e);
    }
}

export const storeData = async (id, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(`fav_Char_${id}`, jsonValue);
        console.log('Data stored successfully:', value);
    } catch (error) {
        console.error('Error storing the data at storeData/handleData.jsx:', error);
    }
}

export const setNoFavChars = async (setdataFetched, data) => {
    // setdataFetched(data);

    const allKeys = await AsyncStorage.getAllKeys();
    const filteredKeys = allKeys.filter(key => key.startsWith("cachedCharacter"));
    const storedData = await AsyncStorage.multiGet(filteredKeys);
    const storedDataMapped = storedData.map(([key, value]) => JSON.parse(value));

    setdataFetched(storedDataMapped);
}

export const checkFirebaseFavs = async (currentUser) => {
    // console.warn('checking firestone with', currentUser)
    if (currentUser === null) {
        return null;
    }
    try {
        // Reference to the document in Firebase
        const docRef = doc(database, "users", JSON.parse(currentUser).uid);

        // Get the document snapshot
        const docSnap = await getDoc(docRef);

        // Check if the document exists
        if (docSnap.exists()) {
            // Extract data from the document snapshot
            const data = docSnap.data();
            return data;
        } else {
            console.log("No such document!");
            // Create the document if it does not exist
            await setDoc(docRef, { favorites: [] });


            return null;
        }
    } catch (error) {
        // Is normal to get an error if the document does not exist
        // console.error('Error checking the firebase database at checkFirebaseFavs/handleData.jsx:')
        return null;
    }
}

export const loadData = async (setdataFetched, dispatch, currentUser) => {
    // This function loads the data rather from the API or from the AsyncStorage
    // But firrst, we check the firebase database

    CheckCharsInAsyncStorage().then((data) => {
        if (data !== null) {
            // setdataFetched(data);
            setNoFavChars(setdataFetched, data);
            // console.log('Data was found in AsyncStorage:', data);
        } else {
            console.log('No data was found in AsyncStorage at loadData/handleData.jsx');
            fetchCharsData(setdataFetched, data);
        }
    });

    // retrieveData(currentUser, dispatch).then((data) => {
    //     // console.error('AGREGANDOOOOOOOOOO', data)
    //     // We set the favorites in the useState hook to be used in the modal (drilling?)
    //     // setFavoritesTemp((prev) => { prev.push(data); return prev; }); TODO:BORRARRRRRR
    // });
}

export const fetchCharsData = async (setdataFetched, data) => {
    const arrayOfCharacters = [];
    try {
        for (let i = 1; i <= 73; i++) { // TO PAGE 73 MAX
            const response = await axios.get(`https://narutodb.xyz/api/character?page=${i}`);
            const data = await response.data.characters;
            arrayOfCharacters.push(data);
        }
        // Flatten the array of arrays
        const arrayOfCharactersFlattened = arrayOfCharacters.flat();
        try {
            arrayOfCharactersFlattened.forEach(async (char, i) => {
                const jsonValue = JSON.stringify(char);
                await AsyncStorage.setItem(`cachedCharacter_${i}`, jsonValue);
            });
            const jsonValue = JSON.stringify(arrayOfCharactersFlattened);
        } catch (error) {
            console.error('Error storing the data at storeData/handleData.jsx:', error);
        }
        // Stablish the data in the useState hook
        setdataFetched(arrayOfCharactersFlattened);
    } catch (error) {
        console.error('Error loading and storing the data at loadData/handleData.jsx:', error);
    }
}

export const CheckCharsInAsyncStorage = async () => {
    try {
        const allKeys = await AsyncStorage.getAllKeys();
        const filteredKeys = allKeys.filter(key => key.startsWith("cachedCharacter"));
        const storedData = await AsyncStorage.multiGet(allKeys);
        if (allKeys !== null && storedData !== null && filteredKeys.length > 500) {
            console.log(' filteredKeys.length > 500', filteredKeys.length)
            const charactersData = storedData.map(([key, value]) => JSON.parse(value));
            return charactersData;
        } else {
            // No data was found in AsyncStorage
            console.log('No data was found in AsyncStorage at CheckCharsInAsyncStorage/handleData.jsx')
            return null;
        }
    } catch (error) {
        console.error('Error retrieving in retrieveData - fetCharsData.jsx :', error);
        return null;
    }
}

export const retrieveData = async (currentUser, dispatch) => {

    //If the data is not found in firestone database, we retrieve it from the AsyncStorage

    firebaseData = await checkFirebaseFavs(currentUser);
    // console.error('FAVORITES IN FIREBASEDATA', firebaseData.favorites)

    let arrayOfFavsChars = [];
    if (firebaseData !== null) {
        dispatch(setFirebaseFavoritesFetched(true));

        // Alert.alert('The data was found in the cloud!')
        // console.warn("Document data:", firebaseData.favorites);
        return firebaseData.favorites;
    } else {
        console.error('RETRIEVE INFO NULL AT RETRIEVEDATA')
        return null;
        try {
            Alert.alert('The data was NOT FOUND!')
            const allKeys = await AsyncStorage.getAllKeys();
            const storedData = await AsyncStorage.multiGet(allKeys);

            storedData.forEach((item) => {
                arrayOfFavsChars.push(item)
            })

            if (allKeys !== null && storedData !== null && arrayOfFavsChars.length > 0) {
                let charsFiltered = arrayOfFavsChars.filter((char) => (char[0].startsWith("fav_Char_")
                    && char !== null && char !== undefined));
                // console.log('asdsadasd ASDFASDSA:', charactersData);
                // let arrayFiltered = charactersData.filter((char) => (char[0].startsWith("fav_Char_")
                //     && char !== null && char !== undefined));
                let charactersMapped = charsFiltered.map(([key, value]) => JSON.parse(value));
                console.log('Favorites found in retrieveData/Handle:');
                return charactersMapped;
            } else {
                // No data was found in AsyncStorage
                console.log('No Fav data was found in AsyncStorage')
                return null;
            }
        } catch (error) {
            console.error('Error retrieving in Fav retrieveData - fetCharsData.jsx :', error);
            return null;
        }
    }
}