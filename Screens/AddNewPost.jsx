import { Dimensions, StyleSheet, Text, TextInput, View, Image, Pressable, KeyboardAvoidingView, ScrollView, PermissionsAndroid } from 'react-native'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleXmark, faClose, faLocationDot, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { launchImageLibrary } from 'react-native-image-picker';

const AddNewPost = () => {

    const [imageData, setImageData] = useState([])
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    const [imageUri, setImageUri] = useState('')
    const [uploadedImageUri, setUploadedImageUri] = useState('')

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "App Camera Permission",
                    message: "App needs access to your camera ",
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

    const handlePress = async () => {
        const resultGallery = await launchImageLibrary({ mediaType: 'photo', quality: 1 })
        if (resultGallery.didCancel) {
            console.log("User Cancelled Image Picker");
        }else{
            resultGallery.assets.map((res)=>{
                const uri = res.uri
                const type =res.type
                const name = res.fileName
                const source = {uri,type,name}
                setImageData(source)
                setImageUri(uri)
            });
        }
    }

    const handleSubmit=async()=>{
        console.log("Handle Submit");
        if(imageUri!=="" && description!=="" ){
        //    postDetails(imageData)
                const data = {
                    description,
                    postImagePath:uploadedImageUri,
                    time:new Date().toLocaleString(),
                    postedBy:'user1',
                    likes:[],
                    comments:[]
                }
                console.log(data);
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
                    setUploadedImageUri();
                })
                .catch((err) => {
                    console.log(err);
                });
        } 
    };

    return (
        <ScrollView style={{ padding: 20, }}>
            <View style={{ justifyContent: 'center', alignItems: 'center',flex:1 }}>
                {
                    imageUri ?
                        <View style={{ gap: 20, width: "100%", height: 300, backgroundColor: '#fff', justifyContent: 'center', alignItems: "center", borderWidth: 3, borderStyle: 'dashed', padding: 10 }}>
                            <View style={{ width: "100%", height: 300, position: 'relative' }}>
                                <Image source={{uri:imageUri}} style={{ height: 300, width: '100%',paddingVertical:2 }} resizeMode='contain' />
                                <View style={{ position: 'absolute', top: 10, right: 0 }}>
                                    <Pressable onPress={()=>setImageUri("")}>
                                    <FontAwesomeIcon icon={faCircleXmark} size={30} color='red' />
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                        :
                            <Pressable  style={{ gap: 20, width: "100%", height: 300, backgroundColor: '#fff', justifyContent: 'center', alignItems: "center", borderWidth: 3, borderStyle: 'dashed', padding: 10 }}>
                                <Pressable onPress={handlePress}>

                                <FontAwesomeIcon icon={faPlusCircle} size={50} />
                                </Pressable>
                                <Text>Click here to add pic</Text>
                     
                            </Pressable>
                }

            </View>
            <View style={{ gap: 30, marginTop: 20 }}>
                <View>
                    <Text style={{ marginLeft: 5, fontWeight: '600', color: '#000', marginBottom: 5 }}>Description</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 10, borderRadius: 10, justifyContent: 'space-between' }}>
                        <TextInput placeholder='Add description' onChangeText={(e)=>setDescription(e)}
                            multiline={true} style={{ flex: 1 }} numberOfLines={10} />
                    </View>
                </View>
                <View>
                    <Text style={{ marginLeft: 5, fontWeight: '600', color: '#000', marginBottom: 5 }}>Location</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 10, borderRadius: 10, justifyContent: 'space-between' }}>
                        <FontAwesomeIcon icon={faLocationDot} />
                        <TextInput placeholder='Add Location'
                            multiline={true} style={{ flex: 1 }} />
                    </View>
                </View>

            <Pressable onPress={handleSubmit} style={{ backgroundColor: '#2398BD', justifyContent: 'center', alignItems: "center", padding: 10,  borderRadius:10 }}>
                <Text style={{ color: "#fff", fontWeight: '700', fontSize: 20 }}>Post</Text>
            </Pressable>
            </View>
        </ScrollView>
    )
}

export default AddNewPost

const styles = StyleSheet.create({})
