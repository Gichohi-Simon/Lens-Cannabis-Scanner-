import { View, StyleSheet, Animated, useWindowDimensions } from "react-native";
import React from "react";
import { Colors } from "@/constants/colors";

export default function Paginator({
  data,
  scrollx,
}: {
  data: any;
  scrollx: any;
}) {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      {data.map((_: any, i: any) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotwidth = scrollx.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });

        const opacity = scrollx.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            style={[styles.dot, { width: dotwidth, opacity }]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    height: 64,
    marginTop: -220,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.secondary,
    marginHorizontal: 8,
  },
});
