import React from 'react';
import {
    Modal as RNModal, KeyboardAvoidingView,
    View, Text, StyleSheet, TouchableOpacity, Button
} from 'react-native';
import { playSound } from '../utils/tapSound.jsx'
import { FontAwesome } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

export const Modal = ({ isModalOpen, withInput, children, ...props }) => {
    const { onRequestClose, FilledModal } = props;
    const { muted } = useSelector((state) => state.userReducer);

    const handleCloseButton = () => {
        onRequestClose();
        if (!muted) {
            playSound();
        }
    }

    // const modifiedChildren = React.Children.map(children, child => {
    //     return React.cloneElement(child, { onRequestClose });
    // });

    const content = withInput ? (
        <KeyboardAvoidingView behavior='height' style={styles.modalContent}>
            {children}


            {FilledModal ?

                <Text style={styles.text}>
                    {FilledModal.name}
                    {FilledModal.id}
                    {FilledModal.jutsu}
                </Text>
                : <Text style={styles.text}>There is nothing here</Text>}



            <TouchableOpacity onPress={handleCloseButton}
                style={styles.button}>
                <Text style={styles.button_text}>
                    <FontAwesome name="close" size={30} color="white" />
                </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    ) : (
        <View style={styles.modalContent}>

            {children}
            <Text style={styles.text}>
                MODAL WITH CONTENT IN THE MODAL!
            </Text>
        </View>
    );

    return (
        <RNModal
            visible={isModalOpen}
            transparent
            animationType='fade'
            statusBarTranslucent
            {...props}
        >
            {content}
        </RNModal>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        flex: 7 / 12,
        flexDirection: 'column',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: 'rgba(5, 10, 30, 1)',
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderWidth: 0.5,
        borderRadius: 10,
        paddingVertical: 200,
        width: '92%',
        marginTop: 120,

    },
    text: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: 'red',
        padding: 10,
        borderColor: 'white',
        borderRadius: 25,
        borderWidth: 1,
        marginTop: 10,
        width: '75%',
        maxWidth: 1000,
        alignSelf: 'center',
    },
    button_text: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        alignSelf: 'center',
    }
});
