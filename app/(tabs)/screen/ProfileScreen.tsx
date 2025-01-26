import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Image } from 'react-native';
import { Avatar, IconButton, Divider, Appbar } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import { router } from "expo-router"; // Import router for navigation

// Consolidated Profile Screen component
const ProfileScreen = () => {
  const { id, name } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading period to enhance user experience
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ea" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Top App Bar */}
      <Appbar.Header style={styles.appBar}>
      <IconButton icon="arrow-left" onPress={() => router.back()} />
      <Text style={styles.headerTitle}>Profile</Text>
        <IconButton icon="dots-vertical" onPress={() => {}} />
      </Appbar.Header>

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Avatar.Image
          size={100}
          source={{ uri: 'https://i.pravatar.cc/150?u=' + id }} // Dynamic avatar URL
        />
        <Text style={styles.name}>{name || 'Unknown User'}</Text>
        <Text style={styles.phone}>+14844533842</Text>
      </View>

      {/* Actions Section */}
      <View style={styles.actionsContainer}>
        <IconButton
          icon="message-outline"
          size={30}
          onPress={() => {}}
          style={styles.actionButton}
        />
        <IconButton
          icon="phone-outline"
          size={30}
          onPress={() => {}}
          style={styles.actionButton}
        />
        <IconButton
          icon="bell-off-outline"
          size={30}
          onPress={() => {}}
          style={styles.actionButton}
        />
      </View>

      <Divider style={styles.divider} />

      {/* More Actions Section */}
      <Text style={styles.moreActions}>More actions</Text>
      <View style={styles.moreActionsContainer}>
        <IconButton icon="image-outline" size={20} onPress={() => {}} />
        <Text style={styles.moreActionText}>View media</Text>
      </View>
      <View style={styles.moreActionsContainer}>
        <IconButton icon="magnify" size={20} onPress={() => {}} />
        <Text style={styles.moreActionText}>Search in conversation</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  appBar: {
    backgroundColor: '#F5F5F5',
    elevation: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    flex: 1,
    textAlign: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 8,
  },
  phone: {
    fontSize: 16,
    color: 'gray',
    marginTop: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 24,
  },
  actionButton: {
    marginHorizontal: 10,
  },
  divider: {
    marginVertical: 16,
  },
  moreActions: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  moreActionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginHorizontal: 16,
  },
  moreActionText: {
    fontSize: 14,
    marginLeft: 8,
  },
});

export default ProfileScreen;
