import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { incrementCounterFavorites } from "../store/slices/CounterSlice";

export const updateFavoritesLength = async (incrementCounterFavorites, dispatch) => {
    try {
        const data = await retrieveData();
        const dataArray = Object.values(data);
        const favoritesLength = dataArray.length;
        dispatch(incrementCounterFavorites(favoritesLength));
        // const memoizedIncrementCounter = useMemo(() => dispatch(incrementCounterFavorites), [dispatch]);
    } catch (error) {
        console.error('FAV Error retrieving favorites length:', error);
    }
};


export const toStoreFavChar = async (value, dispatch) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(`fav_Char_${value.id}`, jsonValue)
    } catch (e) {
        console.error('Error saving the data:', e);
    }
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

export const loadData = async (setdataFetched, setFavoritesTemp) => {
    // This function loads the data rather from the API or from the AsyncStorage
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
    retrieveData().then((data) => {
        // We set the favorites in the useState hook to be used in the modal (drilling?)
        // setFavoritesTemp(data);
        console.log('line beefore deleteeeeed solve this')
    });
}

export const fetchCharsData = async (setdataFetched) => {
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
        if (allKeys !== null && storedData !== null && filteredKeys.length > 1000) {
            console.log(' filteredKeys.length > 1000', filteredKeys.length)
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
            console.log('Favorites found in retrieveData/Handle:', charactersMapped);
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