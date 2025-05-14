import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useAlerts } from "./AlertContext"; // Ensure you import your context hook
import { Ionicons } from "@expo/vector-icons"; // Import icon library
import { Picker } from "@react-native-picker/picker";

export default function SetAlert() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [eventName, setEventName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contactCategory, setContactCategory] = useState<string | null>(null);
  const [emergencyMode, setEmergencyMode] = useState<string | null>(null);
  const [location, setLocation] = useState("");

  const { addAlert } = useAlerts();
  const router = useRouter();

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSubmit = () => {
    if (
      !selectedCategory ||
      !eventName ||
      !phoneNumber ||
      !contactCategory ||
      !emergencyMode ||
      !location
    ) {
      Alert.alert("Missing Information", "Please fill in all the fields.");
      return;
    }

    const alert = {
      category: selectedCategory,
      eventName,
      phoneNumber,
      contactCategory,
      emergencyMode,
      location,
    };

    addAlert(alert);

    Alert.alert(
      "Alert Created",
      `Category: ${selectedCategory}\nEvent Name: ${eventName}\nPhone Number: ${phoneNumber}\nContact Category: ${contactCategory}\nEmergency Mode: ${emergencyMode}\nLocation: ${location}`
    );

    setSelectedCategory(null);
    setEventName("");
    setPhoneNumber("");
    setContactCategory(null);
    setEmergencyMode(null);
    setLocation("");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Create an Alert</Text>
      </View>

      <View style={styles.categoryContainer}>
        <Text style={styles.label}>Alert Category:</Text>
        <View style={styles.buttonGroup}>
          {[
            "High Alert",
            "Medium Alert",
            "Low Alert",
          ].map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedButton,
              ]}
              onPress={() => handleCategoryPress(category)}
            >
              <Text
                style={
                  selectedCategory === category
                    ? styles.selectedButtonText
                    : styles.buttonText
                }
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {selectedCategory && (
        <View style={styles.formContainer}>
          <Text style={styles.label}>Event Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter event name"
            value={eventName}
            onChangeText={setEventName}
          />

          <Text style={styles.label}>Phone Number:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />

          <Text style={styles.label}>Contact Category:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={contactCategory}
              onValueChange={(itemValue) => setContactCategory(itemValue)}
            >
              <Picker.Item label="Select a category" value={null} />
              {[
                "Family",
                "Friends",
                "Neighbors",
                "Police",
                "Fire Station",
                "Hospital",
              ].map((category) => (
                <Picker.Item key={category} label={category} value={category} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Emergency Mode:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={emergencyMode}
              onValueChange={(itemValue) => setEmergencyMode(itemValue)}
            >
              <Picker.Item label="Select a mode" value={null} />
              {[
                "Medical",
                "Security",
                "Disaster",
                "Accident",
              ].map((mode) => (
                <Picker.Item key={mode} label={mode} value={mode} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Location:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter location"
            value={location}
            onChangeText={setLocation}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C5CAE9",
  
   
  },
  header: {
    backgroundColor: "#5C6BC0",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    textAlign: "left",
    letterSpacing: 2,
  },
  label: {
    fontSize: 20,
    color: "#5C6BC0",
    marginBottom: 8,
    marginTop: 8,
    marginLeft: 8,
    fontWeight: "500",
  },
  categoryContainer: {
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryButton: {
    flex: 1,
    backgroundColor: "#E0E0E0",
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#5C6BC0",
  },
  buttonText: {
    fontSize: 14,
    color: "#6A6A6A",
  },
  selectedButtonText: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    margin: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderColor: "#5C6BC0",
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 14,
    color: "#5C6BC0",
  },
  pickerContainer: {
    backgroundColor: "#FFFFFF",
    borderColor: "#5C6BC0",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: "#5C6BC0",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});