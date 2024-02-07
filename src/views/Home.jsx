import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, FlatList, SafeAreaView, Text } from 'react-native';
import { WriteNameComponent } from '../components/WriteNameComponent.jsx';
import { useEffect, useState } from 'react';
import { Character } from '../components/Character.jsx';
import { loadData } from '../utils/fetchCharsData.jsx'
import { CharModal } from '../components/CharModal.jsx'
import { Modal } from '../components/Modal.jsx'

export const Home = () => {

    const [refreshing, setRefreshing] = useState(false); // For the FlatList
    const [dataFetched, setdataFetched] = useState([]);
    const [text, onChangeText] = useState(""); // For the input field for searching by name
    const [charModal, setcharModal] = useState(false) // The modal for every character
    const [FilledModal, setFilledModal] = useState({}) // The modal object of every character

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

    useEffect(() => {
        loadData(setdataFetched);
    }, []); // Started when the component is mounted

    useEffect(() => {
        // console.log('useEffect> ', dataFetched);
    }, [dataFetched]); // Observe changes in dataFetched

    useEffect(() => {
        onChangeText('');
        return () => {
            setRefreshing(false);
            loadData(setdataFetched);
        }
    }, [refreshing]); // Observe changes in the refresing state

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <Modal id='modal_id' isModalOpen={charModal}
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
            {/* <WriteNameComponent setdataFetched={setdataFetched} onChangeText={onChangeText} text={text} /> */}
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
        backgroundColor: 'rgba(10,30,60,1)',
        borderWidth: 1,
    },
    container: {

        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.9)',
    },
    modal_background: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
})