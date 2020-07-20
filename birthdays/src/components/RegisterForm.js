//import liraries
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {validateEmail} from '../utils/validations'
import firebase from "../utils/firebase"

// create a component
export default function RegisterForm(props){
    const {changeForm} = props
    const [formData, setFormData] = useState(defaultValue())
    const [formError, setFormError] = useState({})

    const register= () =>{
        let errors = {};

        if(!formData.email || !formData.password || !formData.repeatPassword){
            if(!formData.email) errors.email = true;
            if(!formData.password) errors.password = true;
            if(!formData.repeatPassword) errors.repeatPassword = true;
        }
        else if(!validateEmail(formData.email)){
            errors.email = true;
        }
        else if(formData.password !== formData.repeatPassword){
            errors.password= true;
            errors.repeatPassword = true;
        }
        else if(formData.password.length < 6){
            errors.password= true;
            errors.repeatPassword = true;
        }
        else{
            firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
            .then(()=> {
                console.log("cuenta creada");
            }).catch(()=>{
                setFormError({
                    email: true,
                    password: true,
                    repeatPassword: true
                })
            })
            console.log("form correcto");
        }
        setFormError(errors);
        console.log(errors)
    }

    return (
        <>
            <TextInput
                placeholder="Correo electronico"
                placeholderTextColor="gray"
                style={[styles.input, formError.email && styles.error]}
                onChange={(e) => setFormData({...formData,email: e.nativeEvent.text})}
            /> 
            <TextInput
                placeholder="Contraseña"
                placeholderTextColor="gray"
                style={[styles.input, formError.password && styles.error]}
                secureTextEntry={true}
                onChange={(e) => setFormData({...formData, password :e.nativeEvent.text})}
            />
            <TextInput
                placeholder="Repetir Contraseña"
                placeholderTextColor="gray"
                secureTextEntry={true}
                style={[styles.input, formError.repeatPassword && styles.error]}
                onChange={(e) => setFormData({...formData, repeatPassword:e.nativeEvent.text})}
            />
            <TouchableOpacity style={styles.button}  onPress={register}>
                 <Text style={styles.text}>Registrate</Text>
            </TouchableOpacity>
            <View style={styles.login}> 
                <TouchableOpacity  onPress={changeForm}>
                    <Text style={styles.text}>Iniciar Sesion</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

function defaultValue(){
    return ({
        email : "",
        password: "",
        repeatPassword: "",
    })
}

// define your styles
const styles = StyleSheet.create({
    text:{
        color: '#fff',
        fontSize: 20,
        fontWeight: "bold"
    },
    input:{
        height: 50,
        color: "#000",
        width:'80%',
        marginBottom: 20,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        borderRadius: 10,
        borderColor: "skyblue",
        borderWidth: 3,
        fontSize: 18,
    },
    login: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: "5%"
    },
    error: {
        borderColor: "red",
        borderWidth: 3,
    },
    button:{
        height: "6%",
        width: "80%",
        borderRadius: 10,
        backgroundColor: "green",
        justifyContent: 'center',
        alignItems: "center"
    }
});

