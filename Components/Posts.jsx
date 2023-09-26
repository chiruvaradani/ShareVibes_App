import { Dimensions, Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Modal, Portal, Text } from "react-native-paper";
import { data } from "../data";
import { useState } from "react";
import { faEllipsisV, faHeart, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faComment, faPaperPlane } from "@fortawesome/free-regular-svg-icons";

const numColumns = 3; // Number of columns in the grid

const Posts = () => {

    const [showModal, setShowModal] = useState(false)
    const [selectedImage, setSelectedImage] = useState([]);

    console.log(selectedImage);

    return (
        <View style={{ position: 'relative' }}>
            <View style={{ flexDirection: "row", position: 'absolute', top: 12, paddingHorizontal: 10 }}>
                <View style={{ flex: 1, borderWidth: 1, borderColor: '#ccc' }}>
                </View>
            </View>
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <Pressable style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', marginLeft: '40%' }}>
                    <Text variant="bodyLarge" style={{ paddingHorizontal: 20, color: "#888" }}>POSTS</Text>
                </Pressable>

            </View>
            <ScrollView >
                <View style={styles.container}>
                    {data.map((res, index) => (
                        //Important Part to Learn Grids
                        <>
                            <Pressable onLongPress={() => { setShowModal(true); setSelectedImage(res) }} onPressOut={() => { setShowModal(false); setSelectedImage([]) }} >
                                <Image
                                    width={(Dimensions.get('window').width - (10 * 2) - (10 * (numColumns - 1))) / numColumns}
                                    key={index}
                                    height={Dimensions.get('window').width / numColumns}
                                    source={{ uri: res.image }}
                                    style={{ padding: 10, marginRight: index % numColumns === numColumns - 1 ? 0 : 10, marginBottom: index % numColumns === numColumns - 1 ? 0 : 10 }}
                                />
                            </Pressable>
                            {
                                selectedImage &&
                                <Portal>
                                <Modal visible={showModal} contentContainerStyle={{ backgroundColor: 'white', margin: 30, borderRadius: 15, paddingVertical: 20 }}>
                                    <View>
                                        <>
                                            <Card.Content>
                                                <View style={{ flexDirection: 'row', overflow: 'hidden', alignItems: 'center', gap: 5 }}>
                                                    <FontAwesomeIcon icon={faUserCircle} style={{ marginRight: 5, marginTop: 2 }} size={40} />
                                                    <View style={{ flex: 1 }}>
                                                        <Text variant="titleMedium">name</Text>
                                                        <Text variant="labelSmall">time</Text>
                                                    </View>
                                                </View>
                                                {
                                                    selectedImage.image &&
                                                    <View >
                                                    <Card.Cover resizeMode='contain' style={{ backgroundColor: '#fff', marginVertical: 10 }} source={{ uri: selectedImage?.image }} />
                                                </View>
                                                }
                                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                                    <FontAwesomeIcon icon={faHeart} color="red"/>
                                                    <Text> 100  •  </Text>
                                                    <FontAwesomeIcon icon={faComment} color="#000"/>
                                                    <Text> 10  •   </Text>
                                                    <FontAwesomeIcon icon={faPaperPlane} color="#000"/>
                                                    <Text> 0 </Text>
                                                </View>

                                            </Card.Content>
                                        </>
                                    </View>
                                </Modal>
                            </Portal>
                            }
                        </>

                    ))}
                </View>
            </ScrollView>
        </View>

    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10, 

    },
})

export default Posts
