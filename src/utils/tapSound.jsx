import { Audio } from 'expo-av';
import { useSelector } from 'react-redux';



let sound = null;
let muted = false;

// export const playSound = () => {
//     try {
//         if (!sound) {
//             sound = new Audio.Sound();
//             sound.loadAsync(require('../assets/tap_sound.wav'));
//         }
//         sound.replayAsync();
//         console.log('Tapping sound!');
//     } catch (error) {
//         console.log('Error loading the file at src/utils/tapSound.jsx', error);
//     }
// };

export const playSound = async () => {

    if (muted === false) {
        try {
            if (!sound) {
                sound = new Audio.Sound();
                await sound.loadAsync(require('../assets/tap_sound.wav'));
            }
            await sound.replayAsync();
            console.log('Tapping sound!');
        } catch (error) {
            console.log('Error loading the file at src/utils/tapSound.jsx', error);
        }
    }
};