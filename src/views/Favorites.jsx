import {
    StyleSheet, FlatList, View, Alert, Text
} from 'react-native'
import React from 'react'
import { Modal } from '../components/Modal.jsx'
import { useState, useEffect } from 'react'
import { CharModal } from '../components/CharModal.jsx';
import { loadData, retrieveData } from '../utils/handleData.jsx';
import { Character } from '../components/Character.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { setFirebaseFavoritesFetched } from '../store/slices/AccountSlice.jsx';

export const Favorites = () => {

    const [refreshing, setRefreshing] = useState(false); // For the FlatList
    const [dataFetched, setdataFetched] = useState([]);
    const [text, onChangeText] = useState(""); // For the input field for searching by name
    const [charModal, setcharModal] = useState(false) // The modal for every character
    const [FilledModal, setFilledModal] = useState({}) // The modal object of every character
    const [favorites, setFavorites] = useState([])

    const { currentUser } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        // loadData(setdataFetched);
        retrieveData(currentUser, dispatch).then((data) => {
            setFavorites(data);
            if (currentUser !== null) {
                // saveUserPreferences(data);
            }
            else {
                console.log('Error at saving user preferences at Favorites.jsx: currentUser is null');
            }
        });
    }, []); // Started when the component is mounted

    // dispatch = useDispatch();
    // updateFavoritesLength(incrementCounterFavorites, dispatch, currentUser);

    useEffect(() => {
        // onChangeText('');
        if (refreshing) {
            setRefreshing(false);
            // dispatch(setFirebaseFavoritesFetched(false));
            // console.error('cambio a FALSE el SLICE porque useeffect favorites')
            // Alert.alert('Refreshing the favorites');
            retrieveData(currentUser, dispatch).then((data) => {
                setFavorites(data);
                // console.warn('eNEW DATAAAAAAAAAA', data)
                if (currentUser !== null) {
                    // Alert.alert('Favorite characters has been uploaded to the cloud!')
                    // saveUserPreferences(data);
                }
                else {
                    // Alert.alert('You are not logged, your favorites will not be saved on the cloud');
                    console.log('Error at saving user preferences at Favorites.jsx: currentUser is null');
                }
            });
        }
        // updateFavoritesLength(incrementCounterFavorites, dispatch, currentUser);
    }, [refreshing]); // Observe changes in the refresing state

    return (

        <View style={styles.container}>

            {/* {favorites.length > 0 ? <Text>favorites</Text> :
                <Text>There are no favorites yet</Text>} */}

            <Modal id='modal_id' isModalOpen={charModal}
                withInput
                FilledModal={[FilledModal]}
                onRequestClose={() => setcharModal(false)}>
                <CharModal charData={FilledModal}
                    setcharModal={setcharModal}
                    setFavorites={setFavorites}
                    isFavorite={true}
                />
                {/* <Text>INSIDE MODAL</Text> */}
            </Modal>
            <View style={styles.flat_container}>
                {currentUser ? (
                    <FlatList
                        data={(favorites !== undefined) ?
                            favorites : []
                        }
                        //parseamos lo de keystractor ya que es un objeto
                        // keyExtractor={(item) => item.id.toString()}
                        keyExtractor={(item) => (item.id.toString())}
                        renderItem={({ item }) => <Character
                            charData={item}
                            setcharModal={setcharModal}
                            setFilledModal={setFilledModal}
                        />}
                        style={styles.char_list}
                        refreshing={refreshing}
                        onRefresh={refreshing => setRefreshing(!refreshing)} />) :
                    <View style={[styles.flat_containerLogin]}>
                        <Text style={{ fontSize: 22, color: 'white', alignSelf: 'center', }}>Log in to see your favorites</Text>
                    </View>
                }
            </View>
            {/* <WriteNameComponent setdataFetched={setdataFetched} onChangeText={onChangeText} text={text} /> */}
        </View>
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
    flat_containerLogin: {
        position: 'absolute',
        paddingTop: 0,
        top: '45%',
        width: '100%',
        marginBottom: 0,
        // backgroundColor: '#fff',
        // backgroundColor: 'rgba(10,30,70,0.2)',
    },
    container: {

        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.95)',
    },
    containerButtons: {
        flex: 1 / 6,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    container_text: {
        flex: 6 / 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        marginHorizontal: 45,
    },
    background: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: 'rgba(100, 100, 100, 0)',
        padding: 2,
        borderRadius: 5,
        textAlign: 'center',

    },
    button: {
        backgroundColor: 'rgba(20,20,25,1)',
        borderRadius: 5,
        padding: 20, // Ajusta el padding para hacer el botón más grande
        margin: 20,
        color: 'white',
        fontSize: 20, // Ajusta el tamaño de fuente del botón
    },
})
