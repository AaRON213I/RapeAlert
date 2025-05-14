import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SupportPage = () => {
  const handleEmailSupport = () => {
    // Add email support logic here
  };

  const handleCallSupport = () => {
    // Add call support logic here
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#3F51B5" />
      <ScrollView style={styles.container}>
        {/* Email Support Section */}
        <View style={styles.section}>
          <Ionicons name="mail-outline" size={60} color="#3F51B5" style={styles.icon} />
          <Text style={styles.sectionTitle}>Email Support</Text>
          <Text style={styles.sectionDescription}>
            Reach out to us through email for any issues or inquiries. Our team will respond promptly.
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleEmailSupport}>
            <Text style={styles.buttonText}>EMAIL US</Text>
          </TouchableOpacity>
        </View>

        {/* Call Support Section */}
        <View style={styles.section}>
          <Ionicons name="call-outline" size={60} color="#3F51B5" style={styles.icon} />
          <Text style={styles.sectionTitle}>Call Support</Text>
          <Text style={styles.sectionDescription}>
            Need urgent help? Give us a call, and our support team will assist you right away.
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleCallSupport}>
            <Text style={styles.buttonText}>CALL US</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD", // Light airy background
  },
  section: {
    backgroundColor: "#FFFFFF", // White background for sections
    margin: 15,
    padding: 25,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    alignItems: "center", // Centered content
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3F51B5", // Deep blue for titles
    marginVertical: 10,
  },
  sectionDescription: {
    fontSize: 16,
    color: "#757575", // Muted gray for descriptions
    textAlign: "center",
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#3F51B5", // Deep blue button
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
    shadowColor: "#3F51B5",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF", // White text for button
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    marginBottom: 10,
  },
});

export default SupportPage;
