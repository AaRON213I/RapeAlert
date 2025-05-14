import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView
} from "react-native";
import { Checkbox } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSosContext } from "./SosContext"; // Import the context

const AddAlertsPage = () => {
  const router = useRouter();

  const [textMessage, setTextMessage] = useState("");
  const [contactNumbers, setContactNumbers] = useState([]);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [newContact, setNewContact] = useState("");

  // Use SosContext to save data
  const { addAlert } = useSosContext();

  const handleAddContact = () => {
    if (newContact.trim() === "") {
      Alert.alert("Validation Error", "Please enter a valid contact number.");
      return;
    }
    setContactNumbers([...contactNumbers, newContact]);
    setNewContact("");
  };

  const handleSaveAlert = () => {
    if (textMessage.trim() === "" || contactNumbers.length === 0) {
      Alert.alert("Validation Error", "Please fill out all required fields.");
      return;
    }

    // Save data to SosContext
    addAlert({
      textMessage,
      contactNumbers,
      locationEnabled,
    });

    Alert.alert("Alert Saved", "Your SOS alert has been successfully saved.");

    // Reset the fields
    setTextMessage("");
    setContactNumbers([]);
    setLocationEnabled(false);

    // Navigate back or to sos-alerts.tsx
    router.push("/sos-alerts");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push("/dashboard/(tabs)/home")} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.title}>Add SOS Alerts</Text>
        </View>

        {/* Wrap the entire form inside the formContainer */}
        <View style={styles.formContainer}>
          <View style={styles.inputSection}>
            <Text style={styles.label}>Text Message:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Add text message"
              value={textMessage}
              onChangeText={setTextMessage}
            />
            <Text style={styles.helperText}>
              Add the message that you want to send with the SOS alert.
            </Text>
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Emergency Contacts:</Text>
            <View style={styles.contactInputWrapper}>
              <TextInput
                style={[styles.textInput, styles.contactInput]}
                placeholder="Add contact number"
                value={newContact}
                onChangeText={setNewContact}
                keyboardType="phone-pad"
              />
              <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
                <Ionicons name="add" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            {contactNumbers.length > 0 && (
              <View style={styles.contactList}>
                {contactNumbers.map((contact, index) => (
                  <Text key={index} style={styles.contactItem}>
                    {contact}
                  </Text>
                ))}
              </View>
            )}
            <Text style={styles.helperText}>
              Add the contact numbers to send SOS alerts in emergencies.
            </Text>
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Location:</Text>
            <View style={styles.checkboxWrapper}>
              <Checkbox
                status={locationEnabled ? "checked" : "unchecked"}
                onPress={() => setLocationEnabled(!locationEnabled)}
                color="#3F51B5"
              />
              <Text style={styles.checkboxLabel}>
                {locationEnabled ? "Enabled" : "Disabled"}
              </Text>
            </View>
            <Text style={styles.helperText}>
              Enable location sharing to allow others to view and monitor your
              location on the map.
            </Text>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveAlert}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    margin: 15,
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
  inputSection: {
    marginBottom: 5,
    marginLeft: 10,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A237E",
    marginBottom: 5,
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#C5CAE9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginRight: 10,
  },
  contactInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactInput: {
    flex: 1,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#3F51B5",
    padding: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  },
  contactList: {
    marginTop: 10,
  },
  contactItem: {
    fontSize: 14,
    color: "#1A237E",
    marginBottom: 5,
  },
  helperText: {
    fontSize: 12,
    color: "#78909C",
    marginTop: 5,
  },
  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 14,
    color: "#1A237E",
  },
  saveButton: {
    backgroundColor: "#3F51B5",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 150,
    marginRight: 150,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddAlertsPage;