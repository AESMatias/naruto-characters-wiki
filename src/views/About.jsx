import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { Modal } from '../components/Modal.jsx'
import { useState } from 'react'


export const About = () => {
    const [modalOpen, setmodalOpen] = useState(false)

    return (
        <View style={styles.background}>
            <Pressable onPress={() => setmodalOpen(true)}>
                <Text>Open Modal</Text>
            </Pressable>

            <Modal id='modal_id' isModalOpen={modalOpen}
                withInput
                onRequestClose={() => setmodalOpen(false)}>
                <Text>
                    MODAL TEXTO X FUERA
                </Text>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(7, 26, 93,255)',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(7, 26, 93,255)',
    },
})