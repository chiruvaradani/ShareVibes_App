import { Pressable, StyleSheet,  View } from 'react-native'
import React from 'react'
import { Card, Text } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsisV, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const PostCard = ({ data }) => {
    return (
        <Card style={{ backgroundColor: '#fff' }}>

            <Card.Content>
                <View style={{ flexDirection: 'row', overflow: 'hidden', borderRadius: 50, alignItems: 'center', gap: 5 }}>
                    <FontAwesomeIcon icon={faUserCircle} style={{ marginRight: 5, marginTop: 2 }} size={40} />
                    <View style={{ flex: 1 }}>
                        <Text variant="titleMedium">{data.name}</Text>
                        <Text variant="labelSmall">{data.time}</Text>
                    </View>
                    <View style={{ justifyContent: 'flex-end' }}>
                        <FontAwesomeIcon icon={faEllipsisV} size={20} />
                    </View>
                </View>
            </Card.Content>

            <Card.Content>
                <Text variant="labelLarge" style={{ marginVertical: 10 }}>{data.caption}</Text>
            </Card.Content>

            <View >
                <Card.Cover resizeMode='contain' style={{ paddingHorizontal: 10, backgroundColor: '#fff' }} source={{ uri: data.image }} />
            </View>


            <Card.Actions style={styles.actionsContainer}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', gap: 10 }}>
                    {
                        isLiked && selected === index ?
                            <Pressable onPress={() => { setIsLiked(true); setSelected(index) }}>
                                <FontAwesomeIcon icon={faHeart} size={20} style={{ color: 'red', borderWidth: 1, borderColor: "#000" }} />
                            </Pressable> :
                            <Pressable onPress={() => { setIsLiked(!isLiked); setSelected(index) }}>
                                <FontAwesomeIcon icon={heart} size={20} />
                            </Pressable>
                    }
                    <Pressable onPress={() => openModalWithDynamicData(index === 1 ? 'Data from 1' : 'Other Data')}>
                        <FontAwesomeIcon icon={comment} size={20} />
                    </Pressable>
                    <Pressable onPress={() => setSelected(index)}>
                        <FontAwesomeIcon icon={faPaperPlane} size={20} />
                    </Pressable>
                </View>
            </Card.Actions>
            <Card.Content>
                <Text variant="labelLarge" >{data.NoOfLikes} Likes</Text>
                <View style={{ flexDirection: 'row', overflow: 'hidden', borderRadius: 50, alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faUserCircle} style={{ marginRight: 5, marginTop: 2 }} size={20} />
                    <Text variant="labelSmall">{data.LikedBy} others this Post</Text>
                </View>
                <Text variant="labelSmall">View all 8 comments</Text>
            </Card.Content>

        </Card>
    )
}

export default PostCard

const styles = StyleSheet.create({})
