import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <Ionicons name="notifications-outline" size={50} color="#5908b4ff" style={{ marginBottom: 20 }} />
      <Text style={styles.title}>Your Notification Inbox</Text>
      <Text style={styles.subtitle}>Job applications, payment updates, and new gig alerts will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    padding: 20,
    backgroundColor: '#f0f4f7'
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 10
  },
  text: {
    fontSize: 14,
    color: '#999'
  }
});