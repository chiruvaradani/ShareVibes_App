import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, Button, Image, StyleSheet, PermissionsAndroid } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { Text } from 'react-native-paper';



const GalleryScreen = () => {
  const [selectedImage, setSelectedImage] = useState([]);

  useEffect(() => {
    requestCameraPermission()
}, [])

const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message:"App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };



const OpenCamera= async()=>{
    const resultCam = await launchCamera({mediaType:'photo', quality:1})
    console.log(resultCam);
}

const OpenGallery= async()=>{
    const resultGallery = await launchImageLibrary({mediaType:'photo', quality:1})
    if(resultGallery.didCancel){
        console.log("User Cancelled Image Picker");
    }
    else{
        resultGallery.assets.map((res)=>{
            setSelectedImage(res)
            const uri = res.uri
            const type =res.type
            const name = res.fileName
            const source = {uri,type,name}
            postDetails(source)
        });
    }
}

const postDetails = (pics) => {
    
    if (pics === undefined) {


    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/jpg" ) {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "chat-app");
        data.append("cloud_name", "Auth");
        console.log(data);
        fetch("https://api.cloudinary.com/v1_1/chiruvaradani/image/upload", {
            method: "post",
            body: data,
        })
            .then((res) => res.json())
            .then((data) => {
                
                console.log(data.url.toString());
                // setloading(false);
            })
            .catch((err) => {
                console.log(err);
                // setloading(false);
            });
    } 
};

console.log(typeof selectedImage, selectedImage);

  return (
    <View style={[styles.container,{gap:10}]}>
      <Button title="Click Image" onPress={OpenCamera} />
      <Button title="Select Image" onPress={OpenGallery} />
      {
        selectedImage &&
        <>

        <Text>{selectedImage.uri}</Text>
        <Image source={{uri:selectedImage.uri}} style={{height:150, width:150}}/>
        </>
      }
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

export default GalleryScreen;
