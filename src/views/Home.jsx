import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, FlatList, SafeAreaView, Text, Alert } from 'react-native';
import { WriteNameComponent } from '../components/WriteNameComponent.jsx';
import { useEffect, useState } from 'react';
import { Character } from '../components/Character.jsx';
import { loadData } from '../utils/handleData.jsx'
import { CharModal } from '../components/CharModal.jsx'
import { Modal } from '../components/Modal.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites } from '../store/slices/AccountSlice.jsx';
import { CheckAuthStorage } from '../../firebaseConfig.js';
import { setUser } from '../store/slices/AccountSlice.jsx';

export const Home = () => {

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
            dispatch(setUser(data.email));
            console.log('User/Auth Data was found in AsyncStorage:', data);
        } else {
            console.log('No data was found in AsyncStorage at loadData/handleData.jsx');
        }
    });

    useEffect(() => {
        loadData(setdataFetched, setFavoritesTemp);
    }, []); // Started when the component is mounted


    useEffect(() => {
        console.log('FAVORITES AAAAAAAAAAAAAAAAAAAA', favoritesTemp);
        favoritesTemp.forEach((char) => {
            dispatch(addToFavorites(char));
            console.log('AAA Add to favorites:', char);
            console.log('AAA 222222:', favoritesTemp);
        });
    }, []);

    // useEffect(() => {
    //     console.log('STORE FAVORITES 555 aaaaaaaaaaaaaaaaaaa', favorites);
    // }

    //     , [favorites]);

    useEffect(() => {
        console.log('Refreshing the home, but nothing happend...')
        setRefreshing(false);
    }, [refreshing]); // Observe changes in the refresing state


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <Modal id='modal_id' isModalOpen={charModal} favoritesTemp={favoritesTemp}
                setFavoritesTemp={setFavoritesTemp}
                withInput
                FilledModal={[FilledModal]}
                onRequestClose={() => setcharModal(false)}>
                <CharModal charData={FilledModal} setcharModal={setcharModal} />
                {/* <Text>INSIDE MODAL</Text> */}
            </Modal>
            <View style={styles.flat_container}>
                <FlatList
                    data={(dataFetched !== undefined) ?
                        dataFetched.filter((char) => char.name.toLowerCase().includes(text.toLowerCase())) : []
                    }
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <Character
                        charData={item}
                        setcharModal={setcharModal}
                        setFilledModal={setFilledModal}
                    />}
                    style={styles.char_list}
                    refreshing={refreshing}
                    onRefresh={refreshing => setRefreshing(!refreshing)}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <WriteNameComponent setdataFetched={setdataFetched} onChangeText={onChangeText} text={text} />
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    flat_container: {
        flex: 1,
        paddingTop: 10,
        width: '100%',
        marginBottom: 0,
        backgroundColor: '#fff',
        backgroundColor: 'rgba(10,30,70,0.2)',
    },
    container: {

        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.95)',
    },
})