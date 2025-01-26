import React, { useState } from "react";
import { View, FlatList, StyleSheet, Pressable } from "react-native";
import { Avatar, Text, TextInput } from "react-native-paper";
import { router } from "expo-router"; // Import router for navigation

// Define the Profile type
export type Profile = {
  id: string;
  name: string;
  avatar: string;
};

// Mock data for profiles
const profiles: Profile[] = [
  { id: "1", name: "Alicia", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: "2", name: "Anthony", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: "3", name: "Ben", avatar: "https://i.pravatar.cc/150?u=3" },
  { id: "4", name: "Bryan", avatar: "https://i.pravatar.cc/150?u=4" },
  { id: "5", name: "Brianna", avatar: "https://i.pravatar.cc/150?u=5" },
  { id: "6", name: "Cindy", avatar: "https://i.pravatar.cc/150?u=6" },
  { id: "7", name: "Daisy", avatar: "https://i.pravatar.cc/150?u=7" },
  { id: "8", name: "Diana", avatar: "https://i.pravatar.cc/150?u=8" },
  { id: "9", name: "Ethan", avatar: "https://i.pravatar.cc/150?u=9" },
];

const ExploreScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter profiles based on the search query
  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render individual profile cards
  const renderProfile = ({ item }: { item: Profile }) => (
    <Pressable
      onPress={() => {
        router.push({
          pathname: "/screen/ProfileScreen", // Navigate to ProfileScreen
          params: { id: item.id, name: item.name }, // Pass user ID as a parameter
        });
      }}
      style={styles.profileContainer}
    >
      <Avatar.Image size={80} source={{ uri: item.avatar }} />
      <Text style={styles.profileName} numberOfLines={1}>
        {item.name}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        mode="outlined"
        placeholder="Search profiles"
        left={<TextInput.Icon icon="magnify" />}
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchBar}
      />

      {/* Profile Grid */}
      <FlatList
        data={filteredProfiles}
        keyExtractor={(item) => item.id}
        renderItem={renderProfile}
        numColumns={3} // Display items in a grid with 3 columns
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.columnWrapper}
        ListEmptyComponent={<Text style={styles.emptyText}>No profiles found</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 16,
  },
  searchBar: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  grid: {
    paddingHorizontal: 8,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 16,
    width: "30%", // Adjust width for a 3-column grid
  },
  profileName: {
    marginTop: 8,
    fontSize: 14,
    textAlign: "center",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 16,
    color: "gray",
  },
});

export default ExploreScreen;
