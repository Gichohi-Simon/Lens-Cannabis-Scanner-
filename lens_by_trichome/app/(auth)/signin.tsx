import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Colors } from "@/constants/colors";
import { useRouter } from "expo-router";

export default function Signin() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/home");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Signin</Text>
      <TouchableOpacity onPress={handleLogin}>
        <Text>signup</Text>
      </TouchableOpacity>
    </View>
  );
}
