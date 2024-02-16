import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { TouchableOpacity, FlatList } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { playSound } from '../utils/tapSound.jsx'
import { useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { globalStyles } from '../styles/styles.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../store/slices/AccountSlice.jsx';
import { toStoreFavChar } from '../utils/handleData.jsx';
import { Share, Alert } from 'react-native';
import { toRemoveFavChar } from '../utils/handleData.jsx'
import { useFonts } from 'expo-font';
import { Roboto } from '@expo-google-fonts/inter'
import { checkFirebaseFavs } from '../utils/handleData.jsx';
import { saveUserPreferences } from '../utils/handleData.jsx';
import { incrementCounterFavorites } from '../store/slices/AccountSlice.jsx';
import { updateFavoritesLength } from '../utils/handleData.jsx';





export const CharDetails = ({ charData, isFavorite, ...props }) => {

    const { currentUser } = useSelector((state) => state.userReducer);
    const [imageError, setImageError] = useState(false);
    const [fontsLoaded] = useFonts({
        Roboto,
    });

    useLayoutEffect(() => {
        console.log('UseLayoutEffect at CharDetails.sx for the data character object: ', charDataView)
    }, [props.navigation]);

    const handleImageError = () => {
        setImageError(true);
        console.log(' Error at loading the image', charDataView.images[0], imageError);
    }

    const { params: { charDataView, isFavoriteRouter } } = useRoute();


    const dispatch = useDispatch();

    const URL = 'https://play.google.com/store/apps/details?id=com.aesmatias.narutocharacterswiki'

    const handleShare = async () => {
        playSound();
        try {
            const result = await Share.share({
                message:
                    `${URL}\n\nThe Character data of ${charDataView.name} is:\n\n ${JSON.stringify(charDataView)}`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            console.log('Error at sharing the character', error.message);
        }
    };


    const handleAddFav = async () => {
        playSound();
        if (currentUser === null || currentUser === undefined) {
            Alert.alert('Sorry, to add a character to your favorites you need to be logged in first.')
            return;
        }
        try {
            // firebaseData = [];
            firebaseData = await checkFirebaseFavs(currentUser);
            // toStoreFavChar(charData); // Local storage
            // console.error('FAVORITES IN FIREBASEDATA AGREGANDOOO', firebaseData.favorites)

            // setFavoritesTemp([...firebaseData.favorites, charData])
            // console.error('FAVORITES aaaaaaaa111', favorites)
            // dispatch(addToFavorites(charData)); //TODO: Fix this // Redux

            // FavoritesLengthUpdater(dispatch); // This generates an error and do not allow to upload
            // console.error('CHARDATA ADDED TO FAVS:', charData.name);

            // console.error('favorites changed', favorites)

            // setFavorites([...firebaseData.favorites, charData]); // Local state TODO:" This need the previus state first
            if (firebaseData !== null && firebaseData.favorites !== null && firebaseData.favorites !== undefined) {
                console.error('AGREGADNOOO', firebaseData.favorites, 'YYYYYY', charDataView)

                if (firebaseData.favorites.some(item => item.id === charDataView.id)) {
                    console.error("This character is already in your favorites");
                    Alert.alert("This character is already in your favorites");

                    lenght = updateFavoritesLength(incrementCounterFavorites, dispatch, currentUser)
                    console.error('lenght', lenght)

                }

                else {
                    // console.warn('adding anyways', firebaseData.favorites, charData)

                    saveUserPreferences([...firebaseData.favorites, charDataView]);
                }
                // console.error('favorites afterRRRRRRRRRRRRRRRRRRRR', favorites)
            }

        } catch (error) {
            console.log('Error adding to favorites in dispatch at CharModal.jsx', error);
        }
    }

    const handleRemoveFav = async () => {
        playSound();
        // dispatch(removeFromFavorites(charDataView)); //TODO: Fix this
        // toRemoveFavChar(charDataView);
        if (currentUser === null || currentUser === undefined) {
            console.error('Error removing the character from your favorites at CharDetails.jsx:')
            Alert.alert('Sorry, to remove a character to your favorites you need to be logged in first.')
            return;
        }
        try {

            firebaseData = await checkFirebaseFavs(currentUser);

            if (firebaseData !== null && firebaseData.favorites !== null && firebaseData.favorites !== undefined) {
                console.error('ELIMINANDO DE ', firebaseData.favorites, 'EL DATA', charDataView)

                const filteredFavorites = firebaseData.favorites.filter(item => item.id !== charDataView.id);
                if (filteredFavorites) {
                    console.error('SALVATPORE', filteredFavorites)
                    saveUserPreferences(filteredFavorites);
                    isFavorite = false;
                    // Alert.alert("Character removed from your favorites");
                    props.navigation.goBack();
                }

            }
        } catch (error) {
            console.error('Error removing the character from your favorites at CharDetails.jsx:', error);
            Alert.alert("Error removing the character from your favorites, please try again later!");
        }
    }


    const CharPrintInfo = () => {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.container}>
                <View style={styles.container_inside}>
                    <View style={styles.containerImages}>

                        {imageError ? (
                            <AntDesign name="questioncircle" size={55}
                                color="white" style={globalStyles.imageNotFound} />
                        ) : (
                            <Image
                                style={styles.image}
                                source={{ uri: `${charDataView.images[0]}` }}
                                onError={handleImageError}
                            />
                        )}


                        {(charDataView.images[1]) ?
                            <Image
                                style={styles.image}
                                source={{ uri: `${charDataView.images[1]}` }} /> : <></>}
                    </View>
                    {/* <View style={styles.containerButtons}>

                        <TouchableOpacity onPress={playSound}>
                            <Text style={styles.text_favorite}>Add to favorites  {
                                <AntDesign name="star" size={16} color="white" />}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={playSound}>
                            <Text style={styles.text_share}>Share {
                                <Feather name="share" size={16} color="white" />}</Text>
                        </TouchableOpacity>
                    </View> */}

                    <Text style={[styles.text, { fontSize: 20 }]}>
                        {charDataView.name ?
                            charDataView.name
                            : 'Unknown Name'}
                    </Text>
                    <Text style={styles.text}>Jutsus: {charDataView.jutsu ? charDataView.jutsu : 'Unknown'}</Text>

                    <Text style={styles.text}>Rank Part I: {
                        (charDataView.personal && charDataView.rank
                            && charDataView.rank['ninjaRank']
                            && charDataView.rank['ninjaRank']['Part I']) ?
                            charDataView.rank['ninjaRank']['Part I'] : 'Unknown'}</Text>
                    <Text style={styles.text}>Rank Part II: {
                        (charDataView.personal && charDataView.rank
                            && charDataView.rank['ninjaRank']
                            && charDataView.rank['ninjaRank']['Part II']) ?
                            charDataView.rank['ninjaRank']['Part II'] : 'Unknown'}</Text>

                    <Text style={styles.text}>Clan: {
                        (charDataView.personal && charDataView.personal.clan) ?
                            charDataView.personal.clan : 'Unknown'}</Text>

                    <Text style={styles.text}>Academy Graduate: {
                        (charDataView.personal && charDataView.personal.age && charDataView.personal.age['Academy Graduate']) ?
                            charDataView.personal.age['Academy Graduate'] : 'Unknown'}</Text>
                    <Text style={styles.text}>Chunin Promotion: {
                        (charDataView.personal && charDataView.personal.age && charDataView.personal.age['Chunin Promotion']) ?
                            charDataView.personal.age['Chunin Promotion'] : 'Unknown'}</Text>

                    <Text style={styles.text}>Age Part I: {
                        (charDataView.personal && charDataView.personal.age && charDataView.personal.age['Part I']) ?
                            charDataView.personal.age['Part I'] : 'Unknown'}</Text>
                    <Text style={styles.text}>Age Part II: {
                        (charDataView.personal && charDataView.personal.age && charDataView.personal.age['Part II']) ?
                            charDataView.personal.age['Part II'] : 'Unknown'}</Text>

                    <Text style={styles.text}>Sex: {
                        (charDataView.personal && charDataView.personal.sex) ?
                            charDataView.personal.sex : 'Unknown'}</Text>

                    <Text style={styles.text}>Tools: {
                        (charDataView.tools) ? charDataView.tools : 'Unknown'}</Text>

                    <Text style={styles.text}>Height Blank Period: {
                        (charDataView.personal && charDataView.personal.height && charDataView.personal.height['Blank Period']) ?
                            charDataView.personal.height['Blank Period'] : 'Unknown'}</Text>
                    <Text style={styles.text}>Height Gaiden: {
                        (charDataView.personal && charDataView.personal.height && charDataView.personal.height['Gaiden']) ?
                            charDataView.personal.height['Gaiden'] : 'Unknown'}</Text>
                    <Text style={styles.text}>Height Part I: {
                        (charDataView.personal && charDataView.personal.height && charDataView.personal.height['Part I']) ?
                            charDataView.personal.height['Part I'] : 'Unknown'}</Text>
                    <Text style={styles.text}>Height Part II: {
                        (charDataView.personal && charDataView.personal.height && charDataView.personal.height['Part II']) ?
                            charDataView.personal.height['Part II'] : 'Unknown'}</Text>

                    <Text style={styles.text}>Weight Part I: {
                        (charDataView.personal && charDataView.personal.weight && charDataView.personal.weight['Part I']) ?
                            charDataView.personal.weight['Part I'] : 'Unknown'}</Text>
                    <Text style={styles.text}>Weight Part II: {
                        (charDataView.personal && charDataView.personal.weight && charDataView.personal.weight['Part II']) ?
                            charDataView.personal.weight['Part II'] : 'Unknown'}</Text>



                    <Text style={styles.text}>Birthdate: {
                        (charDataView.personal && charDataView.personal.birthdate) ?
                            charDataView.personal.birthdate : 'Unknown'}</Text>

                    <Text style={styles.text}>BloodType: {
                        (charDataView.personal && charDataView.personal.bloodType) ?
                            charDataView.personal.bloodType : 'Unknown'}</Text>

                    <Text style={styles.text}>Occupations: {
                        (charDataView.personal && charDataView.personal.occupation) ?
                            charDataView.personal.occupation : 'Unknown'}</Text>

                    <Text style={styles.text}>Affiliations: {
                        (charDataView.personal && charDataView.personal.affiliation) ?
                            charDataView.personal.affiliation : 'Unknown'}</Text>

                    <Text style={styles.text}>Teams: {
                        (charDataView.personal && charDataView.personal.team) ?
                            charDataView.personal.team : 'Unknown'}</Text>

                    <Text style={styles.text}>Debut Anime: {(charDataView.debut && charDataView.debut['anime'])
                        ? charDataView.debut['anime'] : 'None'}</Text>

                    <Text style={styles.text}>Debut Manga: {(charDataView.debut && charDataView.debut['manga'])
                        ? charDataView.debut['manga'] : 'None'}</Text>

                    <Text style={styles.text}>Ninja Registration ID: {
                        (charDataView.personal && charDataView.rank
                            && charDataView.rank['ninjaRegistration']) ?
                            charDataView.rank['ninjaRegistration'] : 'Unknown'}</Text>

                    <Text style={styles.text}>English Voice Actors: {
                        (charDataView.voiceActors && charDataView.voiceActors['english']) ?
                            charDataView.voiceActors['english'] : 'Unknown'}</Text>

                    <Text style={styles.text}>Japanese Voice Actors: {
                        (charDataView.voiceActors && charDataView.voiceActors['japanese']) ?
                            charDataView.voiceActors['japanese'] : 'Unknown'}</Text>



                    <View style={styles.containerButtons}>


                        {/* <TouchableOpacity onPress={handleAddFav}>
                            <Text style={styles.text_favorite}>Add to favorites
                                {<AntDesign name="star" size={16} color="white" />}
                            </Text>
                        </TouchableOpacity> */}
                        {(isFavoriteRouter.toString() === 'true') ?
                            <TouchableOpacity onPress={handleRemoveFav}>
                                <Text style={[styles.text_favorite, { backgroundColor: 'red' }]}>
                                    Remove {
                                        <FontAwesome name="trash" size={24} color="white" />}
                                </Text>
                            </TouchableOpacity>
                            : <TouchableOpacity onPress={handleAddFav}>
                                <Text style={styles.text_favorite}>Add to Favorites {
                                    <AntDesign name="star" size={16} color="white" />}

                                </Text>
                            </TouchableOpacity>}




                        <TouchableOpacity onPress={handleShare}>
                            <Text style={styles.text_share}>Share {
                                <Feather name="share" size={16} color="white" />}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }


    let returnedValue = charData ? (
        <View style={styles.general_container}>
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{ uri: `${charData.images[0]}` }}
                />
                <Text style={styles.text}>
                    {charData.name ?
                        charData.name
                        : 'Unknown Name'}
                </Text>
                <Text style={styles.text}>Sex: {charData.personal.sex ? charData.personal.sex : 'Unknown'}</Text>
                <Text style={styles.text}>Jutsu: {charData.jutsu ? charData.jutsu[0] : 'Unknown'} ...</Text>
                {/* <Text style={styles.text}>Rank: {charData.rank || 'None'}</Text> */}

                <TouchableOpacity onPress={playSound}>
                    <Text style={styles.text_more}>View more info  {
                        <Entypo name="info-with-circle" size={17} color="white" />}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={playSound}>
                    <Text style={styles.text_favorite}>Add to favorites
                        {<AntDesign name="star" size={16} color="white" />}
                    </Text>
                </TouchableOpacity>
                <MaterialCommunityIcons name="shuriken" size={30} color="white" style={styles.shuriken} />
            </View>
            <View styles={styles.container_info}>
            </View>
        </View>) :
        (charDataView
            ? <CharPrintInfo />
            : <Text style={styles.text}>Error retriving the Character information</Text>)

    return (
        returnedValue
    )
};

const styles = StyleSheet.create({
    containerImages: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 25,
    },
    containerButtons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 25,
    },
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
        backgroundColor: 'rgba(0,0,0,0)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        minHeight: 400,
        alignSelf: 'center',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        margin: 0,
        //TODO: Fix this, the margin shows a white color outside the border
        // marginVertical: 5,
        backgroundColor: 'rgba(0,0,0,0.9)',
    },
    container_inside: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 15,
        marginVertical: 65,
    },
    text: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        borderRadius: 5,
        backgroundColor: 'rgba(10,70,200, 0.2)',
        padding: 5,
        marginTop: 5,
        textAlign: 'center',
        minWidth: '50%',
        fontFamily: 'Roboto',
    },
    text_favorite: {
        flex: 1,
        borderWidth: 0.5,
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 2,
        textShadowColor: 'black',
        textAlign: 'center',
        marginVertical: 5,
        borderColor: 'white',
        fontFamily: 'Roboto',
    },
    text_share: {
        flex: 1,
        borderWidth: 0.5,
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 2,
        textShadowColor: 'black',
        textAlign: 'center',
        marginVertical: 5,
        borderColor: 'white',
        fontFamily: 'Roboto',
    },
    image: {
        width: 120,
        height: 120,
        borderWidth: 2,
        marginBottom: 5,
        borderColor: 'white',
        alignSelf: 'center',
    }
})
