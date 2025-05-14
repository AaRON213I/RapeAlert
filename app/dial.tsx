import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage"; // For persistent storage

const DialPage = () => {
  const [phoneNumbers, setPhoneNumbers] = useState({
    police: "",
    fireStation: "",
    ambulance: "",
    rescue: "",
  });

  const router = useRouter();

  // Load the phone numbers from AsyncStorage when the component mounts
  useEffect(() => {
    const loadPhoneNumbers = async () => {
      try {
        const savedNumbers = await AsyncStorage.getItem("phoneNumbers");
        if (savedNumbers) {
          setPhoneNumbers(JSON.parse(savedNumbers));
        }
      } catch (error) {
        console.error("Error loading phone numbers:", error);
      }
    };

    loadPhoneNumbers();
  }, []);

  // Save phone numbers to AsyncStorage whenever they change
  const savePhoneNumbers = async (updatedPhoneNumbers) => {
    try {
      await AsyncStorage.setItem("phoneNumbers", JSON.stringify(updatedPhoneNumbers));
    } catch (error) {
      console.error("Error saving phone numbers:", error);
    }
  };

  // Function to handle the call action
  const handleCall = (service) => {
    const number = phoneNumbers[service];
    if (number.trim() === "") {
      Alert.alert("Please enter a phone number.");
    } else {
      // Normally you would use Linking to make a call, but it's not possible in the emulator
      Alert.alert(`Dialing: ${number}`);
      // Here you can replace it with actual call logic when testing on a real device
      // Linking.openURL(`tel:${number}`);
    }
  };

  // Handle the input change for each service
  const handleInputChange = (service, value) => {
    const updatedPhoneNumbers = { ...phoneNumbers, [service]: value };
    setPhoneNumbers(updatedPhoneNumbers);
    savePhoneNumbers(updatedPhoneNumbers); // Save the updated numbers immediately
  };

  return (
    <View style={styles.container}>
      {/* Back Button and Title Container */}
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#3F51B5" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>DIRECT DIALING</Text>
      </View>

      {/* Contact List */}
      <View style={styles.contactContainer}>
        {["police", "fireStation", "ambulance", "rescue"].map((service, index) => (
          <View style={styles.contactItem} key={index}>
            <View style={styles.contactHeader}>
              {/* Icons for each service */}
              {service === "police" && (
                <MaterialCommunityIcons name="police-station" size={40} color="#1A237E" />
              )}
              {service === "fireStation" && (
                <MaterialCommunityIcons name="fire-truck" size={40} color="#1A237E" />
              )}
              {service === "ambulance" && (
                <MaterialCommunityIcons name="ambulance" size={40} color="#1A237E" />
              )}
              {service === "rescue" && (
                <MaterialCommunityIcons name="handshake" size={40} color="#1A237E" />
              )}
              <Text style={styles.contactText}>{service.toUpperCase()}</Text>
              <TouchableOpacity
                style={styles.callButton}
                onPress={() => handleCall(service)}
              >
                <Ionicons name="call" size={24} color="#1A237E" />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              placeholderTextColor="#1A237E"
              value={phoneNumbers[service]}
              onChangeText={(text) => handleInputChange(service, text)}
              keyboardType="phone-pad"
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#F9FAFB", // Light background for a clean look
  },
  header: {
    flexDirection: "row", // Align back button and title horizontally
    alignItems: "center", // Center the items vertically
    marginBottom: 30, // Add some space below the header
  },
  backButton: {
    marginRight: 15, // Add space between back button and title
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: "#1A237E",
  },
  contactContainer: {
    marginBottom: 30,
  },
  contactItem: {
    backgroundColor: "#ffffff",
    padding: 18,
    marginBottom: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  contactHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  contactText: {
    fontSize: 18,
    color: "#1A237E",
    marginLeft: 12, // Add space between icon and text
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#1A237E",
    marginBottom: 12,
  },
  callButton: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 50,
    borderColor: "#1A237E",
    borderWidth: 1,
    alignSelf: "center",
  },
});

export default DialPage;