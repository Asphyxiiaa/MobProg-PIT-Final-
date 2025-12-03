import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; 
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SignupScreen() {
  const [role, setRole] = useState(null); 
  const [proofUri, setProofUri] = useState(null);
  const navigation = useNavigation();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Need access to gallery to upload Proof of Residence.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, aspect: [4, 3], quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProofUri(result.assets[0].uri);
    }
  };

  const handleSignup = () => {
    if (!role || !proofUri) {
      Alert.alert('Missing Info', 'Please select a role and upload Proof of Residence.');
      return;
    }
    Alert.alert('Success', 'Account created! Please Log In to continue verification.');
    navigation.navigate('Login');
  };

  // Role Selection
  const RoleCard = ({ title, icon, value }) => (
    <TouchableOpacity 
      style={[styles.roleCard, role === value && styles.roleCardActive]}
      onPress={() => setRole(value)}
    >
      <Ionicons name={icon} size={30} color={role === value ? '#5908b4ff' : '#999'} />
      <Text style={[styles.roleText, role === value && styles.roleTextActive]}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>Create Account</Text>
      <Text style={styles.headerSubtitle}>Join your neighborhood community.</Text>
      
      {/* 1. SELECT ROLE */}
      <Text style={styles.sectionTitle}>1. Choose your primary role</Text>
      <View style={styles.roleContainer}>
        <RoleCard title="Worker" icon="hammer-outline" value="Worker" />
        <RoleCard title="Employer" icon="briefcase-outline" value="Employer" />
      </View>

      {/* 2. VERIFICATION */}
      <Text style={styles.sectionTitle}>2. Verify Residence (Barangay)</Text>
      <Text style={styles.helperText}>Upload a clear photo of your Valid ID or Barangay Clearance.</Text>
      
      <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
        {proofUri ? (
          <Image source={{ uri: proofUri }} style={styles.uploadedImage} />
        ) : (
          <>
            <Ionicons name="cloud-upload-outline" size={40} color="#5908b4ff" />
            <Text style={styles.uploadText}>Tap to Upload ID</Text>
          </>
        )}
      </TouchableOpacity>

      {/* 3. SUBMIT */}
      <TouchableOpacity 
        style={[styles.submitBtn, (!role || !proofUri) && styles.submitBtnDisabled]} 
        onPress={handleSignup}
        disabled={!role || !proofUri}
      >
        <Text style={styles.submitBtnText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{alignSelf: 'center', marginTop: 20}}>
        <Text style={{color: '#666'}}>Already have an account? <Text style={{color: '#5908b4ff', fontWeight: 'bold'}}>Log In</Text></Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 25, backgroundColor: '#fff', paddingBottom: 50 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  headerSubtitle: { fontSize: 16, color: '#666', marginBottom: 30 },
  
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 15, marginTop: 10 },
  helperText: { fontSize: 14, color: '#666', marginBottom: 10 },

  roleContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  roleCard: {
    width: '48%', backgroundColor: '#f9f9f9ff', padding: 20, borderRadius: 12,
    alignItems: 'center', borderWidth: 2, borderColor: 'transparent'
  },
  roleCardActive: { borderColor: '#5908b4ff', backgroundColor: '#e7dffaff' },
  roleText: { marginTop: 10, fontWeight: '600', color: '#666' },
  roleTextActive: { color: '#5908b4ff', fontWeight: 'bold' },

  uploadBox: {
    height: 180, borderStyle: 'dashed', borderWidth: 2, borderColor: '#CCC',
    borderRadius: 12, justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#FAFAFA', marginBottom: 30
  },
  uploadText: { marginTop: 10, color: '#5908b4ff', fontWeight: '600' },
  uploadedImage: { width: '100%', height: '100%', borderRadius: 10 },

  submitBtn: {
    backgroundColor: '#5908b4ff', padding: 18, borderRadius: 12, alignItems: 'center',
    shadowColor: '#5908b4ff', shadowOpacity: 0.3, shadowRadius: 5, elevation: 4
  },
  submitBtnDisabled: { backgroundColor: '#d6c7f8ff', shadowOpacity: 0 },
  submitBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});