import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const NotificationScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("received");

  // Dummy data for notifications
  const receivedNotifications = [
    { id: 1, message: "Emergency alert: Help is on the way!" },
    { id: 2, message: "Your safety request has been received" }
  ];

  const sentNotifications = [
    { id: 1, message: "You triggered a safety alert" },
    { id: 2, message: "Your location has been shared with emergency contacts" }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push("/dashboard/(tabs)/home")}
          style={styles.backButtonContainer}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notifications</Text>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "received" && styles.activeTabButton]}
          onPress={() => setActiveTab("received")}
        >
          <Text style={[styles.tabButtonText, activeTab === "received" && styles.activeTabButtonText]}>
            Received
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "sent" && styles.activeTabButton]}
          onPress={() => setActiveTab("sent")}
        >
          <Text style={[styles.tabButtonText, activeTab === "sent" && styles.activeTabButtonText]}>
            Sent
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.tabContent}>
        {activeTab === "received" ? (
          receivedNotifications.length > 0 ? (
            receivedNotifications.map(notification => (
              <View key={notification.id} style={styles.notificationItem}>
                <Text style={styles.notificationText}>{notification.message}</Text>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No received notifications</Text>
            </View>
          )
        ) : (
          sentNotifications.length > 0 ? (
            sentNotifications.map(notification => (
              <View key={notification.id} style={styles.notificationItem}>
                <Text style={styles.notificationText}>{notification.message}</Text>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No sent notifications</Text>
            </View>
          )
        )}
      </ScrollView>
    </View>
  );
};

NotificationScreen.options = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f8fa",
  },
  header: {
    backgroundColor: "#6366F1",
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  backButtonContainer: {
    padding: 10,
  },
  headerText: {
    flex: 1,
    fontSize: 26,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 1.5,
    textAlign: "left",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  tabButtonText: {
    fontSize: 16,
    color: "#555",
  },
  activeTabButton: {
    borderBottomWidth: 3,
    borderBottomColor: "#6366F1",
  },
  activeTabButtonText: {
    fontWeight: "bold",
    color: "#6366F1",
  },
  tabContent: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  emptyState: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#888",
    textAlign: "center",
  },
  notificationItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  notificationText: {
    fontSize: 16,
    color: "#333",
  }
});

export default NotificationScreen;
