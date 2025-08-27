import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { useRouter } from "expo-router";

import slides from "../utils/slides";
import OnboardingItem from "./OnboardingItem";
import Paginator from "./Paginator";
import { Colors } from "@/constants/colors";
import { LinearGradient } from "expo-linear-gradient";

const Onboarding = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const handleNext = () => {
    router.push("/signin");
  };

  return (
     <View
     style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <View style={{ flex: 0.2, justifyContent: "center" }}>
        <Paginator data={slides} scrollx={scrollX} />
        {currentIndex === slides.length - 1 && (
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:Colors.secondary
  },
  button: {
    backgroundColor: Colors.primary,
    width: 300,
    borderRadius: 10,
  },
  buttonText: {
    color: Colors.secondary,
    fontFamily: "Mulish-Bold",
    textAlign: "center",
    paddingVertical: 14,
  },
});

export default Onboarding;
