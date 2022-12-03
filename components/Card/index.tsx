// Image source : https://www.pngfind.com/download/iiwJxoR_transparent-pizza-plate-png-salami-pizza-png-png/
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8;

const Card = () => {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={require("../../assets/pizza-in-plate.png")}
        style={styles.cardImage}
        resizeMode="contain"
      />
      <View style={{ alignItems: "center" }}>
        <Text style={styles.cartTitleText}>CHICKEN Pizza</Text>
        <Text style={styles.cardSubtitle}>
          A classic American taste! Relish the delectable flavor of Chicken
          Pepperoni, topped with extra cheese.
        </Text>
      </View>
      <View style={styles.cardFooter}>
        <View>
          <View style={styles.totalPrice}>
            <Text style={styles.priceText}>Total Price</Text>
            <MaterialIcons
              name="verified"
              style={{ marginLeft: 5 }}
              size={15}
              color="#1DA1F2"
            />
          </View>
          <Text style={styles.priceText}>$ 10.0</Text>
        </View>
        <View>
          <Pressable style={styles.addToCartCTA}>
            <Text style={styles.addToCartCTAText}>Add To Cart</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FCFDF2",
    width: CARD_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
    paddingBottom: 25,
    borderRadius: 25,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowColor: "#000",
    //android
    elevation: 10,
  },
  cardImage: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
  },
  cartTitleText: {
    fontSize: 33,
    fontWeight: "800",
    letterSpacing: 1.5,
    textTransform: "capitalize",
    marginBottom: 12,
    marginTop: -15,
  },
  cardSubtitle: {
    fontSize: 16,
    fontWeight: "300",
  },
  cardFooter: {
    width: "100%",
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addToCartCTA: {
    backgroundColor: "#222222",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addToCartCTAText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  priceText: {
    fontSize: 15,
    fontWeight: "600",
  },
  totalPrice: {
    flexDirection: "row",
    alignItems: "center",
  },
});
