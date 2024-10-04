import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';

const BuyAnythingPage = () => {
    const navigation = useNavigation();
    const [items, setItems] = useState([{ name: 'Brown Bread', quantity: 1, image: null }]);
    const [focusedItemIndex, setFocusedItemIndex] = useState<number | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const updateItemName = (index: number, newName: string) => {
        const newItems = [...items];
        newItems[index].name = newName;
        setItems(newItems);
    };

    const updateItemQuantity = (index: number, change: number) => {
        const newItems = [...items];
        newItems[index].quantity = Math.max(1, newItems[index].quantity + change);
        setItems(newItems);
    };

    const addItem = () => {
        setItems([...items, { name: '', quantity: 1, image: null }]);
    };

    const addPhoto = async (index: number) => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this app to access your photos!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const newItems = [...items];
            newItems[index].image = result.assets[0].uri;
            setItems(newItems);
        }
    };

    const openImageModal = (imageUri: string) => {
        setSelectedImage(imageUri);
        setModalVisible(true);
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <Text style={styles.headerTitle}>Buy Anything</Text>,
            headerShadowVisible: false,
        });
    }, [navigation]);
    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>Make a list of items you need</Text>

            <ScrollView style={styles.itemList}>
                {items.map((item, index) => (
                    <View key={index} style={[styles.itemContainer, index === focusedItemIndex && styles.focusedItem]}>
                        <View style={styles.itemTopRow}>
                            <TextInput
                                style={styles.itemInput}
                                value={`${item.name}`}
                                onChangeText={(text) => updateItemName(index, text)}
                                placeholder="Enter item name"
                                onFocus={() => setFocusedItemIndex(index)}
                                onBlur={() => setFocusedItemIndex(null)}
                            />
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity onPress={() => updateItemQuantity(index, -1)}>
                                    <Text style={styles.quantityButton}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.quantity}>{item.quantity}</Text>
                                <TouchableOpacity onPress={() => updateItemQuantity(index, 1)}>
                                    <Text style={styles.quantityButton}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ height: 1, backgroundColor: '#ccc', marginVertical: 6 }} />
                        {/* {index === focusedItemIndex && (
                            <TouchableOpacity style={styles.addPhotoButton} onPress={() => addPhoto(index)}>
                                <Ionicons name="camera-outline" size={20} color="purple" />
                                <Text style={styles.addPhotoText}>Add photo</Text>
                            </TouchableOpacity>
                        )} */}

                        {!item.image && (<TouchableOpacity style={styles.addPhotoButton} onPress={() => addPhoto(index)}>
                            <Ionicons name="camera-outline" size={20} color="purple" />
                            <Text style={styles.addPhotoText}>Add photo</Text>
                        </TouchableOpacity>)}

                        {item.image && (
                            <TouchableOpacity onPress={() => openImageModal(item.image)}>
                                <Image source={{ uri: item.image }} style={styles.itemImage} />
                            </TouchableOpacity>
                        )}
                    </View>
                ))}
                <TouchableOpacity style={styles.addItemButton} onPress={addItem}>
                    <Ionicons name="add-circle-outline" size={24} color="purple" />
                    <Text style={styles.addItemText}>Add item name</Text>
                </TouchableOpacity>
            </ScrollView>

            <Text style={styles.note}>Note: Purchases of alcohol, tobacco, and any items restricted or prohibited by Australian law are not allowed.</Text>

            <TouchableOpacity style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>Confirm Items</Text>
            </TouchableOpacity>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <View style={styles.closeButtonCircle}>
                            <Ionicons name="close" size={24} color="black" />
                        </View>
                    </TouchableOpacity>
                    {selectedImage && (
                        <Image
                            source={{ uri: selectedImage }}
                            style={styles.modalImage}
                            resizeMode="contain"
                        />
                    )}
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: -20,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
    },
    itemList: {
        flex: 1,
    },
    itemContainer: {
        flexDirection: 'column',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 5,
        padding: 10,
    },
    focusedItem: {
        borderColor: 'purple',
        borderWidth: 2,
    },
    itemTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemInput: {
        flex: 1,
        fontSize: 16,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        fontSize: 20,
        paddingHorizontal: 10,
        color: 'purple',
    },
    quantity: {
        fontSize: 16,
        paddingHorizontal: 10,
    },
    addItemButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    addItemText: {
        marginLeft: 10,
        color: 'purple',
    },
    note: {
        fontSize: 12,
        color: 'gray',
        marginVertical: 20,
        textAlign: 'center',
    },
    confirmButton: {
        backgroundColor: 'purple',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    addPhotoButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    addPhotoText: {
        color: 'purple',
        fontSize: 14,
        marginLeft: 6,
    },
    itemImage: {
        width: '100%',
        height: 50,
        maxWidth: 50,
        resizeMode: 'cover',
        marginTop: 10,
        borderRadius: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    modalImage: {
        width: '90%',
        height: '90%',
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 1,
    },
    closeButtonCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(200, 200, 200, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BuyAnythingPage;
