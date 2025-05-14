import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { useUser } from "./usercontext";
import { AuthProvider } from "./AuthContext";

import useStore from '../useStore'

export default function DashboardLayout() {
  const router = useRouter();
  const { user, setUser } = useUser();
    const { UserinStore } = useStore();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [  
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            setUser({ fullName: "", email: "", image: "" }); 
            router.replace("/"); 
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleNotificationClick = () => {
    router.push("/notification");
  };

  const CustomDrawerContent = (props: any) => (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Ionicons name="person-circle-outline" size={80} color="#FFFFFF" />
        <Text style={styles.profileGreeting}>Hello, {UserinStore?.fullName}!</Text>
      </View>

      <DrawerItem
        label={() => (
          <View style={styles.drawerItem}>
            <Ionicons name="home-outline" size={24} color="#6366F1" />
            <Text style={styles.drawerText}>Home</Text>
          </View>
        )}
        onPress={() => router.push("/dashboard/(tabs)/home")}
        style={styles.drawerItemContainer}
      />
      <DrawerItem
        label={() => (
          <View style={styles.drawerItem}>
            <AntDesign name="user" size={24} color="#6366F1" />
            <Text style={styles.drawerText}>My Profile</Text>
          </View>
        )}
        onPress={() => router.push("/dashboard/profile")}
        style={styles.drawerItemContainer}
      />
      <DrawerItem
        label={() => (
          <View style={styles.drawerItem}>
            <Ionicons name="cog-outline" size={24} color="#6366F1" />
            <Text style={styles.drawerText}>Settings</Text>
          </View>
        )}
        onPress={() => router.push("/dashboard/settings")}
        style={styles.drawerItemContainer}
      />
      <DrawerItem
        label={() => (
          <View style={styles.drawerItem}>
            <AntDesign name="staro" size={24} color="#6366F1" />
            <Text style={styles.drawerText}>Rate Us</Text>
          </View>
        )}
        onPress={() => Alert.alert("Rate Us", "This will redirect to the rating page.")}
        style={styles.drawerItemContainer}
      />
      <DrawerItem
        label={() => (
          <View style={styles.drawerItem}>
            <Ionicons name="share-outline" size={24} color="#6366F1" />
            <Text style={styles.drawerText}>Share App</Text>
          </View>
        )}
        onPress={() => Alert.alert("Share App", "This will open the share options.")}
        style={styles.drawerItemContainer}
      />
      <DrawerItem
        label={() => (
          <View style={styles.drawerItem}>
            <Ionicons name="log-out-outline" size={30} color="#EF4444" />
            <Text style={[styles.drawerText, { color: "black" }]}>Logout</Text>
          </View>
        )}
        onPress={handleLogout}
        style={styles.drawerItemContainer}
      />
    </DrawerContentScrollView>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
      <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="(tabs)"
          options={{
            title: "Rape Alert",
            drawerHideStatusBarOnOpen: true,
            headerStyle: {
              backgroundColor: "#6366F1",
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 5 },
            },
            headerTintColor: "#FFFFFF",
            headerTitleStyle: {
              fontSize: 26,
              fontWeight: "600",
              letterSpacing: 2,
              fontFamily: "Roboto",
            },
            headerTitleContainerStyle: {
              paddingHorizontal: 20,
              flexDirection: "row",
              alignItems: "center",
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={handleNotificationClick}
                style={styles.notificationIconContainer}
              >
                <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            ),
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            title: "My Profile",
            headerShown: false,
          }}
        />
      </Drawer>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#6366F1",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  profileGreeting: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 10,
  },
  drawerItemContainer: {
    paddingVertical: 12,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  drawerText: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: "500",
    color: "black",
  },
  notificationIconContainer: {
    marginRight: 15,
    padding: 10,
  },
});
