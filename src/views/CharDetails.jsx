import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
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

export const CharDetails = ({ charData, ...props }) => {

    const [imageError, setImageError] = useState(false);

    useLayoutEffect(() => {
        console.log('UseLayoutEffect at CharDetails.sx for the data character object: ', charDataView)
    }, [props.navigation]);

    const handleImageError = () => {
        setImageError(true);
        console.log(' Error at loading the image', charDataView.images[0], imageError);
    }

    const { params: { charDataView } } = useRoute();

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

                    <Text style={styles.text}>
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
                        <TouchableOpacity onPress={playSound}>
                            <Text style={styles.text_favorite}>Add to favorites  {
                                <AntDesign name="star" size={16} color="white" />}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={playSound}>
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
                    <Text style={styles.text_favorite}>Add to favorites  {
                        <AntDesign name="star" size={16} color="white" />}</Text>
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
        marginVertical: 5,
    },
    containerButtons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 40,
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
    },
    text_favorite: {
        flex: 1,
        borderWidth: 1,
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
    },
    text_share: {
        flex: 1,
        borderWidth: 1,
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
