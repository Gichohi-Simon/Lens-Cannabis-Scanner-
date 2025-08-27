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
        style={[styles.image ,{ width:width * 0.6, height:300}]}
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
    // flex: 0.5,
    marginTop: 15,
  },
  title: {
    fontFamily: "Mulish-Bold",
    fontSize: 28,
    textAlign: "center",
    paddingHorizontal: 50,
    marginTop: -80,
  },
  description: {
    fontFamily: "Mulish-SemiBold",
    fontSize:16,
    textAlign: "center",
    paddingHorizontal: 30,
    marginTop: 15,
    lineHeight: 22,
  },
});
