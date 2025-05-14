import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const NearbyPlaces = () => {
  const places = [
    { name: 'Hospital', icon: 'hospital-o', query: 'nearest hospital' },
    { name: 'Fire Station', icon: 'fire-extinguisher', query: 'nearest fire station' },
    { name: 'Pharmacy', icon: 'plus-square', query: 'nearest pharmacy' },
    { name: 'Police', icon: 'shield', query: 'nearest police station' },
    { name: 'Gas Station', icon: 'tint', query: 'nearest gas station' },
    { name: "ATM's", icon: 'credit-card', query: 'nearest atm' },
    { name: 'Rescue', icon: 'ambulance', query: 'nearest rescue station' },
    { name: 'Civil Society', icon: 'building', query: 'nearest civil society office' },
  ];

  const openGoogleMaps = (query) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    Linking.openURL(url).catch(err => console.error('Failed to open Google Maps', err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {places.map((place, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => openGoogleMaps(place.query)}
          >
            <FontAwesome name={place.icon} size={60} color="#5C6BC0" />
            <Text style={styles.cardText}>{place.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  card: {
    width: '40%',
    padding: 20,
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#2d3e50',
  },
});

export default NearbyPlaces;