//import liraries
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert
} from 'react-native';
import ActionBar from '../components/ActionBar'
import AddBirthday from '../components/AddBirthday'
import firebase from "../utils/firebase";
import "firebase/firestore"
import moment from "moment"
import Birthday from "../components/Birthday"

const db = firebase.firestore(firebase)

firebase.firestore().settings({experimentalForceLongPolling: true})

// create a component
export default function ListBirthday(props) {
    const {user} = props;
    const [showList, setShowList] = useState(false);
    const [birthday, setBirthday] = useState([]);
    const [pasados, setPasados] = useState([]);
    const [ejecutar, setEjecutar] = useState(false);

    console.log(birthday);
    useEffect(() => {
        setBirthday([]);
        setPasados([]);
        db.collection(user.uid)
        .orderBy("fecha", "asc")
        .get()
        .then((response) => {
            const itemsArray = [];

            response.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;

                itemsArray.push(data);
            })
            formatData(itemsArray);
        })
        setEjecutar(false); 
    }, [ejecutar])

    const formatData = (items) =>{
        const currentDate = moment().set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        });

        const temporalCumples = [];
        const temporalPasados = [];

        items.forEach((item) => {
            const date = new Date(item.fecha.seconds * 1000);
            const dateCumple = moment(date);
            const currentYear = moment().get("year");
            
            dateCumple.set({year : currentYear});

            const diffDate = currentDate.diff(dateCumple, "days")
            const itemsTemp = item;

            itemsTemp.fecha = dateCumple;
            itemsTemp.days = diffDate;

            if(diffDate <= 0){
                temporalCumples.push(itemsTemp);
            }else{
                temporalPasados.push(itemsTemp);
            }

        })
        setBirthday(temporalCumples);
        setPasados(temporalPasados);

    }

    const eliminar = (birthday) => {
        console.log(birthday)
        Alert.alert(
            'Eliminar cumple',
            `Estas seguro de eliminar el cumple de ${birthday.nombres} ${birthday.apellidos}`,
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "eliminar",
                    onPress: () => {
                        db.collection(user.uid)
                        .doc(birthday.id)
                        .delete().then(() => {
                            setEjecutar();
                        })
                    }
                }
            ],
            {cancelable: false}
        )
    }

    return (
        <View style={styles.container}>
            {showList ? (
                <>
                <Text style={styles.title}>Lista de cumpleaños:</Text>
                <ScrollView style={styles.scrollView}>
                    {birthday.map(( item, index) => (
                        <Birthday key={index} birthday={item} eliminar={eliminar} />
                    ))}
                    {pasados.map(( item, index) => (
                        <Birthday key={index} birthday={item} eliminar={eliminar} />
                    ))}
                </ScrollView>
                </>
            ):(                
                <AddBirthday user={user} setEjecutar={setEjecutar}  setShowList={setShowList} />
            )}
            <ActionBar showList={showList}  setShowList={setShowList}/>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: "100%"
    },
    scrollView:{
        marginTop: "10%",
        width: "100%",
        paddingLeft: "5%",
        paddingRight: "5%"
    },
    title:{
        fontSize: 25,
        color: "#fff",
        marginTop: "10%",
        fontWeight: "bold"
    }
});
