//import liraries
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { validateEmail } from '../utils/validations'
import firebase from '../utils/firebase'

// create a component
export default function LoginForm(props) {
    const { changeForm } = props;
    const [formData, setFormData] = useState(defaultValue())
    const [formError, setFormError] = useState({})

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    const login = () => {
        let errors = {};

        if (!formData.email || !formData.password) {
            if (!formData.email) errors.email = true;
            if (!formData.password) errors.password = true;
        }
        else if (!validateEmail(formData.email)) {
            errors.email = true;
        }
        else {
            firebase.auth().signInWithEmailAndPassword(formData.email, formData.password)
                .then(() => {
                    console.log("Inicio de sesion aprobado");
                }).catch(() => {
                    setFormError({
                        email: true,
                        password: true
                    })
                    console.log("El usuario no esta registrado");
                })
        }
        setFormError(errors);
        console.log(errors)
    }

    return (
        <>
            <TextInput
                placeholder="Correo electronico"
                placeholderTextColor="#969696"
                style={[styles.input, formError.email && styles.error]}
                onChange={(e) => onChange(e, "email")}
            />
            <TextInput
                placeholder="Contraseña"
                placeholderTextColor="#969696"
                style={[styles.input, formError.password && styles.error]}
                secureTextEntry={true}
                onChange={(e) => onChange(e, "password")}
            />
            <TouchableOpacity style={styles.register} onPress={login}>
                    <Text style={styles.button}>Login</Text>
            </TouchableOpacity>
            <View style={styles.login}>
                <TouchableOpacity onPress={changeForm}>
                    <Text style={styles.button}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

function defaultValue() {
    return ({
        email: "",
        password: ""
    })
}


// define your styles
const styles = StyleSheet.create({
    button: {
        color: '#fff',
        fontSize: 20,
        fontWeight: "bold"
    },
    input: {
        height: 50,
        color: "#000",
        width: '80%',
        marginBottom: 20,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        borderRadius: 10,
        fontSize: 18,
        borderColor: "skyblue",
        borderWidth: 3
    },
    login: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 20
    },
    error: {
        borderColor: "#940c0c"
    },
    register: {
        backgroundColor: "green",
        width: "80%",
        height: "7%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10

    }
});


