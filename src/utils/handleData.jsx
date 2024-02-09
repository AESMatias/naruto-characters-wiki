import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const updateFavoritesLength = async (incrementCounterFavorites, setFavCounter) => {
    try {
        const data = await retrieveData();
        console.log('bbbbbbbbbbbBBBBBBBBBBBb', data)
        const dataArray = Object.values(data);
        const favoritesLength = dataArray.length;
        dispatch(incrementCounterFavorites(favoritesLength));

        setFavCounter(favoritesLength);

        console.log('FAV Favorites length updated:', favoritesLength);
    } catch (error) {
        console.error('FAV Error retrieving favorites length:', error);
    }
};


export const toStoreFavChar = async (value) => {
    console.log('The value is:', value)
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(`fav_Char_${value.id}`, jsonValue)
        console.log('The id :', value.id, 'has been stored successfully in AsyncStorage');
    } catch (e) {
        console.error('Error saving the data:', e);
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


export const loadData = async (setdataFetched, setFavoritesTemp) => {
    // This function loads the data rather from the API or from the AsyncStorage
    CheckCharsInAsyncStorage().then((data) => {
        if (data !== null) {
            setdataFetched(data);
            console.log('Data was found in AsyncStorage:', data);
        } else {
            console.log('No data was found in AsyncStorage at loadData/handleData.jsx');
            fetchCharsData(setdataFetched);
        }
    });
    retrieveData().then((data) => {
        // We set the favorites in the useState hook to be used in the modal (drilling?)
        setFavoritesTemp(data);
    });
}

export const fetchCharsData = async (setdataFetched) => {
    const arrayOfCharacters = [];
    try {
        for (let i = 1; i <= 73; i++) { // TO PAGE 72 MAX
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
            console.log('8888 Data stored successfully:', jsonValue);
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
        if (allKeys !== null && storedData !== null && filteredKeys.length > 10) {
            console.log(' filteredKeys.length > 10', filteredKeys.length)
            const charactersData = storedData.map(([key, value]) => JSON.parse(value));
            console.log('Data retrieved:', charactersData);
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

export const retrieveData = async () => {
    let arrayOfFavsChars = [];
    try {
        const allKeys = await AsyncStorage.getAllKeys();
        const storedData = await AsyncStorage.multiGet(allKeys);

        storedData.forEach((item) => {
            // console.log('item', item)
            arrayOfFavsChars.push(item)
        })

        if (allKeys !== null && storedData !== null) {
            let charsFiltered = arrayOfFavsChars.filter((char) => (char[0].startsWith("fav_Char_")
                && char !== null && char !== undefined));
            // console.log('asdsadasd ASDFASDSA:', charactersData);
            // let arrayFiltered = charactersData.filter((char) => (char[0].startsWith("fav_Char_")
            //     && char !== null && char !== undefined));
            let charactersMapped = charsFiltered.map(([key, value]) => JSON.parse(value));
            console.log('Favorites found in retrieveData/Handle:', charsFiltered);
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