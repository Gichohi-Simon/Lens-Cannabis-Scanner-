import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Colors } from "@/constants/colors";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { supabase } from "../../lib/supabase";

WebBrowser.maybeCompleteAuthSession(); // Required for deep linking w/ Expo

export default function Signin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔗 Build deep link redirect URL (must match app scheme in app.json/app.config.js)
  const redirectUrl = Linking.createURL("/auth-callback");
  // Example -> com.lensbytrichome://auth-callback

  // 📌 Listen for magic link redirects
  useEffect(() => {
    const handleUrl = async (event: { url: string }) => {
      const { url } = event;
      if (!url) return;

      // Supabase parses the URL and exchanges it for a session
      const { data, error } = await supabase.auth.exchangeCodeForSession(url);

      if (error) {
        Alert.alert("Error", error.message);
      } else if (data.session) {
        // ✅ Navigate to home after login
        router.replace("/home");
      }
    };

    // Listen when app is already open
    const subscription = Linking.addEventListener("url", handleUrl);

    // Handle case when app is opened fresh from a magic link
    Linking.getInitialURL().then((url) => {
      if (url) handleUrl({ url });
    });

    return () => subscription.remove();
  }, []);

  // ✉️ Send Magic Link
  const handleLogin = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectUrl },
    });

    setLoading(false);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert(
        "Check your email",
        "We sent you a magic link. Tap it to log in."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>login to lens</Text>

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
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.6 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "sending..." : "get magic link"}
            </Text>
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
    paddingBottom: 40,
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
    paddingVertical: 8,
  },
});
