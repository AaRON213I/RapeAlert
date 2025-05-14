import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import useStore from './useStore'; // Assuming you have a store for user information
import { firestore } from './firebaseConfig'; // Firestore instance
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

const JoinPage = () => {
  const { UserinStore } = useStore();
  const router = useRouter();
  const [code, setCode] = useState("");
  const [circleName, setCircleName] = useState("");
  const [passcode, setPasscode] = useState("");

  const validateCode = () => {
    if (!code || code.length < 6) {
      Alert.alert("Validation Error", "Please enter a valid code.");
      return false;
    }
    return true;
  };

  const handleJoin = async () => {
    if (validateCode()) {
      // Query Firestore to find the circle with the given passcode
      const circlesRef = collection(firestore, 'circles');
      const q = query(circlesRef, where('circlepasscode', '==', code));
      
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Alert.alert("Error", "Circle not found or invalid code.");
        return;
      }

      // Circle found, join the circle
      const circleDoc = querySnapshot.docs[0]; // Assuming we only expect one result
      const circleData = circleDoc.data();
      
      // Add the user to the members array
      if (!circleData.members.includes(UserinStore?.fullName)) {
        const updatedMembers = [...circleData.members, UserinStore?.fullName];
        
        // Update the circle document with the new members list
        await updateDoc(doc(firestore, 'circles', circleDoc.id), {
          members: updatedMembers,
        });

        Alert.alert("Success", "You have successfully joined the circle!");

        // Navigate to the dashboard or home page after successful join
        router.push("/dashboard/(tabs)/home");
      } else {
        Alert.alert("Error", "You are already a member of this circle.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#6366F1" />
      </TouchableOpacity>

      <Text style={styles.title}>Enter Code to Join</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your code"
        autoCapitalize="none"
        value={code}
        onChangeText={setCode}
      />

      <TouchableOpacity style={styles.button} onPress={handleJoin}>
        <Text style={styles.buttonText}>Join</Text>
      </TouchableOpacity>

      <Text style={styles.infoText}>Make sure the code is at least 6 characters long.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F7", // Light grey background
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#5C6BC0", // Dark text color
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#6366F1", // Modern soft blue border
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#FFFFFF", // White background for input
    fontSize: 16,
    shadowColor: "#6366F1",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  button: {
    backgroundColor: "#6366F1", // Primary modern button color
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    shadowColor: "#6366F1",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  buttonText: {
    color: "#FFFFFF", // White text color
    fontWeight: "bold",
    fontSize: 16,
  },
  infoText: {
    color: "#7D7D7D", // Grey text for additional information
    fontSize: 14,
    marginTop: 10,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default JoinPage;
