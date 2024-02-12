import { Linking } from "react-native";
import { playSound } from '../utils/tapSound.jsx';

export const openURL = async (URL) => {
    playSound();
    if (!URL) {
        console.error('URL is not defined at /src/utils/openURL.jsx');
        return;
    }
    try {
        await Linking.openURL(URL);
    } catch (error) {
        console.error(`Error at opening the URL ${URL} at /src/utils/openURL.jsx`, error);
    }
};