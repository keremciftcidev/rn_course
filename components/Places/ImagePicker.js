import { Alert, Button, View } from "react-native";
import {launchCameraAsync, useCameraPermissions,PermissionStatus} from "expo-image-picker"

function ImagePicker() {
    const  [cameraPermissionInformation,requestPermission]= useCameraPermissions()

    async function verifyPermission(){
        if(cameraPermissionInformation.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission()
            return permissionResponse.granted
        }

        if(cameraPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert(
                "İzin gerekli",
                "Kamera erişimi için izin vermen gerekiyor. Ayarlardan kontrol edebilirsin."
            )
            return false
        }
        return true

    }
  async function takeImageHandler() {
    const hasPermission = await verifyPermission()

    if(!hasPermission ){
        return
    }
   const image =  await launchCameraAsync({
    allowsEditing:true,
    aspect:[16,9],
    quality:0.5
   })
   console.log(image)
  }
  return (
    <View>
      <View></View>
      <Button title="take image" onPress={takeImageHandler} />
    </View>
  );
}

export default ImagePicker;
