import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  // Mock data for our dashboard
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Design database schema', completed: true },
    { id: '2', title: 'Create UI Wireframes', completed: false },
    { id: '3', title: 'Setup CI/CD pipeline', completed: false },
    { id: '4', title: 'Team sync meeting', completed: false },
  ]);

  // Calculate stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  // Toggle task completion
  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, User 👋</Text>
            <Text style={styles.subtitle}>Here is your dashboard for today.</Text>
          </View>
          <TouchableOpacity style={styles.profileBtn}>
            <Ionicons name="person" size={24} color="#5E60CE" />
          </TouchableOpacity>
        </View>

        {/* Quick Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { borderTopColor: '#5E60CE' }]}>
            <Text style={styles.statNumber}>{totalTasks}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={[styles.statCard, { borderTopColor: '#48BFE3' }]}>
            <Text style={styles.statNumber}>{pendingTasks}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={[styles.statCard, { borderTopColor: '#52B788' }]}>
            <Text style={styles.statNumber}>{completedTasks}</Text>
            <Text style={styles.statLabel}>Done</Text>
          </View>
        </View>

        {/* Recent Tasks List */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Tasks</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.taskList}>
          {tasks.map(task => (
            <TouchableOpacity 
              key={task.id} 
              style={styles.taskItem} 
              onPress={() => toggleTask(task.id)}
              activeOpacity={0.7}
            >
              <Ionicons 
                name={task.completed ? "checkmark-circle" : "ellipse-outline"} 
                size={28} 
                color={task.completed ? "#52B788" : "#adb5bd"} 
              />
              <Text style={[styles.taskTitle, task.completed && styles.taskCompleted]}>
                {task.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <StatusBar style="dark" />
      </ScrollView>

      {/* Floating Action Button for adding tasks */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 100, // Make room for the floating action button
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212529',
  },
  subtitle: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: 4,
  },
  profileBtn: {
    width: 50,
    height: 50,
    backgroundColor: '#EAE4FF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    width: '31%',
    paddingVertical: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderTopWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  statNumber: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6C757D',
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
  },
  seeAll: {
    fontSize: 14,
    color: '#5E60CE',
    fontWeight: '600',
  },
  taskList: {
    gap: 12, // React Native supports gap in newer versions for spacing items
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  taskTitle: {
    fontSize: 16,
    color: '#343A40',
    marginLeft: 12,
    fontWeight: '500',
    flex: 1,
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    color: '#ADB5BD',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#5E60CE',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#5E60CE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
});
