import React from "react";
import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AlertsProvider from "./AlertContext"; // Ensure the correct path is used
import SosProvider from "./SosContext"; // Ensure the correct path is used
import { AuthProvider } from "./AuthContext"; // Ensure the correct path is used

const RootLayout = () => {
  return (
    // Wrap the entire app with all providers (Auth, Alerts, and Sos)
    <AuthProvider>
      <AlertsProvider>
        <SosProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="forgot-password" />
            <Stack.Screen name="sign-up" />
            <Stack.Screen name="dashboard" />
            <Stack.Screen name="notification" />
            <Stack.Screen name="set-alerts" />
            <Stack.Screen name="my-alerts" />
            <Stack.Screen name="AlertContext" />
            <Stack.Screen name="add-alerts" />
            <Stack.Screen name="sos-alerts" />
            <Stack.Screen name="SosContext" />
            <Stack.Screen name="dial" />
            <Stack.Screen name="set-up-page" />
            <Stack.Screen name="joinCircle" />
            <Stack.Screen name="createCircle" />
            <Stack.Screen name="LiveMapScreen"/>

            <Stack.Screen
              name="place"
              options={{
                headerShown: true,
                title: "Near By Places",
                header: () => <CustomHeader />,
              }}
            />
          </Stack>
        </SosProvider>
      </AlertsProvider>
    </AuthProvider>
  );
};

const CustomHeader = () => {
  const router = useRouter();

  return (
    <View style={styles.customHeader}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButtonContainer}
      >
        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Near By Places</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  customHeader: {
    backgroundColor: "#5C6BC0",
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    height: 80,
  },
  backButtonContainer: {
    padding: 10,
  },
  headerTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 1.5,
    textAlign: "left",
  },
});

export default RootLayout;