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
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8;
const CARD_HEIGHT = 450;

/**
 * TopLeft -> rotateX: 10 , rotateY: -10
 * TopRight -> rotateX: 10 , rotateY: 10
 * BottomLeft -> rotateX -10 , rotateY: 10
 * BottomLeft -> rotateX: -10 , rotateY: 10
 *
 */
const MIN_ROTATE = -10;
const MAX_ROTATE = 10;
const MIN_TRANSLATE_X = -100;
const MAX_TRANSLATE_X = 100;
const MIN_TRANSLATE_Y = -100;
const MAX_TRANSLATE_Y = 100;
const Card = () => {
  const rotateXValue = useSharedValue(0);
  const rotateYValue = useSharedValue(0);
  const translateXValue = useSharedValue(0);
  const translateYValue = useSharedValue(0);

  const panGestureEventHandler =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: (event) => {
        rotateXValue.value = withTiming(
          interpolate(
            event.y,
            [0, CARD_HEIGHT],
            [MAX_ROTATE, MIN_ROTATE],
            Extrapolate.CLAMP
          )
        );

        translateXValue.value = withTiming(
          interpolate(
            event.translationX,
            [MIN_TRANSLATE_X, MAX_TRANSLATE_X], //for range from min to max move horizontal -50 to 50
            [-50, 50],
            Extrapolate.CLAMP
          )
        );

        rotateYValue.value = withTiming(
          interpolate(
            event.x,
            [0, CARD_WIDTH],
            [MIN_ROTATE, MAX_ROTATE],
            Extrapolate.CLAMP
          )
        );

        translateYValue.value = withTiming(
          interpolate(
            event.translationY,
            [MIN_TRANSLATE_Y, MAX_TRANSLATE_Y],
            [-30, 30],
            Extrapolate.CLAMP
          )
        );
      },
      onActive: (event) => {
        rotateXValue.value = interpolate(
          event.y,
          [0, CARD_HEIGHT],
          [MAX_ROTATE, MIN_ROTATE],
          Extrapolate.CLAMP
        );

        translateXValue.value = interpolate(
          event.translationX,
          [MIN_TRANSLATE_X, MAX_TRANSLATE_X],
          [-50, 50],
          Extrapolate.CLAMP
        );

        rotateYValue.value = interpolate(
          event.x,
          [0, CARD_WIDTH],
          [MIN_ROTATE, MAX_ROTATE],
          Extrapolate.CLAMP
        );
        translateYValue.value = interpolate(
          event.translationY,
          [MIN_TRANSLATE_Y, MAX_TRANSLATE_Y],
          [-30, 30],
          Extrapolate.CLAMP
        );
      },
      onFinish: () => {
        rotateXValue.value = withSpring(0);
        rotateYValue.value = withSpring(0);
        translateXValue.value = withSpring(0);
        translateYValue.value = withSpring(0);
      },
    });

  const reanimatedCardContainerStyle = useAnimatedStyle(() => {
    const rotateX = `${rotateXValue.value}deg`;
    const rotateY = `${rotateYValue.value}deg`;
    return {
      transform: [
        {
          perspective: 400,
        },
        { rotateX },
        { rotateY },
      ],
    };
  });
  const reanimatedImageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          perspective: 400,
        },
        { translateX: translateXValue.value },
        { translateY: translateYValue.value },
      ],
    };
  });
  return (
    <PanGestureHandler onGestureEvent={panGestureEventHandler}>
      <Animated.View
        style={[styles.cardContainer, reanimatedCardContainerStyle]}
        // onLayout={({ nativeEvent }) => {
        //   console.log(nativeEvent);
        // }}
      >
        <Animated.Image
          source={require("../../assets/pizza-in-plate.png")}
          style={[styles.cardImage, reanimatedImageStyle]}
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
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FCFDF2",
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
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
    elevation: 5,
  },
  cardImage: {
    width: 300,
    height: 250,
    zIndex: 10000,
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
