import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <ScrollView
      style={styles.container}
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
          <Text style={styles.headerText}>Home</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('profile' as never)}>
          <View style={styles.headerRight}>
            <Ionicons name="person-outline" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      {/* -------------cashback img ------------- */}
      <Image
        source={require("../../assets/images/2.png")}
        style={styles.cardImage}
        resizeMode="cover"
      />
      {/* -------------product grids------------- */}
      <View style={styles.productGrid}>
        <ProductBox
          title="SEND A PACKAGE"
          subtitle="Hassle-Free"
          borderColor="#3498db"
          src={require("../../assets/images/3.png")}
        />
        <ProductBox
          title="BUY FROM STORE"
          subtitle="Easy Shop"
          borderColor="#95a5a6"
          src={require("../../assets/images/4.png")}
          redirect='buyFromStoreScreen'
        />
        <ProductBox
          title="CAR TOWING"
          subtitle="Fast Tow"
          borderColor="#e67e22"
          src={require("../../assets/images/5.png")}
        />
        <ProductBox
          title="HOME MOVING"
          subtitle="Swift Shifting"
          borderColor="#9b59b6"
          src={require("../../assets/images/6.png")}
        />
      </View>
      {/* -------------cashback img ------------- */}
      <Image
        source={require("../../assets/images/lower.png")}
        style={styles.cardImage}
        resizeMode="cover"
      />
    </ScrollView>
  );
}

const ProductBox = ({ title, subtitle, borderColor, src, redirect }: {
  title: string,
  subtitle: string,
  borderColor: string,
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
    borderWidth: 1,
    borderColor: "yellow",
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
  cardImage: {
    borderRadius: 10,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f7f7f7',
  },
  productBox: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#3498db',
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
});
