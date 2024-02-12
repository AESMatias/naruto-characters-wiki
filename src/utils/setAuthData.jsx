import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAuthStorage = async (userData) => {
    try {
        // Delete the previous element, if it exists
        await AsyncStorage.removeItem('auth');
        // Save the new element as a JSON object
        await AsyncStorage.setItem('auth', JSON.stringify(userData));

    } catch (error) {
        console.error('Error at checkAuthStorage', error);
    }
};

export const logOutStorage = async (userData) => {
    try {
        // Delete the previous session, if it exists
        await AsyncStorage.removeItem('auth');
        console.log('auth ' + userData + ' deleted')
    } catch (error) {
        console.error('Error at checkAuthStorage', error);
    }
};