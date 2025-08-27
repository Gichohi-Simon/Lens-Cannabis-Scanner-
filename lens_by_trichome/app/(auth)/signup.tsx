import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Colors } from '@/constants/colors';
import { useRouter } from 'expo-router';

export default function Signup() {
    const router = useRouter();

    const handleLogin = () => {
        router.push("/home")
    }
  return (
    <View>
      <Text>Signup</Text>
    </View>
  )
}


