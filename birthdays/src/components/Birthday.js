import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Birthday(props) {
    const { birthday, eliminar } = props;
    const pasat = birthday.days > 0 ? true : false;

    const infoDay = () => {
        if (birthday.days === 0) {
            return <Text style={{color: "#fff", fontSize: 15, fontWeight: "bold"}}>Hoy</Text>
        }
        else {
            const days = -birthday.days



            return (
                <View style={styles.textCurrent}>
                    <Text style={styles.text}>{days} {days === 1 ? "dia" : "Dias"}</Text>
                </View>
            )
        }
    }

    return (
        <TouchableOpacity onPress={() => eliminar(birthday)} style={[
            styles.card, pasat ?
                styles.pasat :
                birthday.days == 0 ?
                    styles.actual :
                    styles.currrent]}>
            <Text style={styles.username}>
                {birthday.nombres} {birthday.apellidos}
            </Text>
            {pasat ?
                <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>Ya pasò</Text> :
                infoDay()
            }
            
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 60,
        alignItems: "center",
        paddingHorizontal: 10,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    pasat: {
        backgroundColor: "red"
    },
    currrent: {
        backgroundColor: "skyblue"
    },
    actual: {
        backgroundColor: "#559204"
    },
    username: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold"
    },
    textCurrent: {
        backgroundColor: "#fff",
        borderRadius: 20,
        width: 60,
        alignItems: "center",
        justifyContent: 'center',
        height: 30,
        fontWeight: "bold"

    },
    text: {
        fontSize: 12,
        fontWeight: "bold"
    }
})