import { Linking } from "react-native";

export const openURL = async (URL) => {
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