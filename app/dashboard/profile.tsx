import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
} from "react-native";
import useStore from '../useStore';
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { updateDoc, doc, getDoc, setDoc } from 'firebase/firestore'; // Import Firestore methods
import { firestore } from '../firebaseConfig'; // Your Firestore instance
import { useAuth } from "./AuthContext"; // Import the context

const MyProfilePage = () => {
  const { UserinStore } = useStore();
  const router = useRouter();
  const { user, setUser } = useAuth(); // Access user and setUser from AuthContext

  const [profileImage, setProfileImage] = useState(user.image || 'path/to/default/image.png'); // Default image path
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({
    fullName: UserinStore?.fullName || '',
    email: UserinStore?.email || '',
    phone: UserinStore?.phone || '', // New field
    address: UserinStore?.address || '',
    age: UserinStore?.age || '', // New field
  });

  // Fetch the user profile when the component mounts (optional, if not using context/store)
  useEffect(() => {
    const fetchUserProfile = async () => {
      const userDocRef = doc(firestore, 'users', user.email); 
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        setProfile({
          ...userDoc.data(),
          email: user.email,
        });
        setProfileImage(userDoc.data().image || 'path/to/default/image.png');
      }
    };
    fetchUserProfile();
  }, [user.email]);

  const handlePickImage = async () => {
    if (!isEditing) {
      Alert.alert("Edit Profile", "Enable edit mode to change your profile picture.");
      return;
    }

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Denied",
        "You need to grant permission to access the media library."
      );
      return;
    }

    setIsLoading(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    setIsLoading(false);

    if (!result.canceled) {
      setProfileImage(result.assets[0]?.uri || user.image || 'path/to/default/image.png');
      setUser({ ...user, image: result.assets[0]?.uri || user.image });
    }
  };

  const handleEditProfile = async () => {
    setIsEditing(!isEditing);

    if (isEditing) {
      // Validation could be added here to ensure that fields are not empty
      const userData = {
        fullName: profile.fullName,
        email: profile.email,
        age: profile.age,
        phone: profile.phone,
        address: profile.address,
        image: profileImage, // Add updated image if changed
      };

      try {
        const userDocRef = doc(firestore, 'users', profile.email); 
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          // If the user document exists, update it with the new profile data
          await updateDoc(userDocRef, userData);
          Alert.alert("Profile Updated", "Your profile has been successfully updated!");
          setUser({ ...user, ...userData }); // Update the user context after saving changes
        } else {
          // If the user does not exist, create a new document (optional)
          await setDoc(userDocRef, userData); 
          Alert.alert("Profile Created", "Your profile has been successfully created!");
          setUser({ ...user, ...userData }); // Update the user context after saving
        }
      } catch (error) {
        console.error("Error updating profile: ", error);
        Alert.alert("Error", "There was an issue updating your profile. Please try again.");
      }
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert("Delete Account", "Are you sure you want to delete your account?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes, Delete", onPress: () => console.log("Account deleted") },
    ]);
  };

  const handleReturnHome = () => {
    router.push("/dashboard/(tabs)/home");
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#5C6BC0" />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleReturnHome} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.title}>Profile</Text>
        </View>

        <View style={styles.profileSection}>
          <TouchableOpacity onPress={handlePickImage}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#5C6BC0" />
            ) : (
              <Image
                source={{ uri: profileImage }}
                style={styles.profilePicture}
              />
            )}
          </TouchableOpacity>
          <Text style={styles.changePhotoText}>Tap to {isEditing ? "change photo" : "view photo"}</Text>
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.detailsTitle}>Profile Details</Text>

          <View style={styles.detailsItem}>
            <Text style={styles.label}>Full Name:</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={profile.fullName}
                onChangeText={(text) => setProfile({ ...profile, fullName: text })}
              />
            ) : (
              <Text style={styles.valueText}>{profile.fullName}</Text>
            )}
          </View>

          <View style={styles.detailsItem}>
            <Text style={styles.label}>Phone Number:</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={profile.phone}
                onChangeText={(text) => setProfile({ ...profile, phone: text })}
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.valueText}>{profile.phone}</Text>
            )}
          </View>

          <View style={styles.detailsItem}>
            <Text style={styles.label}>Address:</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={profile.address}
                onChangeText={(text) => setProfile({ ...profile, address: text })}
              />
            ) : (
              <Text style={styles.valueText}>{profile.address}</Text>
            )}
          </View>

          <View style={styles.detailsItem}>
            <Text style={styles.label}>Age:</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={profile.age}
                onChangeText={(text) => setProfile({ ...profile, age: text })}
                keyboardType="numeric"
              />
            ) : (
              <Text style={styles.valueText}>{profile.age}</Text>
            )}
          </View>

          <View style={styles.detailsItem}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.valueText}>{profile.email}</Text>
          </View>
        </View>

        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
            <Text style={styles.buttonText}>
              {isEditing ? "SAVE CHANGES" : "EDIT PROFILE"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSecondary} onPress={handleDeleteAccount}>
            <Text style={styles.buttonTextSecondary}>DELETE ACCOUNT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  header: {
    backgroundColor: "#6366F1",
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
  profileSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#E0E0E0",
  },
  changePhotoText: {
    marginTop: 10,
    color: "#3F51B5",
    fontSize: 14,
  },
  detailsSection: {
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
  detailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3F51B5",
    marginBottom: 10,
  },
  detailsItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    color: "#3F51B5",
    marginRight: 10,
  },
  valueText: {
    fontSize: 14,
    color: "#6A6A6A",
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#6366F1",
    fontSize: 14,
    color: "#6366F1",
    paddingVertical: 2,
    flex: 1,
  },
  actionsSection: {
    marginTop: 20,
    marginHorizontal: 15,
  },
  button: {
    backgroundColor: "#6366F1",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 5,
    shadowColor: "#6366F1",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  buttonSecondary: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#6366F1",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 5,
    shadowColor: "#6366F1",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  buttonTextSecondary: {
    color: "#6366F1",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default MyProfilePage;
