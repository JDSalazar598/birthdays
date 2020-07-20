import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firebase from '../utils/firebase';

export default function ActionBar(props) {
    const { showList, setShowList } = props;
    return (
        <View style={styles.viewFooter}>
            <View style={styles.viewClose}>
                <Text style={styles.textLogout} onPress={() => firebase.auth().signOut()}> Cerrar Sesion </Text>
            </View>
            <View style={styles.viewAdd} >
                <Text onPress={() => setShowList(!showList)} style={styles.textLogout}>
                    {showList ? "Nueva Fecha" : "Cancelar Registro"}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    viewFooter: {
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        width: "100%",
        height: "10%",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: "5%"
    },
    viewClose: {
        backgroundColor: "red",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    textLogout: {
        fontSize: 16,
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold"
    },
    viewAdd: {
        backgroundColor: "skyblue",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
});