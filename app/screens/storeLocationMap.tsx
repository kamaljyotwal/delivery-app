import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from 'expo-router';
import { Image } from 'react-native';

const StoreLocationMap = ({ route }) => {
    const params = useLocalSearchParams();
    const store = JSON.parse(params.store as string);
    const navigation = useNavigation();
    console.log(store)
    // Dummy coordinates for demonstration
    const initialRegion = {
        latitude: -33.8688,
        longitude: 151.2093,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <Text style={styles.headerTitle}>Confirm store location</Text>,
            headerShadowVisible: false,
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={initialRegion}
            >
                <Marker
                    coordinate={initialRegion}
                    title={store.name}
                    description={store.address}
                />
            </MapView>
            <View style={styles.storeInfo}>

                <View style={styles.storeDetails}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                        <Image source={require("../../assets/images/shoplogomap.png")} style={styles.inputIcon} />
                        <Text style={styles.storeName}>{store.name}</Text>
                    </View>
                    <Text style={styles.storeAddress}>{store.address}</Text>
                </View>
                <TouchableOpacity style={styles.changeButton}>
                    <Text style={styles.changeButtonText}>Change</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.selectButton}>
                <Text style={styles.selectButtonText}>Select This Store</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    inputIcon: {
        width: 20,
        height: 20,

    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: -20,
    },
    map: {
        flex: 1,
    },
    storeInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
    },
    storeDetails: {
        flex: 1,
    },
    storeName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    storeAddress: {
        fontSize: 14,
        color: 'gray',
    },
    changeButton: {
        padding: 8,
        marginTop: -26,
    },
    changeButtonText: {
        color: 'purple',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        fontSize: 12,
    },
    selectButton: {
        backgroundColor: 'purple',
        padding: 16,
        margin: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    selectButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default StoreLocationMap;