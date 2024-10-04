import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { router, useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

const MapSelector = () => {
    const params = useLocalSearchParams();
    const [selectedLocation, setSelectedLocation] = useState(null);
    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            // headerTitle: "Add drop location",
            headerTitle: () => <Text style={styles.headerTitle}>Add drop location</Text>,
            headerShadowVisible: false,
        });
    }, [navigation]);

    const initialLocation = params.initialLocation
        ? JSON.parse(params.initialLocation)
        : { latitude: 37.78825, longitude: -122.4324 };
    const handleMapPress = (event) => {
        const { coordinate } = event.nativeEvent;
        setSelectedLocation(coordinate);
    };

    const handleConfirm = () => {
        if (selectedLocation) {
            router.back();
            router.setParams({ selectedLocation: JSON.stringify(selectedLocation) });
        }
    };





    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    ...initialLocation,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={handleMapPress}
            >
                {selectedLocation && (
                    <Marker coordinate={selectedLocation} />
                )}
            </MapView>
            <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirm}
                disabled={!selectedLocation}
            >
                <Text style={styles.confirmButtonText}>Confirm Location</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: -20,
    },
    map: {
        flex: 1,
    },
    confirmButton: {
        backgroundColor: 'purple',
        padding: 16,
        margin: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default MapSelector;