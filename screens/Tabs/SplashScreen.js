import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Ionicons name="flash" size={80} color="#fff" style={styles.icon} />
      
      {/* App Name */}
      <Text style={styles.title}>QuicKita</Text>
      <Text style={styles.subtitle}>Hyper-local Job Marketplace</Text>

      {/* Loading Spinner */}
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF9500" /> 
        <Text style={styles.loadingText}>Loading neighborhood...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5908b4ff', // Primary Indigo Color
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E0E0',
    marginBottom: 50,
    fontStyle: 'italic',
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 12,
  }
});