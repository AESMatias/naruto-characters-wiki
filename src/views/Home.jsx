import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, FlatList, SafeAreaView, ActivityIndicator, useColorScheme } from 'react-native';
import { WriteNameComponent } from '../components/WriteNameComponent.jsx';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Character } from '../components/Character.jsx';
import { loadData } from '../utils/handleData.jsx'
import { CharModal } from '../components/CharModal.jsx'
import { Modal } from '../components/Modal.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, setUser } from '../store/slices/AccountSlice.jsx';
import { CheckAuthStorage } from '../../firebaseConfig.js';
import { saveUserPreferences } from '../utils/handleData.jsx';
import { checkFirebaseFavs } from '../utils/handleData.jsx';
import { phrasesToSayLoading } from '../utils/phrasesWhenLoading.js'
import { playSound } from '../utils/tapSound.jsx';
// import Constants from 'expo-constants';

// const versionCode = JSON.stringify(Constants.expoConfig.android);
// Alert.alert('Version Code', String(versionCode));


export const Home = () => {


    const theme = useColorScheme();
    console.log('The color theme is', theme)

    const [refreshing, setRefreshing] = useState(false); // For the FlatList
    const [dataFetched, setdataFetched] = useState([]);
    const [text, onChangeText] = useState(""); // For the input field for searching by name
    const [charModal, setcharModal] = useState(false) // The modal for every character
    const [FilledModal, setFilledModal] = useState({}) // The modal object of every character
    const [favoritesTemp, setFavoritesTemp] = useState([])

    useEffect(() => {

        // console.log('OBJECT CHANGED ', FilledModal)

        return () => {
            // console.log('OBJECT HAS BEEN CHANGED RETURNNNNNNNNNNN ', FilledModal)
        }
    }, [FilledModal]) // When some character is clicked, the object of the character is passed to the modal

    useEffect(() => {
        // console.log('text  ', text)

        return () => {
            // console.log('text changed return DESFASADO ANTERIOR ', text)
        }
    }, [text])

    const dispatch = useDispatch();
    const { favorites } = useSelector(state => state.userReducer);
    const { currentUser } = useSelector((state) => state.userReducer);
    const { firebaseFavoritesFetched } = useSelector((state) => state.userReducer);


    // const handleAddFav = () => {
    //     playSound();
    //     try {
    //         dispatch(addToFavorites(charData));
    //         toStoreFavChar(charData);
    //         console.log('Add to favorites:', charData);
    //         console.log('Favorites:', favorites[0]);
    //         // FavoritesLengthUpdater(dispatch);

    //     } catch (error) {
    //         console.log('Error adding to favorites in dispatch at charModal.jsx', error);
    //     }

    // }
    CheckAuthStorage().then((data) => {
        if (data !== null) {
            dispatch(setUser(JSON.stringify(data)));
            console.log('User/Auth Data was found in AsyncStorage:');
        } else {
            console.log('No data was found in AsyncStorage at loadData/handleData.jsx');
        }
    });

    useEffect(() => {
        // loadData(setdataFetched, dispatch, currentUser);

        // favoritesTemp.forEach((char) => {
        //     dispatch(addToFavorites(char, favorites));
        //     console.error('AAA Add to favorites TEMP:', char);
        // console.log('AAA 222222:', favoritesTemp);
    });
    // }, []); // Started when the component is mounted


    // useEffect(() => {
    //     favoritesTemp.forEach((char) => {
    //         dispatch(addToFavorites(char));
    //         console.warn('AAA Add to favorites:', char);
    //         // console.log('AAA 222222:', favoritesTemp);
    //     });
    // }, []);


    useLayoutEffect(() => {
        loadData(setdataFetched, dispatch, currentUser);

        favoritesTemp.forEach((char) => {
            dispatch(addToFavorites(char, favorites));
        });

        // console.log('Refreshing the home...')
        // setFavoritesTemp([]);
        setRefreshing(false);
        onChangeText('');
    }, [refreshing]); // Observe changes in the refresing state



    useEffect(() => {
        // console.error('FIREBASEEEEEEEEEEEEEE', firebaseFavoritesFetched)
        if (firebaseFavoritesFetched == true && currentUser !== null) {
            // console.error('11111111CAMBIOOO IO O O OFAVORITES', favorites)
            // // console.error('1111111', favoritesTemp)
            // // console.error('3333333333', [...favoritesTemp, charData])


            // saveUserPreferences(favorites);
            handleAddFav()

        } else {
            console.error('EFFECT FAIL', firebaseFavoritesFetched, currentUser)
        }

    }, [favorites]);



    const handleAddFav = async () => {

        // playSound();
        try {
            // firebaseData = [];
            firebaseData = await checkFirebaseFavs(currentUser);
            console.error('FAVORITES IN FIREBASEDATA AGREGANDOOO', firebaseData.favorites)

            setFavoritesTemp([...firebaseData.favorites, favorites])
            // console.error('FAVORITES aaaaaaaa111', favorites)
            dispatch(addToFavorites(charData)); //TODO: Fix this // Redux
            // toStoreFavChar(charData); // Local storage
            // setFavorites(charData); // Local state TODO:" This need the previus state first

            // FavoritesLengthUpdater(dispatch);
            // console.error('CHARDATA ADDED TO FAVS:', charData.name);

            // console.error('favorites changed', favorites)
            // saveUserPreferences(favorites);

            // console.error('favorites afterRRRRRRRRRRRRRRRRRRRR', favorites)
        } catch (error) {
            console.log('Error adding to favorites in dispatch at CharModal.jsx', error);
        }
    }

    const settedPhrase = phrasesToSayLoading[Math.floor(Math.random() * phrasesToSayLoading.length)];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='white' />
            <Modal id='modal_id' isModalOpen={charModal}
                favoritesTemp={favoritesTemp}
                setFavoritesTemp={setFavoritesTemp}
                withInput
                FilledModal={[FilledModal]}
                onRequestClose={() => setcharModal(false)}>
                <CharModal charData={FilledModal}
                    cameFromHome={true}
                    // favorites={favorites}
                    setcharModal={setcharModal}
                    setFavoritesTemp={setFavoritesTemp}
                    favoritesTemp={favoritesTemp}
                />
                {/* <Text>INSIDE MODAL</Text> */}
            </Modal>
            <View style={styles.flat_container}>
                {dataFetched && dataFetched.length === 0 ?
                    <View style={styles.flat_container}>
                        <ActivityIndicator size={100} color="#ffffff" />
                        <Text style={{
                            fontWeight: 'bold', color: 'rgba(240,240,240,0.5)',
                            fontSize: 18, color: 'rgba(240,240,240,0.8)',
                            paddingHorizontal: 30,
                            marginTop: 30,
                            alignSelf: 'center'
                        }}>
                            {settedPhrase}
                        </Text>

                    </View>
                    : <FlatList
                        data={(dataFetched !== undefined) ?
                            dataFetched.filter((char) => char.name.toLowerCase().includes(text.toLowerCase())) : []
                        }
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <Character
                            onPress={() => handlePress()}
                            charData={item}
                            setcharModal={setcharModal}
                            setFilledModal={setFilledModal}
                        />}
                        style={styles.char_list}
                        refreshing={refreshing}
                        onRefresh={refreshing => setRefreshing(!refreshing)}
                        showsVerticalScrollIndicator={true}
                        maxToRenderPerBatch={20} // Render 50 elements per batch
                        initialNumToRender={20} // Render 100 elements when the component is mounted
                        windowSize={20} // Hold 20 elements in memory
                        removeClippedSubviews={true} // Not render elements that are not in the screen
                    />}
            </View>
            <WriteNameComponent setdataFetched={setdataFetched} onChangeText={onChangeText} text={text} />
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    flat_container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 10,
        width: '100%',
        marginBottom: 0,
        backgroundColor: '#fff',
        backgroundColor: 'rgba(10,30,70,0.2)',
    },
    flat_containerLogin: {
        position: 'absolute',
        padding: 10,
        top: '45%',
        width: '100%',
        marginBottom: 0,
        padding: 10,
    },
    container: {

        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.95)',
    },
})