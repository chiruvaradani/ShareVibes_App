import { Image, Pressable, StyleSheet, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { stylesForBg } from './IntroScreen'
import { Snackbar, Text } from 'react-native-paper'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleExclamation, faCircleXmark, faClose, faKey, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { faGoogle, faSquareFacebook, faSquareGithub, faSquareGooglePlus } from '@fortawesome/free-brands-svg-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { useNavigation } from '@react-navigation/native'
import { generateToken } from '../Api/ApiCalls'

const LoginScreen = () => {

    const navigate = useNavigation()

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

   

    const navigation = useNavigation()

    const [showSnackbar, setShowSnackbar] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const handleInput = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async() => {
        const isStateValid = Object.values(formData).every((value) => value !== "" && value !== null)
        if (!isStateValid) {
            setShowSnackbar(true)
            setErrorMessage("All Fields are required")
            setTimeout(() => {
                setErrorMessage('')
            }, 2000);
        } else {
            setErrorMessage('')
            // generateToken(formData)
            navigate.navigate('Main')
            // console.log(formData);
        }
    }
    console.log(formData);

    return (
        <>
            <View style={stylesForBg.container}>
                {/* Status bar area */}

                {/* Main content area */}
                <View style={stylesForBg.content}>
                    <View style={stylesForBg.circle}></View>
                    <View style={stylesForBg.circle1}></View>
                    <View style={stylesForBg.circle2}></View>
                    <View style={stylesForBg.circle3}></View>

                    <View style={[{ flex: 1, alignItems: 'center', justifyContent: "center" }]}>
                        <Image
                            source={require('../assets/OIP-removebg-preview.png')}
                            style={{ height: "30%", width: 200 }}
                            resizeMode='contain'
                        />

                        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#efefef', marginHorizontal: 20, marginVertical: 10, paddingHorizontal: 10, borderRadius: 10 }}>
                            <FontAwesomeIcon icon={faUser} style={{ marginRight: 10, marginLeft: 5 }} size={18} />
                            <TextInput onChangeText={(text) => handleInput('username', text)} placeholder='Username' style={{ flex: 1 }} />
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#efefef', marginHorizontal: 20, marginVertical: 10, paddingHorizontal: 10, borderRadius: 10 }}>
                            <FontAwesomeIcon icon={faKey} style={{ marginRight: 10, marginLeft: 5 }} size={18} />
                            <TextInput placeholder='Password (example@123)' onChangeText={(text) => handleInput('password', text)} style={{ flex: 1 }} />
                        </View>


                        <>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 25, marginVertical: 0, paddingVertical: 0 }}>
                                <View style={{ flex: 1, }}>
                                    <Text variant='labelSmall' style={{ textAlign: 'left', }}>Forgot password ?</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 20 }}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Pressable style={[stylesForBg.button, { width: 150 }]} onPress={handleSubmit}>
                                        <Text variant='labelLarge' style={{ textAlign: 'center', paddingVertical: 10, color: '#fff', fontWeight: '700', fontSize: 18 }}>Login </Text>
                                    </Pressable>
                                </View>
                            </View>


                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginLeft: 20 }}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Text style={{ textAlign: 'left', }} variant='bodySmall'>Don't have an Account?</Text>
                                    <Pressable>
                                        <Text variant='bodySmall' style={{ color: 'blue', fontWeight: '500' }}> Sign Up</Text>
                                    </Pressable>

                                </View>
                            </View>

                            <View style={{ position: 'relative' }}>
                                <View style={{ flexDirection: "row", position: 'absolute', paddingHorizontal: 20, left: -200, top: 27 }}>
                                    <View style={{ borderWidth: 1, borderColor: '#ccc', flex: 1 }}>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', }}>
                                <Pressable style={{ backgroundColor: '#fff', marginTop: 15 }}>
                                    <Text variant="bodyLarge" style={{ paddingHorizontal: 5, color: "#888", textAlign: 'center' }}>Sign in with</Text>
                                </Pressable>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 10, gap: 20 }}>
                                <FontAwesomeIcon icon={faSquareFacebook} color='#3060FC' size={40} />
                                <FontAwesomeIcon icon={faSquareGithub} size={40} />
                                <FontAwesomeIcon icon={faGoogle} color='red' size={40} />
                                {/* <FontAwesomeIcon icon={faGithub} size={30}/>
                            <FontAwesomeIcon icon={faGithub} size={30}/> */}
                            </View>

                            {
                                errorMessage &&
                                <Snackbar
                                    visible={true}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'space-between' }}>
                                        <View style={{ flexDirection: 'row', gap: 10 }}>
                                            <View style={{ backgroundColor: "white", borderRadius: 30, padding: 2 }}>
                                                <FontAwesomeIcon icon={faCircleExclamation} color='red' style={{ padding: 10 }} size={20} />
                                            </View>
                                            <Text style={{ color: 'white' }}>|</Text>
                                            <Text style={{ fontWeight: '700', color: '#fff' }} >{errorMessage}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', gap: 10 }}>
                                            <Pressable onPress={()=>{setErrorMessage('')}}> 
                                            <FontAwesomeIcon icon={faCircleXmark}  color='#888' style={{ padding: 10 }} size={20} />
                                            </Pressable>
                                        </View>
                                    </View>
                                </Snackbar>
                            }
                            {
                                successMessage &&
                                <Snackbar
                                    visible={true}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'space-between' }}>
                                        <View style={{ flexDirection: 'row', gap: 10 }}>
                                            <View style={{ backgroundColor: "green", borderRadius: 30, padding: 2 }}>
                                                <FontAwesomeIcon icon={faCircleCheck} color='white' style={{ padding: 10 }} size={20} />
                                            </View>
                                            <Text style={{ color: 'white' }}>|</Text>
                                            <Text style={{ fontWeight: '700', color: '#fff' }} >{successMessage}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', gap: 10 }}>
                                            <Pressable onPress={()=>{setSuccessMessage('')}}> 
                                            <FontAwesomeIcon icon={faCircleXmark}  color='#888' style={{ padding: 10 }} size={20} />
                                            </Pressable>
                                        </View>
                                    </View>
                                </Snackbar>
                            }

                        </>

                    </View>
                </View>
            </View>
        </>
    )
}



export default LoginScreen

const styles = StyleSheet.create({})
