import { Audio } from 'expo-av';

let sound = null;

export const playSound = () => {
    try {
        if (!sound) {
            sound = new Audio.Sound();
            sound.loadAsync(require('../../assets/tap_sound.wav'));
        }
        sound.replayAsync();
        console.log('Tapping sound!');
    } catch (error) {
        console.log('Error loading the file at src/utils/tapSound.jsx', error);
    }
};