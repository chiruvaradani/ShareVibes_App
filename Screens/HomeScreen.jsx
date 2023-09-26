import { Image, ScrollView, TouchableOpacity, Modal, TextInput, Dimensions, Animated, ImageBackground } from 'react-native';
import { StyleSheet, View } from 'react-native'
import { Avatar, Button, Card, Text } from 'react-native-paper';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useEffect, useState } from 'react';
import { faClose, faEllipsisV, faHeart, faSearch, faShare, faThumbsUp, faUserCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as thumbs, faHeart as heart, faComment as comment, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { Pressable } from 'react-native';
import { data } from '../data';
import HeaderComp from '../Components/HeaderComp';

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
const RightContent = (props) => <FontAwesomeIcon icon={faEllipsisV} style={{ marginRight: 20 }} size={20} />;

const HomeScreen = () => {


    const [isLiked, setIsLiked] = useState(false)
    const AnimatedImage = Animated.createAnimatedComponent(Image)

    const ImageScale = new Animated.Value(0)
    const MoveY = new Animated.Value(0)

    //Bouncing Heart Animation...
    useEffect(() => {
        if (isLiked === true) {
            Animated.spring(MoveY, {
                toValue: -150,
                // duration:500,
                useNativeDriver: true
            }).start()
            Animated.spring(ImageScale, {
                toValue: 2,
                friction: 2,
                useNativeDriver: true
            }).start(() => {
                Animated.spring(ImageScale, {
                    toValue: 0,
                    friction: 10,
                    useNativeDriver: true
                }).start()
            })
        }
    }, [isLiked])


    //For Hiding Navbar on Scroll Up
    const scrollY = new Animated.Value(0)
    const diffClamp = Animated.diffClamp(scrollY, 0, 60)
    const translateY = diffClamp.interpolate({
        inputRange: [0, 60],
        outputRange: [0, -60]
    })



    const [selected, setSelected] = useState(0)
    const [showHeart, setShowHeart] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [dynamicData, setDynamicData] = useState(null);
    const [text, setText] = useState('');
    const [numberOfLines, setNumberOfLines] = useState(1);

    const closeModal = () => {
        setModalVisible(false);
    };

    //Sending the Dynamic Data to Modal
    const openModalWithDynamicData = (data) => {
        setDynamicData(data);
        setModalVisible(true);
    }

    const handleTextChange = (newText) => {
        setText(newText);
        // Calculate the number of lines based on the content
        const lines = newText.split(/\r?\n/).length;
        console.log(lines);
        // Set the number of lines to a maximum of 4
        setNumberOfLines(Math.min(lines, 4));
    };

    const handleHeart = () => {
        setShowHeart(true)
        setTimeout(() => {
            setShowHeart(false)
        }, 1000);
    }

    return (
        <View style={{ backgroundColor: '#fff' }}>
            <Animated.View
                style={{ transform: [{ translateY: translateY }], elevation: 4, zIndex: 100 }}>
                <HeaderComp application={'true'} />
            </Animated.View>


            <AnimatedImage source={require('../assets/1580997889beautiful-3d-heart-png-image.png')} resizeMode='contain'
                style={{
                    height: 50, width: 50, position: 'absolute',
                    bottom: "40%",
                    left: '45%',
                    zIndex: 1,
                    transform: [
                        { scale: ImageScale },
                        // {translateY:MoveY}
                    ]
                }} />

            <ScrollView onScroll={(e) => scrollY.setValue(e.nativeEvent.contentOffset.y)} >
                <View style={{ paddingHorizontal: 10, position: 'relative' }}>
                    <Text></Text>
                    <Text></Text>
                    <Text></Text>
                    {
                        data.map((res, index) =>
                            <View key={index} style={{ marginVertical: 10, }}>

                                <Card style={{ backgroundColor: '#fff' }}>

                                    <Card.Content>
                                        <View style={{ flexDirection: 'row', overflow: 'hidden', borderRadius: 50, alignItems: 'center', gap: 5 }}>
                                            <FontAwesomeIcon icon={faUserCircle} style={{ marginRight: 5, marginTop: 2 }} size={40} />
                                            <View style={{ flex: 1 }}>
                                                <Text variant="titleMedium">{res.name}</Text>
                                                <Text variant="labelSmall">{res.time}</Text>
                                            </View>
                                            <View style={{ justifyContent: 'flex-end' }}>
                                                <FontAwesomeIcon icon={faEllipsisV} size={20} />
                                            </View>
                                        </View>
                                    </Card.Content>

                                    <Card.Content style={{borderRadius:20}}>
                                        <Text variant="labelLarge" style={{ marginVertical: 10 }}>{res.caption}</Text>
                                        <ImageBackground source={{uri:res.image}} blurRadius={20} style={{borderRadius:20}}>
                                        <View style={{ width: "100%", height: 300, position: 'relative', borderRadius:20 }}>
                                            <Image source={{ uri: res.image }} style={{ height: 300, width: '100%', paddingVertical: 2 }} resizeMode='contain' />

                                        </View>
                                        </ImageBackground>
                                    </Card.Content>



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
                                        <Text variant="labelLarge" >{res.NoOfLikes} Likes</Text>
                                        <View style={{ flexDirection: 'row', overflow: 'hidden', borderRadius: 50, alignItems: 'center' }}>
                                            <FontAwesomeIcon icon={faUserCircle} style={{ marginRight: 5, marginTop: 2 }} size={20} />
                                            <Text variant="labelSmall">{res.LikedBy} others this Post</Text>
                                        </View>
                                        <Text variant="labelSmall">View 8 comments</Text>
                                    </Card.Content>

                                </Card>
                                {
                                    index === 0 &&
                                    <View>
                                        <Text variant='labelLarge' style={{ marginTop: 10 }}>Suggestions</Text>
                                        <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                                            <View style={{ marginTop: 10, flexDirection: 'row', gap: 10, }}>
                                                {
                                                    data.map((res, i) =>
                                                        <Card key={i} style={{ marginVertical: 10, paddingHorizontal: 10 }}>
                                                            <Card.Content>

                                                                {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}> */}
                                                                <View style={{ marginTop: 10, gap: 5, }}>
                                                                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                                                        <View style={{ flex: 1 }}>
                                                                            <FontAwesomeIcon icon={faUserCircle} size={100} style={{ marginRight: 20 }} />
                                                                        </View>
                                                                        <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                                                                            <Text variant='headlineSmall' style={{}}>User1</Text>
                                                                            <Pressable style={{ backgroundColor: '#86E2FF', paddingHorizontal: 20, paddingVertical: 4, borderRadius: 10, marginTop: 4 }}>
                                                                                <View style={{ flexDirection: 'row', alignItems: "center", gap: 5 }}>
                                                                                    <FontAwesomeIcon icon={faUserPlus} />
                                                                                    <Text>Add</Text>
                                                                                </View>
                                                                            </Pressable>
                                                                        </View>

                                                                    </View>
                                                                </View>
                                                                {/* </ScrollView> */}
                                                            </Card.Content>
                                                        </Card>
                                                    )
                                                }
                                            </View>
                                        </ScrollView>
                                    </View>
                                }
                            </View>
                        )
                    }
                </View>




            </ScrollView>
            <>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                    >
                        <TouchableOpacity style={styles.modalContainer} activeOpacity={1} >
                            <View style={styles.modalView}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text variant='titleMedium' style={{ fontSize: 20, fontWeight: '700' }}>Comments</Text>
                                    <Pressable onPress={() => setModalVisible(false)}>
                                        <FontAwesomeIcon icon={faClose} size={20} color='red' />
                                    </Pressable>
                                </View>
                                <Text style={{ height: 1, borderWidth: 1, borderColor: "#ccc", marginVertical: 15 }} />
                                <ScrollView style={{ height: 400 }} showsVerticalScrollIndicator={false}>
                                    {
                                        data.map((res, i) =>
                                            <ScrollView key={i}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                                    <View>
                                                        <Image source={{ uri: 'https://th.bing.com/th/id/OIP.Gfp0lwE6h7139625a-r3aAHaHa?pid=ImgDet&rs=1' }} style={{ height: 50, width: 50 }} />
                                                    </View>
                                                    <View style={{ flex: 1 }}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <Text variant='labelLarge'>{res.name}  • </Text>
                                                            <Text variant='bodySmall'>1min ago</Text>
                                                        </View>
                                                        <Text variant='labelSmall'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus itaque odio ipsa magnam numquam laborum quibusdam consequuntur nobis at nihil!</Text>
                                                    </View>
                                                </View>
                                                <Text style={{ height: 1, borderWidth: 1, borderColor: "#ccc", marginVertical: 15 }} />

                                            </ScrollView>
                                        )
                                    }
                                </ScrollView>
                                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#efefef', paddingHorizontal: 10, borderRadius: 10, justifyContent: 'space-between' }}>
                                    <TextInput placeholder='Add a new Comment'
                                        onChangeText={handleTextChange} multiline={true} style={{ flex: 1 }} />
                                    <FontAwesomeIcon icon={faPaperPlane} style={{ marginRight: 10, marginLeft: 5, flex: 1 }} size={18} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                </View>
            </>
        </View>
    )
}



export default HomeScreen

const styles = StyleSheet.create({
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start', // This will align the action buttons to the left
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end', // Align items at the bottom
    },
    modalContainer: {
        // height: 500,
        flex: 1,
        justifyContent: 'flex-end', // Align items at the bottom
        backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
    },
    modalView: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        width: "100%",
        // height: "80%",
    },
})
