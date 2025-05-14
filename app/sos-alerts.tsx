import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // For the back icon
import { useRouter } from "expo-router"; // For navigation
import { useSosContext } from "./SosContext";


const SosAlertsPage = () => {
  const { alerts } = useSosContext(); // Assuming `alerts` is an array of saved alerts
  const router = useRouter(); // Using useRouter for navigation

  const renderAlertItem = ({ item, index }) => (
    
    <View style={styles.alertItem} key={index}>
      <Text style={styles.alertText}>Message: {item.textMessage}</Text>
      <Text style={styles.alertText}>
        Contacts: {item.contactNumbers.join(", ")}
      </Text>
      <Text style={styles.alertText}>
        Location Enabled: {item.locationEnabled ? "Yes" : "No"}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#3F51B5" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>SOS Alerts</Text>
      </View>

       {/* Conditional Rendering */}
       {alerts.length === 0 ? (
        <View style={styles.noAlertsContainer}>
          <Text style={styles.noAlertsText}>No alerts have been created yet.</Text>
        </View>
      ) : (

      <FlatList
        data={alerts}
        renderItem={renderAlertItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />
    )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6", // Lighter background for a clean look
    padding: 20,
  },
  header: {
    flexDirection: "row", // Align items horizontally
    alignItems: "center", // Vertically center the items
    marginBottom: 20,
    paddingVertical: 10,
  },
  backButton: {
    marginRight: 15, // Space between back button and title
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: "#1A237E",
  },
  noAlertsText: { 
    textAlign: "center", 
    color: "#4A4A4A", 
    fontSize: 16, 
    justifyContent: "center",
  },
  listContainer: {
    paddingBottom: 20,
    
    
  },
  alertItem: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  alertText: {
    fontSize: 16,
    color: "#1A237E", // Using the same blue for text
    marginBottom: 8,
  },
});

export default SosAlertsPage;