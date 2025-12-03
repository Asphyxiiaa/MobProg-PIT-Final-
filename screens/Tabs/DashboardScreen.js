import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function DashboardScreen() {
  // ✅ Get 'jobs' and 'userRole' from the "Brain" (Context)
  const { userRole, isVerified, jobs } = useAuth();
  
  // ✅ FILTER LOGIC:
  // If Employer: Search the main list for jobs posted by "Me"
  const myPostedJobs = jobs.filter(job => job.postedBy === 'Me (Employer)');

  // WORKER: We will just keep the static list for "Applications" since we aren't saving those yet
  const myApplications = [
    { title: 'Tutor in Algebra', status: 'Applied' },
    { title: 'Garden Weeding', status: 'Accepted' }
  ];

  return (
    <View style={styles.container}>
      
      {/* 1. VERIFICATION BANNER */}
      {!isVerified && (
        <View style={styles.alertBanner}>
          <Ionicons name="warning-outline" size={20} color="#FF9500" />
          <Text style={styles.alertText}>Account not yet verified. Jobs may be limited.</Text>
        </View>
      )}

      {/* 2. PROFILE CARD */}
      <View style={styles.profileCard}>
        <Ionicons name="person-circle-outline" size={70} color="#5908b4ff" />
        <Text style={styles.userName}>Juan Dela Cruz</Text>
        <Text style={styles.userBarangay}>Barangay Agusan, Zone 1</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>{userRole}</Text>
        </View>
      </View>

      {/* 3. DYNAMIC LIST SECTION */}
      <Text style={styles.sectionHeader}>
        {userRole === 'Employer' ? 'Your Posted Jobs' : 'My Applications'}
      </Text>

      <ScrollView style={styles.listContainer}>
        
        {/* LOGIC: Render different lists based on Role */}
        {userRole === 'Employer' ? (
          // EMPLOYER VIEW: Show Dynamic Jobs from Context
          myPostedJobs.length > 0 ? (
            myPostedJobs.map((job) => (
              <View key={job.id} style={styles.listItem}>
                <View style={styles.listIconBox}>
                   <Ionicons name="briefcase-outline" size={24} color="#007AFF" />
                </View>
                <View style={styles.listContent}>
                  <Text style={styles.listTitle}>{job.title}</Text>
                  <Text style={styles.listSub}>{job.pay} • {job.category}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#ccc" />
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>You haven't posted any jobs yet.</Text>
          )
        ) : (
          // WORKER VIEW: Show Static Applications (Simulation)
          myApplications.map((app, index) => (
            <View key={index} style={styles.listItem}>
               <View style={[styles.listIconBox, {backgroundColor: '#FFF4E5'}]}>
                   <Ionicons name="document-text-outline" size={24} color="#FF9500" />
                </View>
              <View style={styles.listContent}>
                <Text style={styles.listTitle}>{app.title}</Text>
                <Text style={styles.listSub}>Status: {app.status}</Text>
              </View>
            </View>
          ))
        )}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f7' },
  
  alertBanner: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFBEA',
    padding: 15, marginBottom: 10,
  },
  alertText: { marginLeft: 10, color: '#FF9500', fontWeight: '600' },

  profileCard: {
    alignItems: 'center', backgroundColor: '#fff', padding: 25, margin: 15,
    borderRadius: 16, elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5
  },
  userName: { fontSize: 22, fontWeight: 'bold', marginTop: 10, color: '#333' },
  userBarangay: { fontSize: 14, color: '#666', marginBottom: 10 },
  roleBadge: { backgroundColor: '#f8d0cdff', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  roleText: { fontSize: 14, fontWeight: 'bold', color: '#ff0800ff' },

  sectionHeader: {
    fontSize: 18, fontWeight: 'bold', paddingHorizontal: 20, marginBottom: 10, color: '#444'
  },
  listContainer: { flex: 1, paddingHorizontal: 15 },
  
  listItem: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    padding: 15, borderRadius: 12, marginBottom: 10, elevation: 1
  },
  listIconBox: {
    width: 45, height: 45, borderRadius: 10, backgroundColor: '#E3F2FD',
    justifyContent: 'center', alignItems: 'center', marginRight: 15
  },
  listContent: { flex: 1 },
  listTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  listSub: { fontSize: 13, color: '#666', marginTop: 2 },
  
  emptyText: { textAlign: 'center', marginTop: 20, color: '#999', fontStyle: 'italic' }
});