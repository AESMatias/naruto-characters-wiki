import { Image, StyleSheet, Text, View } from 'react-native'
import { React, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { playSound } from '../utils/tapSound.jsx'
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/styles.jsx';
import { BlurView } from 'expo-blur';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../store/slices/AccountSlice.jsx';
import { toStoreFavChar, toRemoveFavChar } from '../utils/handleData.jsx';
import { FontAwesome } from '@expo/vector-icons';

export const CharModal = ({ charData, setcharModal, favoritesTemp, setFavorites, isFavorite = false }) => {

    const { navigate } = useNavigation();

    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
        console.log(' Error at loading the image', charData.images[0], imageError);
    }

    handleOnPress = () => {
        charDataView = charData;
        isFavoriteRouter = isFavorite;
        console.log('LA DATRA ES ', charData, { charDataView });
        navigate('CharDetails', { charDataView, isFavoriteRouter });
        playSound();
        setcharModal(false)
    }

    const dispatch = useDispatch();
    const { favorites } = useSelector(state => state.userReducer);
    const { currentUser } = useSelector((state) => state.userReducer);

    const handleAddFav = () => {
        playSound();
        try {
            dispatch(addToFavorites(charData)); //TODO: Fix this
            toStoreFavChar(charData);
            setFavorites(charData);
            // FavoritesLengthUpdater(dispatch);
        } catch (error) {
            console.log('Error adding to favorites in dispatch at charModal.jsx', error);
        }
        // we use removeFromFavorites only if we want to remove the character from the favorites

    }
    const handleRemoveFav = () => {
        playSound();
        try {
            dispatch(removeFromFavorites(charData)); //TODO: Fix this
            toRemoveFavChar(charData);
            // setFavorites(prev => prev.filter(char => char !== charData));
            // FavoritesLengthUpdater(dispatch);
        } catch (error) {
            console.log('Error removing to favorites in dispatch at charModal.jsx', error);
        }
    }

    let returnedValue = charData ? (
        <View style={styles.general_container}>
            <View style={styles.container}>

                {imageError ? (
                    <AntDesign name="questioncircle" size={55} color="white" style={globalStyles.imageNotFound} />
                ) : (
                    <Image
                        style={styles.image}
                        source={{ uri: `${charData.images[0]}` }}
                        onError={handleImageError}
                    />
                )}

                <Text style={styles.text}>
                    {charData.name ?
                        charData.name
                        : 'Unknown Name'}
                </Text>
                <Text style={styles.text}>Sex: {charData.personal.sex ? charData.personal.sex : 'Unknown'}</Text>
                <Text style={styles.text}>Jutsu: {charData.jutsu ? charData.jutsu[0] : 'Unknown'} ...</Text>
                {/* <Text style={styles.text}>Rank: {charData.rank || 'None'}</Text> */}

                <TouchableOpacity onPress={handleOnPress}>
                    <Text style={styles.text_more}>View more info  {
                        <Entypo name="info-with-circle" size={17} color="white" />}</Text>
                </TouchableOpacity>


                {isFavorite ?
                    <TouchableOpacity onPress={handleRemoveFav}>
                        <Text style={[styles.text_favorite, { backgroundColor: 'red', fontSize: 15 }]}>
                            Remove from favorites {
                                <FontAwesome name="trash" size={17} color="white" />}
                        </Text>
                    </TouchableOpacity>
                    : <TouchableOpacity onPress={handleAddFav}>
                        <Text style={styles.text_favorite}>Add to Favorites {
                            <AntDesign name="star" size={16} color="white" />}

                        </Text>
                    </TouchableOpacity>}

            </View>
            <View styles={styles.container_info}>
                {/* <Text style={styles.text_info}>Status: {charData.status}</Text>
            <Text style={styles.text_info}>Species: {charData.species}</Text>
            <Text style={styles.text_info}>Gender: {charData.gender}</Text>
            <Text style={styles.text_info}>Location: {charData.location.name}</Text> */}
            </View>
        </View>) : <Text>Error retriving the Character information</Text>;
    return (
        returnedValue
    )
}

const styles = StyleSheet.create({
    shuriken: {
        flex: 1,
        alignSelf: 'center',
    },
    container_info: {
        flex: 1,
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 5,
    },
    general_container: {
        flex: 1,
        alignItems: 'center',
        padding: 5,
        marginVertical: 0,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(20, 90, 200, 0.25)',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 5,
        width: '90%',
        minHeight: 400,
        alignSelf: 'center',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        borderRadius: 5,
        margin: 5,
        paddingTop: 100,
        minHeight: 500,
        height: 600,

    },
    text: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        borderRadius: 5,
        backgroundColor: 'rgba(0,0,0, 0.15)',
        padding: 5,
        marginTop: 2,
        textShadowColor: 'white',
        textShadowOffset: { width: 0.1, height: 0.1 },
        textShadowRadius: 1,
        textAlign: 'center',
        minWidth: '50%',
    },
    text_more: {
        flex: 1,
        borderWidth: 0.5,
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
        backgroundColor: 'green',
        padding: 4,
        borderRadius: 2,
        textShadowColor: 'black',
        textAlign: 'center',
        marginVertical: 2,
        marginTop: 10,
        maxHeight: 30,

    },
    text_favorite: {
        flex: 1,
        borderWidth: 0.5,
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
        backgroundColor: 'orange',
        padding: 4,
        borderRadius: 2,
        textShadowColor: 'black',
        textAlign: 'center',
        marginVertical: 5,
        maxHeight: 30,

    },
    image: {
        width: 110,
        height: 110,
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 5,
        borderColor: 'black',
        alignSelf: 'center',

    }
})