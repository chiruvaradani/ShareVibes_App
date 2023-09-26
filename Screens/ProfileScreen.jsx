import { Animated, Dimensions, Image, Pressable, ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import { data } from '../data'
import HeaderComp from '../Components/HeaderComp'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Posts from '../Components/Posts'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGear, faGears, faPen, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

const TopTabs = createMaterialTopTabNavigator()
const Stack = createNativeStackNavigator()



const ProfileScreen = () => {

    const navigation = useNavigation()

    const handleLogout = async () => {
        await AsyncStorage.clear().then((res) => {
            navigation.navigate('Login')
        })
    }


    //For Hiding Navbar on Scroll Up
    const scrollY = new Animated.Value(0)
    const diffClamp = Animated.diffClamp(scrollY, 0, 60)
    const translateY = diffClamp.interpolate({
        inputRange: [0, 60],
        outputRange: [0, -60]
    })



    return (
        <View style={{ backgroundColor: "#fff" }}>
            <Animated.View
                style={{ transform: [{ translateY: translateY }], elevation: 4, zIndex: 100 }}>
                <HeaderComp application={'true'} />
            </Animated.View>

            <ScrollView onScroll={(e) => scrollY.setValue(e.nativeEvent.contentOffset.y)}>
                <StatusBar backgroundColor={"#fff"} />
                <Text></Text>
                <Text></Text>
                <Text></Text>
                <View style={{ position: "relative", }}>
                    <View style={{ width: '100%', backgroundColor: "#fff", }}>
                        <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
                            <View style={{ marginLeft: 10, borderRadius: 50 }}>
                                <Image source={{ uri: 'https://th.bing.com/th/id/OIP.Gfp0lwE6h7139625a-r3aAHaHa?pid=ImgDet&rs=1' }} resizeMode='contain' style={{ height: 150, width: 150, borderRadius: 100 }} />
                            </View>
                        </View>
                        <View style={{ marginLeft: 30, marginTop: 20 }}>
                            <Text variant='displaySmall' style={{ fontWeight: "700" }} >Vishwanath</Text>
                            <Text variant='bodyLarge' style={{ marginBottom: 10 }} >@Vishwanath</Text>
                            <Text variant='bodySmall' numberOfLines={2} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, aliquam!</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: 20 }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text variant='labelLarge' >Friends</Text>
                                <Text variant='headlineSmall' style={{ fontWeight: "700" }}>12</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text variant='labelLarge'>Posts</Text>
                                <Text variant='headlineSmall' style={{ fontWeight: "700" }}>2</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text variant='labelLarge'>Saved Posts</Text>
                                <Text variant='headlineSmall' style={{ fontWeight: "700" }}>10</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: 20, marginHorizontal: 20, gap: 10 }}>
                            <Pressable style={styles.Profilebutton}>
                                <FontAwesomeIcon icon={faPen} />
                                <Text variant='labelMedium'>  Edit Profile</Text>
                            </Pressable>
                            <Pressable style={styles.Profilebutton} onPress={handleLogout}>
                                <FontAwesomeIcon icon={faPowerOff} />
                                <Text variant='labelMedium'>  Log out</Text>
                            </Pressable>

                        </View>
                    </View>
                </View>

                <Posts />

            </ScrollView>
        </View>
    )
}










export default ProfileScreen

const styles = StyleSheet.create({
    Profilebutton: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 5,
        flexDirection: 'row',
    },


})
