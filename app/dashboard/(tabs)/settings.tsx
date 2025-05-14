import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, StatusBar } from "react-native";
import { useRouter } from "expo-router";

const SettingsPage = () => {
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const router = useRouter();

  const toggleLocation = () => setIsLocationEnabled((prevState) => !prevState);

  const handleSaveSettings = () => {
    // Logic to save settings can be added here
    router.push("/dashboard/home"); // Navigate to the Home page
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#3949AB" />

      <View style={styles.container}>
        {/* Enable/Disable Location Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Enable Location</Text>
          <Text style={styles.sectionDescription}>
            Toggle the switch to enable or disable location services for this app.
          </Text>

          {/* Location Switch */}
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>
              {isLocationEnabled ? "Location Enabled" : "Location Disabled"}
            </Text>
            <Switch
              value={isLocationEnabled}
              onValueChange={toggleLocation}
              trackColor={{ false: "#E0E0E0", true: "#3949AB" }}
              thumbColor={isLocationEnabled ? "#FFF" : "#9E9E9E"}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAF6", // Subtle light background
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  section: {
    backgroundColor: "#FFFFFF",
    padding: 25,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#3949AB",
    marginBottom: 10,
  },
  sectionDescription: {
    fontSize: 16,
    color: "#757575",
    lineHeight: 22,
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  switchLabel: {
    fontSize: 16,
    color: "#3949AB",
    fontWeight: "500",
  },
});

export default SettingsPage;
