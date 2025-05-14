import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router"; // Use the router to navigate
import { Ionicons } from 'react-native-vector-icons'; // Import Ionicons for the back button
import { useAlerts } from "./AlertContext";

export default function MyAlerts() {
  const { alerts } = useAlerts(); // Access alerts from the context
  const router = useRouter(); // Use router for navigation
  
  console.log("Alerts in MyAlerts:", alerts); // Verify alerts

  return (
    <ScrollView style={styles.container}>
      {/* Header with a back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#3F51B5" />
        </TouchableOpacity>
        <Text style={styles.title}>My Alerts</Text>
      </View>

      {/* Display alerts or a message if no alerts exist */}
      {alerts.length === 0 ? (
        <Text style={styles.noAlertsText}>No alerts have been created yet.</Text>
      ) : (
        alerts.map((alert, index) => (
          <View
            key={index}
            style={[styles.alertCard, alert.emergencyMode && styles.emergencyCard]}
          >
            <Text style={styles.alertText}>Category: {alert.category}</Text>
            <Text style={styles.alertText}>Event Name: {alert.eventName}</Text>
            <Text style={styles.alertText}>Phone: {alert.phoneNumber}</Text>
            <Text style={styles.alertText}>Contact: {alert.contactCategory}</Text>
            <Text style={styles.alertText}>
              Emergency Mode: {alert.emergencyMode ? "Yes" : "No"}
            </Text>
            <Text style={styles.alertText}>Location: {alert.location}</Text>
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F3F4F6" },
  header: {
    flexDirection: "row",       // Align items horizontally
    alignItems: "center",       // Center items vertically
    marginBottom: 20,
  },
  backButton: {
    marginRight: 15,            // Space between the back button and title
  },
  title: { 
    fontSize: 26, 
    fontWeight: "bold", 
    color: "#3F51B5", 
    marginLeft: 10,             // Add some space between the back button and the title
  },
  noAlertsText: { 
    textAlign: "center", 
    color: "#4A4A4A", 
    fontSize: 16,
    justifyContent: "center",

  },
  alertCard: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  emergencyCard: {
    backgroundColor: "#FFEBEE", // Red background for emergency mode
    borderLeftWidth: 5,
    borderLeftColor: "#F44336", // Red border to highlight emergency
  },
  alertText: { fontSize: 14, color: "#4A4A4A", marginBottom: 5 },
  detailsButton: {
    backgroundColor: "#3F51B5",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  detailsButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
});