import { Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/colors";

const Home = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  // Get the current user's email on mount
  useEffect(() => {
    const user = supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setEmail(user.email ?? null);
    });
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert("Logout failed", error.message);
    } else {
      router.replace("/signin"); // redirect back to signin page
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Welcome{email ? `, ${email}` : ""}</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:Colors.secondary
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily:"Mulish"
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    fontFamily:"Mulish"
  },
});
