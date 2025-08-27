import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { slideTypes } from "../types/slide.types";

interface OnboardingProps {
  item: slideTypes;
}

export default function OnboardingItem({ item }: OnboardingProps) {
  const { width } = useWindowDimensions();
  
  return (
    <View style={[styles.container, { width }]}>
      <Text style={styles.title}>{item.title}</Text>
      <Image
        source={item.image}
        style={[styles.image, { width }]}
        resizeMode="contain"
      />
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 0.5,
    marginTop: 15,
  },
  title: {
    fontFamily: "Montserrat-Bold",
    fontSize: 20,
    textAlign: "center",
    paddingHorizontal: 50,
    marginTop: -80,
  },
  description: {
    fontFamily: "Montserrat-SemiBold",
    textAlign: "center",
    paddingHorizontal: 30,
    marginTop: 15,
    lineHeight: 22,
  },
});
