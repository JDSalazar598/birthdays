import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment, { relativeTimeRounding } from "moment";
import firebase from '../utils/firebase';
import "firebase/firestore"

export default function AddBirthday(props) {
    //destructuring de props
    const {user, setShowList, setEjecutar} = props;

    //variables de estado para almacenar datos y errores
    const [isDateVisible, setIsDateVisible] = useState(false)
    const [formData, setFormData] = useState({});
    const [error, setError] = useState({})

    //se agrega para tener compatibilidad con android ya que firebase tiene problemas con esta plataforma
    firebase.firestore().settings({experimentalForceLongPolling: true})

    //valida la coneccion a firebase para agregar una coleccion
    const db = firebase.firestore(firebase)

    //ocultar el date picker
    const hideDatePicker = () => {
        setIsDateVisible(false);
    }

    //confirmar fecha seleccionada dentro del date picker
    const handlerConfirm = (date) => {
        const fecha = date;
        fecha.setHours(0);
        fecha.setMinutes(0);
        fecha.setSeconds(0);

        setFormData({ ...formData, fecha})
        console.log(fecha);
        hideDatePicker();
    }

    //funcion para agregar datos del formulario a formData
    const onChange = (e, type) =>{
        setFormData({...formData, [type] : e.nativeEvent.text})
    }

    //mostrarDate picker
    const showDatePicker = () => {
        setIsDateVisible(true);
    }

    //envia los datos a firebase y agrega la coleccion si todo esta correcto
    const onSubmit = () =>{
        let errors = {};

        if(!formData.nombres || !formData.apellidos || !formData.fecha){
            if(!formData.nombres) errors.nombres = true;
            if(!formData.apellidos) errors.apellidos = true;
            if(!formData.fecha) errors.fecha = true;
        }else{
            const data = formData;
            data.fecha.setYear(0);

            db.collection(user.uid)
            .add(data)
            .then (() => {
                setEjecutar(true);
                setShowList(true);
            })
            .catch(()=>{
                setError({nombres: true, apellidos: true, fecha: true})
            })

            console.log(data);
        }

        setError(errors);
    }

    //diseno del componente
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Registrar Cumpleaños:</Text>
                <TextInput
                    placeholder="Nombres"
                    placeholderTextColor="gray"
                    style={[styles.input, error.nombres && {borderColor: "red", borderWidth: 2}]}
                    onChange={(e) => onChange(e, "nombres")}
                />
                <TextInput
                    placeholder="Apellidos"
                    placeholderTextColor="gray"
                    style={[styles.input, error.apellidos && {borderColor: "red",borderWidth: 2}]}
                    onChange={(e) => onChange(e, "apellidos")}
                />
                <View style={[styles.input, styles.datePicker, error.fecha && {borderColor: "red", borderWidth: 2}]}>
                    <Text onPress={showDatePicker} style={{
                        color: formData.fecha ? "#000" : "gray",
                        fontSize: 18
                    }}
                    >
                        {formData.fecha ? 
                            moment(formData.fecha).format("LL") :
                            "Fecha de Nacimiento:"
                        }
                    </Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={onSubmit}>
                    <Text style={styles.addButton}>Guardar</Text>
                </TouchableOpacity>
            </View>
            <DateTimePickerModal
                isVisible={isDateVisible}
                mode="date"
                onConfirm={handlerConfirm}
                onCancel={hideDatePicker}
            />
        </>
    );
}

// function defaultValues() {
//     return ({
//         nombres: "",
//         apellidos: "",
//         fecha: "",
//     })
// }

//estilos
const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        height: 50,
        color: "#000",
        width: "80%",
        marginBottom: 25,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingRight: 18,
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'skyblue',
        borderWidth: 3
    },
    datePicker: {
        justifyContent: "center"
    },
    addButton: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold"
    },
    button: {
        backgroundColor: "green",
        width: "80%",
        height: "7%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    title:{
        color: "#fff",
        marginBottom: 20,
        fontSize: 20,
        fontWeight: "bold"
    }
});
