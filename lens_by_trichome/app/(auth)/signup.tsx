import React, {useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
  ScrollView,
  Alert
} from "react-native";
import { Colors } from "@/constants/colors";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";

export default function Signup() {
  const router = useRouter();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

    async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })
    if (error) Alert.alert(error.message)
    if (!session) {
      Alert.alert('sign up failed')
    }else{
       Alert.alert('Signup successful!')
      router.push("/signin")
    }
    setLoading(false)
  }
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Scrollable content */}
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false} // hides scrollbar
      >
        <Text style={styles.heading}>sign up to lens</Text>
        
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/cannabis.png")}
            style={{ height: 150, width: 150 }}
            resizeMode="contain"
          />
        </View>

        <View style={styles.formContainer}>
          <View style={styles.form}>
            <Text style={styles.formTitle}>Email</Text>
            <TextInput
              placeholder="enter your email address"
              style={styles.textInput}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.form}>
            <Text style={styles.formTitle}>Password</Text>
            <TextInput
              placeholder="enter your password"
              style={styles.textInput}
              secureTextEntry
              autoCapitalize={'none'}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          {/* <View style={styles.form}>
            <Text style={styles.formTitle}>Confirm Password</Text>
            <TextInput
              placeholder="enter your password"
              style={styles.textInput}
              secureTextEntry
            />
          </View> */}
          <TouchableOpacity style={styles.button} onPress={() => signUpWithEmail()} disabled={loading} >
            <Text style={styles.buttonText}>sign up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>already have an account? </Text>
          <Pressable onPress={() => router.push("/signin")}>
            <Text style={styles.signupLink}>Sign in</Text>
          </Pressable>
        </View>

        <View style={styles.subHeadingContainer}>
          <Text style={styles.subHeading}>or sign up with</Text>
        </View>

        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.icon}>
            <AntDesign name="google" size={20} color={Colors.light} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <AntDesign name="apple1" size={20} color={Colors.light} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <Entypo name="link" size={20} color={Colors.light} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  scrollContainer: {
    paddingBottom: 40, // some space at bottom
  },
  heading: {
    fontFamily: "Mulish-SemiBold",
    fontSize: 20,
    textAlign: "center",
    marginTop: 30,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  form: {
    marginHorizontal: 24,
    marginTop: 20,
  },
  formContainer: {
    marginTop: 20,
  },
  formTitle: {
    fontFamily: "Mulish-SemiBold",
    fontSize: 16,
    marginBottom: 10,
  },
  textInput: {
    fontFamily: "Mulish",
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 12,
  },
  button: {
    marginHorizontal: 24,
    backgroundColor: Colors.primary,
    borderRadius: 6,
    marginTop: 30,
  },
  buttonText: {
    fontFamily: "Mulish",
    fontSize: 16,
    color: Colors.light,
    textAlign: "center",
    paddingVertical: 12,
  },
  subHeadingContainer: {
    marginTop: 20,
  },
  subHeading: {
    fontFamily: "Mulish-SemiBold",
    fontSize: 16,
    textAlign: "center",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginTop: 20,
    paddingRight: 40,
  },
  icon: {
    backgroundColor: Colors.primary,
    minWidth: 40,
    maxWidth:30,
    paddingVertical: 10,
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signupText: {
    fontFamily: "Mulish-SemiBold",
    fontSize: 16,
  },
  signupLink: {
    fontFamily: "Mulish-SemiBold",
    fontSize: 16,
    color: Colors.primary,
  },
});
