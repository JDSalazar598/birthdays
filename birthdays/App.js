import React, {useEffect, useState} from 'react';
import {decode, encode} from "base-64"
import { SafeAreaView, Text, View, StyleSheet, StatusBar, Button, YellowBox } from 'react-native';
import Auth from './src/components/Auth';
import firebase from "./src/utils/firebase";
import 'firebase/auth';
import colors from './src/utils/colors'
import ListBirthday from './src/components/ListBirthday'

if(!global.btoa) global.btoa = encode;
if(!global.atob) global.atob = decode;
YellowBox.ignoreWarnings(["Setting a timer"])

export default function App(){
  const [user, setUser] = useState(undefined)
  useEffect(() => {
    firebase.auth().onAuthStateChanged((response) =>{
      setUser(response)
    })
  },[])

  if(user === undefined) return null;


  return (
    <>
      <StatusBar  barStyle="light-content" backgroundColor={colors.PRIMARY_COLOR} />
      <SafeAreaView style={styles.background}>
      {user ? <ListBirthday user={user} /> : <Auth/>}
      </SafeAreaView>
    </>
  );
}

function Logout() {
  const logout = () =>{
    firebase.auth().signOut()
  }
  return(
    <View>
      <Text>Estas Logeado</Text>
      <Button title="Cerrar Sesion" onPress={logout}/>
    </View>
  )
}


const styles = StyleSheet.create({
  background : {
    backgroundColor: "#000",
    height: "100%"
  },

  bar:{
    backgroundColor: "#15212b",
    color: "#fff"
  }

})