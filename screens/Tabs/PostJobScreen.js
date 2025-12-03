import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Alert, TouchableOpacity, Platform } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Picker } from '@react-native-picker/picker'; 
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function PostJobScreen({ navigation }) {
  const { userRole, addJob } = useAuth(); 
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Household Chores');
  const [pay, setPay] = useState('');
  const [payMethod, setPayMethod] = useState('Cash');

  // Guard Clause
  if (userRole !== 'Employer') {
    return (
      <View style={styles.deniedContainer}>
        <Ionicons name="lock-closed-outline" size={60} color="#FF3B30" />
        <Text style={styles.deniedTitle}>Access Restricted</Text>
        <Text style={styles.deniedText}>Only Employers can post new gigs.</Text>
      </View>
    );
  }

  const handlePost = () => {
    // 1. Validation
    if (!title || !pay) {
      // Use a simple alert that works on Web and Mobile
      if (Platform.OS === 'web') {
        alert('Please fill in the Job Title and Pay Amount.');
      } else {
        Alert.alert('Missing Fields', 'Please fill in the Job Title and Pay Amount.');
      }
      return;
    }

    // 2. Create the Job Object
    const newJob = {
      id: Date.now().toString(),
      title: title,
      category: category,
      pay: isNaN(pay) ? pay : `₱${pay}`, 
      postedBy: 'Me (Employer)',
      location: 'Brgy Agusan (Verified)',
      time: 'Just Now'
    };

    // 3. Update State
    addJob(newJob);

    // 4. Reset Form & Give Feedback IMMEDIATELY
    setTitle('');
    setPay('');

    // 5. Navigate & Notify
    // We navigate FIRST so the user sees the new job in the feed immediately.
    navigation.navigate('Home');

    if (Platform.OS === 'web') {
      // Small delay on web to ensure navigation happens smoothly
      setTimeout(() => alert('Success! Your gig has been posted.'), 100);
    } else {
      Alert.alert('Success!', 'Your gig has been posted to the feed.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>Post a New Gig</Text>
      <Text style={styles.headerSubtitle}>Fill in the details to find a worker.</Text>

      {/* JOB TITLE INPUT */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Job Title</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="briefcase-outline" size={20} color="#666" style={styles.icon} />
          <TextInput 
            style={styles.input} 
            value={title} 
            onChangeText={setTitle} 
            placeholder="e.g. Fix Leaky Faucet"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* CATEGORY PICKER (FIXED UI) */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Category</Text>
        <View style={styles.pickerContainer}>
          <Picker 
            selectedValue={category} 
            onValueChange={setCategory}
            style={styles.picker} // Added specific style for the picker itself
          >
            {['Household Chores', 'Tutoring', 'Errands', 'Carpentry', 'Plumbing', 'Electrical', 'Gardening'].map(cat => (
              <Picker.Item label={cat} value={cat} key={cat} style={styles.pickerItem} />
            ))}
          </Picker>
        </View>
      </View>
      
      {/* PAY AMOUNT INPUT */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Pay Amount (₱)</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="cash-outline" size={20} color="#666" style={styles.icon} />
          <TextInput 
            style={styles.input} 
            value={pay} 
            onChangeText={setPay} 
            keyboardType="numeric"
            placeholder="e.g. 500" 
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* PAYMENT METHOD PICKER (FIXED UI) */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Payment Method</Text>
        <View style={styles.pickerContainer}>
          <Picker 
            selectedValue={payMethod} 
            onValueChange={setPayMethod}
            style={styles.picker}
          >
            <Picker.Item label="Cash" value="Cash" style={styles.pickerItem} />
            <Picker.Item label="GCash" value="GCash" style={styles.pickerItem} />
            <Picker.Item label="Maya" value="Maya" style={styles.pickerItem} />
          </Picker>
        </View>
      </View>

      {/* POST BUTTON */}
      <TouchableOpacity style={styles.postButton} onPress={handlePost}>
        <Text style={styles.postButtonText}>Publish Gig</Text>
      </TouchableOpacity>
      
      <View style={{height: 50}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 25, backgroundColor: '#fff' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  headerSubtitle: { fontSize: 16, color: '#666', marginBottom: 30 },

  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8, marginLeft: 5 },
  
  inputContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9F9F9',
    borderRadius: 12, paddingHorizontal: 15, borderWidth: 1, borderColor: '#EEE',
    height: 50, // Fixed height for consistency
  },
  icon: { marginRight: 10 },
  input: { flex: 1, height: '100%', fontSize: 16, color: '#333' },

  // ✅ FIXED: Picker Container now forces the border look
  pickerContainer: {
    backgroundColor: '#F9F9F9', borderRadius: 12, borderWidth: 1, borderColor: '#EEE',
    overflow: 'hidden', height: 50, justifyContent: 'center'
  },
  // ✅ FIXED: Picker fills the container properly
  picker: {
    width: '100%', height: '100%', color: '#333', backgroundColor: 'transparent'
  },
  pickerItem: { fontSize: 14 }, // Helps on Android

  postButton: {
    backgroundColor: '#007AFF', borderRadius: 12, paddingVertical: 18,
    alignItems: 'center', marginTop: 10, shadowColor: '#007AFF', 
    shadowOpacity: 0.3, shadowRadius: 5, elevation: 5
  },
  postButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

  deniedContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  deniedTitle: { fontSize: 22, fontWeight: 'bold', color: '#333', marginTop: 20 },
  deniedText: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 10 }
});