import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

const Setup = () => {
  const router = useRouter();

  const handleCreateCircle = () => {
    router.push('/createCircle');
  };

  const handleJoinCircle = () => {
    router.push('/joinCircle');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Rape Alert</Text>
      <View style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          onPress={handleCreateCircle} 
          style={[styles.button, styles.createButton]}
        >
          Create Circle
        </Button>
        <Button 
          mode="outlined" 
          onPress={handleJoinCircle} 
          style={[styles.button, styles.joinButton]}
        >
          Join Circle
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F6FA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#5C6BC0', // Muted blue for title contrast
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    marginBottom: 20,
    borderRadius: 8,
  },
  createButton: {
    backgroundColor: '#6366F1',
    color: '#FFFFFF',
  },
  joinButton: {
    borderColor: '#6366F1',
    borderWidth: 1,
    color: '#6366F1',
  },
});

export default Setup;
