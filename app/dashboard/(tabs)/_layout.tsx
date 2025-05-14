import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const DashboardLayout = () => {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        paddingBottom: 5,
      },
      tabBarActiveTintColor: '#6366F1',
      tabBarInactiveTintColor: '#666',
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '600',
      },
    }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" size={size} color={color} />
          ),
          tabBarLabel: 'Settings',
        }}
      />

      <Tabs.Screen
        name="support"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="face-agent" size={size} color={color} />
          ),
          tabBarLabel: 'Support',
        }}
      />
    </Tabs>
  );
};

export default DashboardLayout;
