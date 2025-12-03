import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function JobDetailsScreen({ route, navigation }) {
  const { job } = route.params;
  const { userRole } = useAuth();
  const [hasApplied, setHasApplied] = useState(false);

  const handleApply = () => {
    if (userRole === 'Employer') {
      Alert.alert('Role Conflict', 'Employers cannot apply to jobs!');
      return;
    } // gotta review this part of code
    // Real application logic to save application
    setHasApplied(true);
    Alert.alert('Success!', `Applied for "${job.title}". The Employer will be notified.`);
  };

  const ApplicationButton = () => {
    if (userRole === 'Worker') {
      if (hasApplied) {
        return <Button title="Applied Successfully! ✅" disabled color="#28A745" />;
      }
      return <Button title="Apply Now" onPress={handleApply} color="#007AFF" />;
    }

    if (userRole === 'Employer') {
      return <Button title="You are the Employer of this job." disabled />;
    }
    
    return <Button title="Log in to Apply" onPress={() => navigation.navigate('Login')} />;
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{job.title}</Text>
        <View style={styles.badgeRow}>
          <Text style={styles.categoryBadge}>{job.category}</Text>
          <Text style={styles.payBadge}>{job.pay}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Details</Text>
          <Text style={styles.detailText}>
            <Ionicons name="location-outline" size={16} /> Location: Zone 3, Near Brgy Hall
          </Text>
          <Text style={styles.detailText}>
            <Ionicons name="calendar-outline" size={16} /> Date Posted: Nov 30, 2025
          </Text>
          <Text style={styles.detailText}>
            <Ionicons name="cash-outline" size={16} /> Payment Method: Cash / GCash
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Detailed Description</Text>
          <Text style={styles.description}>
            We need a reliable local to fix a persistent slow leak in our kitchen sink. Must bring own basic tools. Estimated 1-2 hours of work. Immediate payment upon satisfactory completion.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Employer Info</Text>
          <Text style={styles.employerInfo}>Posted by: {job.postedBy} (Verified)</Text>
          <Text style={styles.employerInfo}>Rating: ⭐️⭐️⭐️⭐️ (4.0)</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <ApplicationButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f7' },
  scrollContent: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#007AFF', marginBottom: 10 },
  badgeRow: { flexDirection: 'row', marginBottom: 20 },
  categoryBadge: {
    backgroundColor: '#FF9500',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 10,
    fontWeight: 'bold',
  },
  payBadge: {
    backgroundColor: '#333',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    fontWeight: 'bold',
  },
  section: { marginBottom: 20 },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 5, marginBottom: 10 },
  detailText: { fontSize: 16, marginBottom: 5 },
  description: { fontSize: 16, lineHeight: 24 },
  employerInfo: { fontSize: 14, color: '#666', marginTop: 5 },
  footer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  }
});