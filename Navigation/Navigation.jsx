import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../Screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {  faHome, faHouse, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import FriendsScreen from '../Screens/FriendsScreen';
import { faCompass, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import ProfileScreen from '../Screens/ProfileScreen';
import AddFriendsScreen from '../Screens/AddFriendsScreen';
import IntroScreen from '../Screens/IntroScreen';
import { useEffect } from 'react';
import LoginScreen from '../Screens/LoginScreen';
import AddNewPost from '../Screens/AddNewPost';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator()



const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='IntroScreen' component={IntroScreen} options={{headerShown:false}}/>
        <Stack.Screen name='Login' component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name='Main' component={BottomTabs} options={{headerShown:false}}/>
        <Stack.Screen name='Add Post' component={AddNewPost} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const BottomTabs=()=>{
    return(
    <Tabs.Navigator
    screenOptions={{
    tabBarStyle: {
      borderTopLeftRadius: 20,  // Apply border radius to the top-left corner
      borderTopRightRadius: 20, // Apply border radius to the top-right corner
    },
  }}
    >
        <Tabs.Screen name='Home' component={HomeScreen} 
        options={{
            headerShown:false,
            tabBarIcon:({focused})=>(
            focused?<FontAwesomeIcon icon={faHome} size={24} color='#30D3FC'/>:
            <FontAwesomeIcon icon={faHouse} size={24} color='black'/>
            )
        }}/>
        <Tabs.Screen name='Explore' component={AddFriendsScreen} 
        options={{
            headerShown:false,
            tabBarIcon:({focused})=>(
            focused?<FontAwesomeIcon icon={faCompass} size={24} color='#30D3FC'/>:
            <FontAwesomeIcon icon={faCompass} size={24} color='black'/>
            )
        }}/>
        <Tabs.Screen name='Friends' component={FriendsScreen} 
        options={{
            headerShown:false,
            
            tabBarIcon:({focused})=>(
            focused?<FontAwesomeIcon icon={faUserFriends} size={24} color='#30D3FC'/>:
            <FontAwesomeIcon icon={faUserFriends} size={24} color='black'/>
            )
        }}/>
        <Tabs.Screen name='Profile' component={ProfileScreen} 
        options={{
            headerShown:false,
            tabBarIcon:({focused})=>(
            focused?<FontAwesomeIcon icon={faUserCircle} size={24} color='#30D3FC'/>:
            <FontAwesomeIcon icon={faUserCircle} size={24} color='black'/>
            )
        }}/>
    </Tabs.Navigator> 
    )
}

export default Navigation;
