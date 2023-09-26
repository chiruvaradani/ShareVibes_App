import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import HeaderComp from '../Components/HeaderComp'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEllipsisV, faSearch, faUserCircle, faUserFriends, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Card, Text } from 'react-native-paper'
import { data } from '../data'

const FriendsScreen = () => {
    return (
        <View style={{backgroundColor:'#fff'}}>
            <HeaderComp />
            
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#efefef', marginHorizontal: 10, paddingHorizontal: 10, borderRadius: 10 }}>
                <FontAwesomeIcon icon={faSearch} style={{ marginRight: 10, marginLeft: 5 }} size={18} />
                <TextInput placeholder='Search in Friends' />
            </View>

            <ScrollView style={{  marginTop: 10 }}>

                <View >
                {
                    data.map((res,index) =>

                        <View style={[{ margin: 10,marginBottom:index===data.length-1?120:0 }]}>
                            <Card style={{ backgroundColor: '#fff' }}>
                                <Card.Content>
                                    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                                        <FontAwesomeIcon icon={faUserCircle} style={{ marginRight: 5, marginTop: 2 }} size={60} />
                                        <View style={{ flex: 1 }}>
                                            <Text variant="titleMedium">Name</Text>
                                            <Text style={{ color: "#888" }} numberOfLines={1}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam minima rerum nostrum velit, eum quibusdam! Ducimus nostrum minus beatae maxime.</Text>
                                            <Text style={{ color: "#888" }} numberOfLines={1}>10Posts • 12Friends</Text>
                                        </View>
                                    </View>
                                </Card.Content>
                            </Card>
                        </View>)
                }
                </View>
            </ScrollView>

        </View>
    )
}

export default FriendsScreen

const styles = StyleSheet.create({})
