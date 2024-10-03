// screens/BuyFromStoreScreen.tsx
import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, Text, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';

const BuyFromStoreScreen = () => {
    const navigation = useNavigation();
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerShadowVisible: false,
            // headerStyle: {
            //     elevation: 1, // Mild shadow for Android
            //     shadowOpacity: 1, // Mild shadow for iOS
            //     borderBottomWidth: 1, // Light horizontal rule
            //     borderBottomColor: '#ececec' // Color for the horizontal rule
            // },
        });
    }, [navigation]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.contentContainer}>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.header}>Shop Fast, Get It Faster</Text>
                    <Text style={styles.subHeader}>Tell Us What, We'll Get It!</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.textLabel}>Find your store and list items</Text>
                        <View style={styles.inputWrapper}>
                            {/* <Icon name="store" size={20} style={styles.inputIcon} /> */}
                            <Image source={require("../../assets/images/b1.png")} style={styles.inputIcon} />
                            <TextInput
                                placeholder="Select a store for items you need"
                                style={styles.input}
                            />
                        </View>
                        <View style={styles.inputWrapper}>
                            <Image source={require("../../assets/images/b2.png")} style={styles.inputIcon} />
                            <TextInput
                                placeholder="Add item name"
                                style={styles.input}
                            />
                        </View>
                    </View>

                    <Text style={styles.textLabel}>Delivery address</Text>

                    <View style={styles.inputWrapper}>
                        <Image source={require("../../assets/images/b3.png")} style={styles.inputIconSmaller} />
                        <TextInput
                            placeholder="Add drop location"
                            style={styles.input}
                        />
                    </View>

                    <Text style={styles.note}>
                        Note: Purchases of alcohol, tobacco, and any items restricted or prohibited by Australian law are not allowed.
                    </Text>
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Confirm Order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fcfcfc',
    },
    contentContainer: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        padding: 20,
    },
    buttonContainer: {
        padding: 20,
        backgroundColor: '#fcfcfc',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 10,

    },
    inputIcon: {
        // padding: 10,
        width: 20,
        height: 20,
        color: '#888',
        marginLeft: 10,
    },
    inputIconSmaller: {
        // padding: 10,
        width: 17,
        height: 20,
        color: '#888',
        marginLeft: 10,
    },
    textLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 26,
        marginBottom: 20,
        color: '#000000',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fcfcfc',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#8123AD',
    },
    subHeader: {
        fontSize: 16,
        marginBottom: 20,
        marginTop: -2,
        color: '#777777',
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        flex: 1,
        padding: 10,
        borderWidth: 0, // Remove border as it's now on the wrapper
        color: '#000',
    },
    note: {
        fontSize: 11.2,
        color: '#666',
        // marginBottom: 20,
        marginTop: 60,
    },
    button: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#1CA672',
    },
    buttonText: {
        color: '#6e6e6e',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500', // Reduced boldness from 'bold' to '600'
    },
});

export default BuyFromStoreScreen;