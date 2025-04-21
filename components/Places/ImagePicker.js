import { Alert, Image, View,Text, StyleSheet } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

function ImagePicker() {
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermission() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "İzin gerekli",
        "Kamera erişimi için izin vermen gerekiyor. Ayarlardan kontrol edebilirsin."
      );
      return false;
    }
    return true;
  }
  async function takeImageHandler() {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.uri);
  }

  let imagePreview = <Text >No image taken yet</Text>;
  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }
  return (
    <View >
      <View style={styles.imagePreview} >{imagePreview}</View>
      <OutlinedButton icon={"camera"}  onPress={takeImageHandler} >Take image</OutlinedButton>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview: {
        width: "90%",               // ← ekranın %90’ı kadar genişlik
        alignSelf: "center",        // ← ortaya hizalama
        height: 200,
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 4,
      },
});
