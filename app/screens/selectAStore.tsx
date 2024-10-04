import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import { router } from 'expo-router';
const stores = [
    {
        id: "1",
        name: "Super mart",
        address: "Bridge Street, Sydney 2000, Australia",
        distance: "4.2 kms",
    },
    {
        id: "2",
        name: "The daily shop",
        address: "Bridge Street, Sydney 2000, Australia",
        distance: "4.2 kms",
    },
    {
        id: "3",
        name: "City centre market",
        address: "Bridge Street, Sydney 2000, Australia",
        distance: "4.2 kms",
    },
    {
        id: "4",
        name: "Fresh Foods Co.",
        address: "Market Road, Sydney 2000, Australia",
        distance: "3.5 kms",
    },
    {
        id: "5",
        name: "Organic Essentials",
        address: "Garden Avenue, Sydney 2000, Australia",
        distance: "5.1 kms",
    },
    {
        id: "6",
        name: "Quick Stop Groceries",
        address: "High Street, Sydney 2000, Australia",
        distance: "2.8 kms",
    },
    {
        id: "7",
        name: "Green mart",
        address: "Bridge Street, Sydney 2000, Australia",
        distance: "2.8 kms",
    },
    {
        id: "8",
        name: "Green valley grocers",
        address: "Bridge Street, Sydney 2000, Australia",
        distance: "2.8 kms",
    },
    {
        id: "9",
        name: "Greenfield goods",
        address: "Bridge Street, Sydney 2000, Australia",
        distance: "2.8 kms",
    },
];

const SelectAStore = () => {
    const navigation = useNavigation();
    const [isLateNight, setIsLateNight] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [filteredStores, setFilteredStores] = useState(stores);

    useEffect(() => {
        const currentHour = new Date().getHours();
        setIsLateNight(currentHour >= 18 || currentHour <= 6);
    }, []);

    useEffect(() => {
        const filtered = stores.filter(store =>
            store.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredStores(filtered);
    }, [searchText]);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <Text style={styles.headerTitle}>Select a Store</Text>,
            headerShadowVisible: false,
        });
    }, [navigation]);

    const buttonStyle = searchText.length === 0
        ? [styles.confirmButton, styles.confirmButtonEmpty]
        : styles.confirmButton;

    const buttonTextStyle = searchText.length === 0
        ? [styles.confirmButtonText, styles.confirmButtonTextEmpty]
        : styles.confirmButtonText;

    const handleStoreSelect = (store: any) => {
        router.push({
            pathname: "./storeLocationMap",
            params: { store: JSON.stringify(store) }
        });
    };

    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: "#f4f4f4", marginLeft: -10, marginRight: -10 }}>
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for nearby stores"
                        placeholderTextColor="gray"
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                </View>

                {searchText.length <= 0 ? <TouchableOpacity style={styles.mapOption}>
                    <Ionicons name="map-outline" size={24} color="purple" />
                    <Text style={styles.mapOptionText}>Select from map</Text>
                    <Ionicons name="chevron-forward" size={24} color="gray" />
                </TouchableOpacity> : null}
            </View>

            <Text style={styles.sectionTitle}>Order again from</Text>

            <FlatList
                data={filteredStores}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleStoreSelect(item)}>
                        <View style={styles.storeItem}>
                            <Image
                                source={require("../../assets/images/storelogo.png")}
                                style={{ width: 20, height: 20 }}
                            />
                            <View style={styles.storeInfo}>
                                <Text style={styles.storeName}>{item.name}</Text>
                                <Text style={styles.storeAddress}>
                                    {item.address} | {item.distance}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.divider} />
                    </TouchableOpacity>
                )}
            />

            {isLateNight && (
                <View style={styles.noteContainer}>
                    <Ionicons name="moon-outline" size={20} color="purple" />
                    <Text style={styles.noteText}>
                        Since you're ordering late at night, please call the store to check if it's open or
                        closed.
                    </Text>
                </View>
            )}

            <TouchableOpacity style={buttonStyle} disabled={searchText.length === 0}>
                <Text style={buttonTextStyle}>Confirm Store Location</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 16,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: -20,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "lightgray",
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 24,
        backgroundColor: "white",
        marginLeft: 5,
        marginRight: 5,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: 40,
    },
    mapOption: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 26,
        // marginTop: 16,
        backgroundColor: "white",
        padding: 12,
        marginLeft: 5,
        marginRight: 5,
    },
    mapOptionText: {
        flex: 1,
        marginLeft: 8,
        color: "purple",
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 20,
        marginTop: 20,
    },
    storeItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        marginTop: 16,
    },
    storeInfo: {
        flex: 1,
        marginLeft: 16,
    },
    storeName: {
        fontWeight: "bold",
    },
    storeAddress: {
        color: "gray",
        fontSize: 11,
    },
    storeDistance: {
        color: "gray",
    },
    noteContainer: {
        flexDirection: "row",
        backgroundColor: "lavender",
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
    },
    noteText: {
        flex: 1,
        marginLeft: 8,
        color: "purple",
    },
    confirmButton: {
        backgroundColor: "purple",
        borderRadius: 8,
        padding: 16,
        alignItems: "center",
    },
    confirmButtonEmpty: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "purple",
    },
    confirmButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    confirmButtonTextEmpty: {
        color: "#1D1D1D",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    modalContent: {
        backgroundColor: "white",
        borderRadius: 8,
        padding: 16,
        width: "80%",
        maxHeight: "80%",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 16,
    },
    locationItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "lightgray",
    },
    closeButton: {
        marginTop: 16,
        backgroundColor: "purple",
        borderRadius: 8,
        padding: 12,
        alignItems: "center",
    },
    closeButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    divider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 8,
    },
});

export default SelectAStore;
