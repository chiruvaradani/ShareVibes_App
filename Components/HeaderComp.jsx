import { Animated, Image, Pressable, StatusBar, StyleSheet, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-paper'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBell, faImage, faMessage, faPlusSquare } from '@fortawesome/free-regular-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'

const HeaderComp = ({ application }) => {

  const navigation = useNavigation()

  const [showDropDown, setShowDropDown] = useState(false)
  const dropAnimation = new Animated.ValueXY({x:100, y:0})
  const Scale = new Animated.Value(0)

  useEffect(() => {
    if(showDropDown){
      Animated.timing(dropAnimation,{
        toValue:{x:0, y:30},
        // friction:2,
        useNativeDriver:true
      }).start()
      Animated.timing(Scale,{
        toValue:1,
        // friction:2,
        duration:500,
        useNativeDriver:true
      }).start()
    }
  }, [showDropDown])


  return (
    <View style={{}}>
      <StatusBar backgroundColor={"#fff"} barStyle={'dark-content'} />
      <View style={{ backgroundColor: '#fff', }}>
        <View style={application === "true" ? styles.hideNav : styles.fixedNav}>

          <View>
            <Image source={require('../assets/OIP-removebg-preview.png')} resizeMode='contain' style={{ height: 50, width: 50 }} />
          </View>
          <Text variant='titleLarge' style={{ fontWeight: '700' }}>ShareVibe</Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={{}}>
              <Pressable onPress={()=>setShowDropDown(!showDropDown)}>
                <FontAwesomeIcon icon={faPlusSquare} size={20} />
              </Pressable>
              
              {
                showDropDown &&
                <Animated.View style={[styles.customDropDown,{transform:[{scale:Scale},{translateX:dropAnimation.x},{translateY:dropAnimation.y}]}]}>
                
                <Pressable onPress={()=>{navigation.navigate("Add Post");setShowDropDown(!showDropDown)}} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FontAwesomeIcon icon={faImage} />
                  <Text>  Add Post</Text>
                </Pressable>
                
                <Text style={{ height: 1, borderWidth: 1, borderColor: '#ccc', marginVertical: 5 }} />
                
                <Pressable style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FontAwesomeIcon icon={faPlusSquare} />
                  <Text>  Add Story</Text>
                </Pressable>

              </Animated.View>
              }

            </View>
            <View>
              <Pressable>
                <FontAwesomeIcon icon={faBell} size={20} />
              </Pressable>
            </View>
          </View>
        </View>
      </View>

    </View>
  )
}

export default HeaderComp

const styles = StyleSheet.create({
  hideNav: {
    position: 'absolute', top: 0, right: 0, left: 0, height: 60, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", backgroundColor: '#fff', paddingHorizontal: 10,
  },
  fixedNav: {
    flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", paddingHorizontal: 10
  },
  customDropDown: {
    position: 'absolute', top: 0, right: 0, backgroundColor: '#efefef', zIndex: 1, elevation: 5, width: 200, borderRadius: 10, padding: 10,
     shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // elevation: 5,
  }
})
