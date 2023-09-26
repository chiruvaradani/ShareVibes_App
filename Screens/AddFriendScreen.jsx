 import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import HeaderComp from '../Components/HeaderComp'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEllipsisV, faSearch, faUserCircle, faUserFriends, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Card } from 'react-native-paper'
import { data } from '../data'

const AddFriendsScreen = () => {
    return (
        <View>
            <HeaderComp />

            <View style={{ flexDirection: 'row',  alignItems: 'center', backgroundColor: '#efefef', marginHorizontal:10,paddingHorizontal: 10, borderRadius: 10 }}>
                        <FontAwesomeIcon icon={faSearch} style={{ marginRight: 10, marginLeft: 5 }} size={18} />
                        <TextInput placeholder='Search Users' />
                    </View>

            <ScrollView style={{ marginTop:10}}>
                
                {
                    data.map((res,index) =>

                        <View style={{ margin: 10,marginBottom:index===data.length-1?120:0,backgroundColor:'#fff'  }}>
                            <Card style={{ backgroundColor: '#fff' }}>
                                <Card.Content>
                                    <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                                        <FontAwesomeIcon icon={faUserCircle} style={{ marginRight: 5, marginTop: 2 }} size={40} />
                                        <View style={{ flex: 1 }}>
                                            <Text variant="titleMedium">Name</Text>
                                            <Text variant="labelSmall" numberOfLines={2}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam minima rerum nostrum velit, eum quibusdam! Ducimus nostrum minus beatae maxime.</Text>
                                        </View>
                                        <View style={{ marginRight: 10 }}>
                                            <Pressable style={{ backgroundColor: 'skyblue', paddingHorizontal: 20, paddingVertical: 4, borderRadius: 10, marginTop: 4 }}>
                                                <View style={{flexDirection:'row', alignItems:"center", gap:5}}>
                                                <FontAwesomeIcon icon={faUserPlus}/>
                                                <Text>Add</Text>
                                                </View>
                                            </Pressable>
                                        </View>
                                    </View>
                                </Card.Content>
                            </Card>
                        </View>)
                }
            </ScrollView>

        </View>
    )
}

export default AddFriendsScreen

const styles = StyleSheet.create({})
