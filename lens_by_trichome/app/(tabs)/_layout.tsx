import React from "react";
import { Tabs } from "expo-router";
import { Colors } from "@/constants/colors";
import { FontAwesome, FontAwesome5, Ionicons, Entypo } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TabLayout = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.secondary,
        tabBarStyle: {
          backgroundColor: Colors.primary,
          paddingTop: 10,
          marginTop: -insets.top,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Entypo size={30} name="home" color={color} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="scan-circle" size={30} color={color} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="subscription"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="crown" size={24} color={color} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={26} color={color} />
          ),
          tabBarLabel: () => null,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
