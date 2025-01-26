import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";

const ProfileScreen = () => {
  const { id, name } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a brief loading period to smooth out navigation
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
      <Text style={styles.heading}>Profile Screen</Text>
      <Text>{`Chat ID: ${id}`}</Text>
      <Text>{`Name: ${name}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default ProfileScreen;
