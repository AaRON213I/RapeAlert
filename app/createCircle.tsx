import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Clipboard,
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons'; 
import { useRouter } from 'expo-router';
import { firestore } from './firebaseConfig'; // Import Firestore
import { collection, addDoc } from 'firebase/firestore';

import useStore from './useStore';

const GeneratePasscode = () => {
    const { UserinStore } = useStore();

  const [passcode, setPasscode] = useState('');
  const [circleName, setCircleName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const generateRandomPasscode = () => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let randomCode = '';
      for (let i = 0; i < 6; i++) {
        randomCode += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      setPasscode(randomCode);
    };

    generateRandomPasscode();
  }, []);

  const copyToClipboard = () => {
    if (passcode) {
      Clipboard.setString(passcode);
      Alert.alert('Copied', 'Passcode copied to clipboard!');
    } else {
      Alert.alert('Error', 'No passcode to copy.');
    }
  };

  const addCircle = async () => {
    if (circleName.trim() === '') {
      Alert.alert('Error', 'Please enter a valid circle name.');
      return;
    }

    try {
    const circleData = { circlename: circleName, members: [UserinStore?.fullName], circlepasscode: passcode };
      const docRef = await addDoc(collection(firestore, 'circles'), circleData);
      
      Alert.alert('Success', 'Circle added successfully!');
      setCircleName(''); // Clear the input field

      router.push("/dashboard/(tabs)/home");
    } catch (error) {
      console.error('Error adding circle: ', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const handleGoBack = () => {
    router.back(); // Navigate to the previous screen
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={24} color="#6366F1" />
      </TouchableOpacity>

      <FontAwesome name="key" size={80} color="#6366F1" style={styles.icon} />
      <Text style={styles.title}>Generate Your Unique Code</Text>

      <View style={styles.passcodeContainer}>
        <Text style={styles.passcode}>{passcode}</Text>
      </View>

      <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
        <Text style={styles.copyButtonText}>Copy Code</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Enter Circle Name"
        placeholderTextColor="#A0A0B0"
        value={circleName}
        onChangeText={setCircleName}
      />

      <TouchableOpacity style={styles.button} onPress={addCircle}>
        <Text style={styles.buttonText}>Create Circle</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#5C6BC0',
    textAlign: 'center',
    marginBottom: 20,
  },
  passcodeContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#6366F1',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    shadowColor: '#6366F1',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  passcode: {
    fontSize: 20,
    fontWeight: '500',
    color: '#EF4444',
  },
  button: {
    backgroundColor: '#6366F1',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  copyButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6366F1',
    marginBottom: 20,
    elevation: 1,
  },
  copyButtonText: {
    color: '#6366F1',
    fontWeight: '600',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#A0A0B0',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    padding: 12,
    marginBottom: 20,
    width: '100%',
    fontSize: 16,
    color: '#333',
  },
});

export default GeneratePasscode;
