import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from 'expo-router';
import { Modal } from 'react-native';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("Plenty Rd, Bundoora VIC 30...");
  const navigation = useNavigation();

  const handleAddressSelect = (address: string) => {
    setSelectedAddress(address);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* -------------header ------------- */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require("../../assets/images/1.png")}
              style={styles.icon1}
              resizeMode="contain"
            />
            <View style={{ flexDirection: 'column' }}>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.headerText}>Home</Text>
                  <Ionicons name="caret-down" size={20} color="black" />
                </View>
              </TouchableOpacity>
              <Text style={{ fontSize: 12, color: 'gray', marginLeft: 10 }}>{selectedAddress}</Text>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Ionicons name="close" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>Select Address</Text>
                    <ScrollView style={styles.addressList}>
                      <AddressItem
                        icon="home-outline"
                        address="123 Main St, Cityville, State 12345"
                        onSelect={handleAddressSelect}
                      />
                      <AddressItem
                        icon="business-outline"
                        address="456 Office Ave, Worktown, State 67890"
                        onSelect={handleAddressSelect}
                      />
                      <AddressItem
                        icon="location-outline"
                        address="789 Park Rd, Greenville, State 13579"
                        onSelect={handleAddressSelect}
                      />
                      {/* Add more addresses as needed */}
                    </ScrollView>
                    <TouchableOpacity style={styles.addAddressButton}>
                      <Ionicons name="add-circle-outline" size={24} color="#fff" />
                      <Text style={styles.addAddressText}>Add New Address</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('profile' as never)}>
            <View style={styles.headerRight}>
              <Ionicons name="person-outline" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        {/* -------------cashback img ------------- */}
        <View style={styles.cashbackContainer}>
          <Image
            source={require("../../assets/images/2.png")}
            style={styles.cardImage}
            resizeMode="contain"
          />
        </View>
        {/* -------------product grids------------- */}
        <View style={styles.productGrid}>
          <ProductBox
            title="SEND A PACKAGE"
            subtitle="Hassle-Free"
            src={require("../../assets/images/3.png")}
          />
          <ProductBox
            title="BUY FROM STORE"
            subtitle="Easy Shop"
            src={require("../../assets/images/4.png")}
            redirect='buyFromStoreScreen'
          />
          <ProductBox
            title="CAR TOWING"
            subtitle="Fast Tow"
            src={require("../../assets/images/5.png")}
          />
          <ProductBox
            title="HOME MOVING"
            subtitle="Swift Shifting"
            src={require("../../assets/images/6.png")}
          />
        </View>
        {/* -------------lower cashback img ------------- */}
        <View style={styles.lowerImageContainer}>
          <Image
            source={require("../../assets/images/lower.png")}
            style={styles.cardImage}
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const ProductBox = ({ title, subtitle, borderColor = '#ffffff', src, redirect }: {
  title: string,
  subtitle: string,
  borderColor?: string,
  src: any,
  redirect?: string
}) => {
  const navigation = useNavigation();
  const router = useRouter();
  return (
    <TouchableOpacity style={[styles.productBox, { borderColor: borderColor }]}
      onPress={() => redirect && router.push(`./screens/${redirect}`)}
    >
      <View>
        <View style={styles.textContainer}>
          <Text style={styles.productTitle}>{title}</Text>
          <Text style={styles.productSubtitle}>{subtitle}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={src} style={styles.productImage}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
};

const AddressItem = ({ icon, address, onSelect }) => (
  <TouchableOpacity style={styles.addressItem} onPress={() => onSelect(address)}>
    <Ionicons name={icon} size={24} color="#333" style={styles.addressIcon} />
    <Text style={styles.addressText}>{address}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  icon1: {
    width: 20,
    height: 25,
    resizeMode: "contain",
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: "#ffffff",
  // },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingBottom: 20, // Add some padding at the bottom
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#fff",
    marginTop: 25,
    paddingBottom: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerText: {
    marginLeft: 10,
    fontSize: 20,
    color: "purple",
    fontWeight: "bold",
  },
  serviceText: {
    fontSize: 10,
    color: "black",
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardSubtitle: {
    fontSize: 16,
    color: "#666",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  serviceContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 10,
  },
  serviceBox: {
    backgroundColor: "#fff",
    width: "45%",
    padding: 20,
    margin: 10,
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cashbackContainer: {
    height: 150,
    marginHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1, borderColor: 'red',
    backgroundColor: '#f8f8f8',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f7f7f7',
    marginTop: -5,
  },
  productBox: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'transparent', // Make border transparent
    shadowColor: '#000', // Add shadow color
    shadowOffset: { width: 0, height: 2 }, // Set shadow offset
    shadowOpacity: 0.1, // Set shadow opacity
    shadowRadius: 8, // Set shadow radius
    elevation: 5, // Set elevation for Android
  },
  textContainer: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: 'flex-end',
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  productSubtitle: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  productImage: {
    width: 100,
    height: 100,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addressList: {
    maxHeight: 200,
    overflow: 'scroll',
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  addressIcon: {
    marginRight: 10,
  },
  addAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  addAddressText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20, // Add some padding at the bottom
  },
  lowerImageContainer: {
    // marginTop: 15,
    // marginHorizontal: 10,
    height: 150,
    // marginHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    marginTop: -10,
  },

  lowerImage: {
    width: '100%',
    height: '100%', // Adjust this value as needed
    borderRadius: 10,
    marginTop: -10,
  },
});