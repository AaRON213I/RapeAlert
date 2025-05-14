import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { collection, query, where, getDocs } from "firebase/firestore";
import useStore from './useStore';
import { firestore } from "./firebaseConfig"; // Correct Firestore import

const LoginPage = () => {
  const { storeUserinStore } = useStore();


  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    if (!email) {
      Alert.alert("Validation Error", "Please enter your email.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Validation Error", "Please enter a valid email.");
      return false;
    }
    if (!password) {
      Alert.alert("Validation Error", "Please enter your password.");
      return false;
    }
    return true;
  };



  const handleLogin = async () => {
    if (validateInputs()) {
      try {
        // Query Firestore to find the user by email
        const userQuery = query(
          collection(firestore, 'users'),
          where('email', '==', email)
        );
        const userSnapshot = await getDocs(userQuery);
        const user = userSnapshot.docs[0]?.data();
  
        if (!user || user.password !== password) {
          Alert.alert("Login Failed", "Incorrect email or password. Please try again.");
          return;
        }
  
        // Destructure the necessary fields from the user data
        const { fullName, phone, address, age } = user;
  
        // Store additional user data (fullName, phone, address) in the user store (replace `storeUserinStore` with actual state management logic)
        storeUserinStore({
          email: email,
          fullName: fullName,
          phone: phone,
          address: address,
          age: age
        });
  
        // Display a success alert
        Alert.alert("Login Success", `You have logged in successfully. `);
  
        // Navigate to the dashboard page
        router.push("/dashboard/(tabs)/home");
      } catch (error) {
        console.error("Error querying Firestore: ", error);
        Alert.alert("Error", "Something went wrong. Please try again.");
      }
    }
  };
  

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <FontAwesome name="user-circle" size={80} color="#FFFFFF" style={styles.icon} />
        <Text style={styles.title}>RAPE ALERT</Text>

        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={24} color="#6366F1" style={styles.iconInput} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#B0BEC5"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={24} color="#6366F1" style={styles.iconInput} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#B0BEC5"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.linkContainer}>
          <TouchableOpacity onPress={() => router.push("/forgot-password")}>
            <Text style={styles.link}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/sign-up")}>
            <Text style={styles.link}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#C5CAE9",
  },
  container: {
    padding: 25,
    borderRadius: 15,
    backgroundColor: "#6366F1",
    marginHorizontal: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  icon: {
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#FFFFFF",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#6366F1",
    borderRadius: 10,
    backgroundColor: "#E8EAF6",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  iconInput: {
    marginRight: 8,
    color: "#6366F1",
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#6366F1",
  },
  button: {
    backgroundColor: "#6366F1",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  link: {
    color: "#FFFFFF",
    marginVertical: 5,
    textDecorationLine: "underline",
  },
});

export default LoginPage;
