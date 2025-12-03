import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function LoginScreen() {
  const { login } = useAuth();
  const navigation = useNavigation();
  const [isWorker, setIsWorker] = useState(true);

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* BRANDING SECTION */}
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Ionicons name="flash" size={40} color="#5908b4ff" />
          </View>
          <Text style={styles.appName}>QuicKita</Text>
          <Text style={styles.tagline}>Your Neighborhood Marketplace</Text>
        </View>

        {/* ROLE TOGGLE (The "Segmented Control") this part need a bit of explaination */}
        <Text style={styles.label}>I am logging in as a:</Text>
        <View style={styles.toggleContainer}>
          <TouchableOpacity 
            style={[styles.toggleBtn, isWorker && styles.toggleBtnActive]} 
            onPress={() => setIsWorker(true)}
          >
            <Text style={[styles.toggleText, isWorker && styles.toggleTextActive]}>Worker</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.toggleBtn, !isWorker && styles.toggleBtnActive]} 
            onPress={() => setIsWorker(false)}
          >
            <Text style={[styles.toggleText, !isWorker && styles.toggleTextActive]}>Employer</Text>
          </TouchableOpacity>
        </View>

        {/* SAMPLE INPUTS */}
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput 
            style={styles.input} 
            placeholder="Email Address" 
            placeholderTextColor="#999"
            defaultValue="juan@example.com"
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
          <TextInput 
            style={styles.input} 
            placeholder="Password" 
            placeholderTextColor="#999" 
            secureTextEntry
            defaultValue="password123"
          />
        </View>

        {/* MAIN ACTION BUTTON */}
        <TouchableOpacity 
          style={styles.loginBtn} 
          onPress={() => login(isWorker ? 'Worker' : 'Employer')}
        >
          <Text style={styles.loginBtnText}>Log In</Text>
        </TouchableOpacity>

        {/* SECONDARY ACTION */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>New to QuicKita?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.linkText}> Create an Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', padding: 30 },
  
  header: { alignItems: 'center', marginBottom: 40 },
  logoCircle: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: '#e7dffaff',
    justifyContent: 'center', alignItems: 'center', marginBottom: 15
  },
  appName: { fontSize: 32, fontWeight: 'bold', color: '#5908b4ff', letterSpacing: 1 },
  tagline: { fontSize: 14, color: '#888', marginTop: 5 },

  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 10, marginLeft: 5 },
  
  toggleContainer: {
    flexDirection: 'row', backgroundColor: '#F0F0F0', borderRadius: 12, padding: 4, marginBottom: 25
  },
  toggleBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 8 },
  toggleBtnActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  toggleText: { fontWeight: '600', color: '#888' },
  toggleTextActive: { color: '##5908b4ff', fontWeight: 'bold' },

  inputContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9F9F9',
    borderRadius: 12, paddingHorizontal: 15, marginBottom: 15, borderWidth: 1, borderColor: '#EEE'
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, paddingVertical: 15, fontSize: 16, color: '#333' },

  loginBtn: {
    backgroundColor: '#5908b4ff', borderRadius: 12, paddingVertical: 16,
    alignItems: 'center', marginTop: 10, shadowColor: '#e7dffaff', shadowOpacity: 0.3, shadowRadius: 5, elevation: 5
  },
  loginBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30 },
  footerText: { color: '#666' },
  linkText: { color: '#5908b4ff', fontWeight: 'bold' }
});