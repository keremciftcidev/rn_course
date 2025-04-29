import { useCallback, useState } from "react";
import { ScrollView,  TextInput,Text,  View ,StyleSheet, Button} from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

function PlaceForm() {

    const [enteredTitle, setEnteredTitle] = useState()
    const [pickedLocation, setPickedLocation] = useState()
    const [selectedImage, setSelectedImage] = useState()

    function changeTitleHandler(enteredText){
        setEnteredTitle(enteredText)
    }
    function takeImageHandler(imageUri){
        selectedImage(imageUri)
    }
    const  pickLocationHandler = useCallback((location)=>{
        setPickedLocation(location)
    },[])
    function savePlaceHandler(){
        console.log(enteredTitle)
        console.log(pickedLocation)
        console.log(selectedImage)
    }
    return <ScrollView>
        <View style={styles.form}>
            <Text style={styles.label}>Title</Text>
            <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle}/>
        </View>
        <ImagePicker onImageTaken={takeImageHandler}/>
        <LocationPicker onLocationPick={pickLocationHandler}/>
        <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
}

export default PlaceForm;

const styles  = StyleSheet.create({

    form:{
        flex:1,
        padding:24
    },
    label:{
        fontWeight:"bold",
        marginBottom:4,
        color:Colors.primary500,
        
    },
    input:{
        marginVertical:8,
        paddingHorizontal:8,
        paddingVertical:8,
        fontSize:16,
        borderBottomColor:Colors.primary700,
        borderBottomWidth:2,
        backgroundColor:Colors.primary100


    }
})


