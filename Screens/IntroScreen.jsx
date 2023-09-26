import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Animated, Image, Pressable, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { transform } from 'typescript';

const IntroScreen = () => {
    const navigation = useNavigation()
    const [userLogged, setUserLogged] = useState('')
    // const AnimatedImage = Animated.createAnimatedComponent(Image)
    
    const ScaleUp = new Animated.Value(1)
    const TransformY = new Animated.Value(0)

    useEffect(() => {
        // setTimeout(() => {
        //     FetchUser()
            
        //    }, 2000);

        

        setTimeout(() => {
            Animated.timing(ScaleUp,{
                toValue:100,
                duration:2000,
                useNativeDriver:true
            }).start()
            Animated.timing(TransformY,{
                toValue:10,
                duration:2000,
                useNativeDriver:true
            }).start(()=>{
                
            })
            FetchUser()
            
           }, 2000);

      },[userLogged])


      
      
      const FetchUser=async()=>{
       const data= await AsyncStorage.getItem('username')
       setUserLogged(data);
       if (data){
        navigation.navigate('Main')
    }else navigation.navigate('Login')
      }

    return (
        <Animated.View style={[stylesForBg.container,{transform:[
            {scale:ScaleUp},
            {translateY:TransformY}
            ] }]}>
            
            {/* Status bar area */}

            {/* Main content area */}
            <View style={stylesForBg.content}>
                <View style={stylesForBg.circle}></View>
                <View style={stylesForBg.circle1}></View>
                <View style={stylesForBg.circle2}></View>
                <View style={stylesForBg.circle3}></View>
                <View style={stylesForBg.circle4}></View>

                <View style={stylesForBg.imageContainer}>
                    <Image
                        source={require('../assets/OIP-removebg-preview.png')}
                        style={{ height: "25%", width: 200,}}
                        resizeMode='contain'
                    />
                    <View>
                        <Text variant='displayLarge' style={{textAlign:'center',fontWeight:'700'}}>ShareVibe</Text>
                        <Text style={{textAlign:'center',width:250, color:'#888', fontWeight:'500'}}>Where Connections Flourish and Communities thrive</Text>
                    </View>
                <ActivityIndicator size={30} animating={true} color={'#2398BD'} style={{marginTop:100}} />
                </View>
                    {/* <Pressable style={stylesForBg.button} onPress={()=>navigation.navigate("Main")}> 
                        <Text variant='bodyLarge' style={stylesForBg.buttonText}>Lets Go !</Text>
                    </Pressable> */}
            </View>


        </Animated.View>
    );
};

export default IntroScreen;

export const stylesForBg = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white', // Set the background color for the whole screen
        
    },
    
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        height: 300,
        width: 300,
        borderRadius: 200,
        backgroundColor: '#86E2FF',
        position: 'absolute',
        top: -100,
        left: -80,
    },
    circle1: {
        height: 300,
        width: 300,
        borderRadius: 200,
        backgroundColor: 'white',
        position: 'absolute',
        top: -90,
        left: -100,
    },
    circle2: {
        height: 300,
        width: 300,
        borderRadius: 200,
        backgroundColor: '#86E2FF',
        position: 'absolute',
        top: -100,
        left: -120,
    },
    circle3: {
        height: 300,
        width: 300,
        borderRadius: 200,
        backgroundColor: '#86E2FF',
        position: 'absolute',
        top: 600,
        left: 200,
    },
    circle4: {
        height: 200,
        width: 200,
        borderRadius: 200,
        backgroundColor: '#86E2FF',
        position: 'absolute',
        top: "88%",
        left: -50,
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button:{
        marginVertical:30,
        backgroundColor:'#2398BD',
        borderRadius:20,
        width:200
    },
    buttonText:{
        fontWeight:'700',
        paddingHorizontal:30,
        paddingVertical:10 ,
        textAlign:'center',
        color:'#fff',
        fontSize:20

    },
});
