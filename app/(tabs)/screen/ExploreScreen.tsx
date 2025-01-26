// import React, { useState } from "react";
// import { View, FlatList, StyleSheet, Pressable } from "react-native";
// import { Avatar, Text, TextInput } from "react-native-paper";
// import { Link, router } from "expo-router"; 

// type Profile = {
//   id: string;
//   name: string;
//   avatar: string;
// };

// const profiles: Profile[] = [
//   { id: "1", name: "Alicia", avatar: "https://i.pravatar.cc/150?u=1" },
//   { id: "2", name: "Anthony", avatar: "https://i.pravatar.cc/150?u=2" },
//   { id: "3", name: "Ben", avatar: "https://i.pravatar.cc/150?u=3" },
//   { id: "4", name: "Bryan", avatar: "https://i.pravatar.cc/150?u=4" },
//   { id: "5", name: "Brianna", avatar: "https://i.pravatar.cc/150?u=5" },
//   { id: "6", name: "Cindy", avatar: "https://i.pravatar.cc/150?u=6" },
//   { id: "7", name: "Daisy", avatar: "https://i.pravatar.cc/150?u=7" },
//   { id: "8", name: "Diana", avatar: "https://i.pravatar.cc/150?u=8" },
//   { id: "9", name: "Ethan", avatar: "https://i.pravatar.cc/150?u=9" },
// ];

// const ExploreScreen = () => {
//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredProfiles = profiles.filter((profile) =>
//     profile.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // const renderProfile = ({ item }: { item: Profile }) => (
//   //     <View style={styles.profileContainer}>
//   //             <Link href={`/screen/ProfileScreen`} asChild>
//   //       <Avatar.Image size={80} source={{ uri: item.avatar }} />
//   //       <Text style={styles.profileName} numberOfLines={1}>
//   //         {item.name}
//   //       </Text>
//   //           </Link>

//   //     </View>
//   // );

//   return (
//     <View style={styles.container}>
//       {/* Search Bar */}
//       <TextInput
//         mode="outlined"
//         placeholder="Search profiles"
//         left={<TextInput.Icon icon="magnify" />}
//         value={searchQuery}
//         onChangeText={setSearchQuery}
//         style={styles.searchBar}
//       />

//     <Pressable onPress={() => router.push("/screen/ProfileScreen")}>
//       <Text>Go to user 2</Text>
//     </Pressable>


//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F5F5F5",
//     paddingTop: 16,
//   },
//   searchBar: {
//     marginHorizontal: 16,
//     marginBottom: 16,
//   },
//   grid: {
//     paddingHorizontal: 8,
//   },
//   columnWrapper: {
//     justifyContent: "space-between",
//   },
//   profileContainer: {
//     alignItems: "center",
//     marginBottom: 16,
//     width: "30%", // Adjust width for a 3-column grid
//   },
//   profileName: {
//     marginTop: 8,
//     fontSize: 14,
//     textAlign: "center",
//   },
// });

// export default ExploreScreen;



import React, { useState } from "react";
import { View, FlatList, StyleSheet, Pressable } from "react-native";
import { Avatar, Text, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

type Profile = {
  id: string;
  name: string;
  avatar: string;
};

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
  const navigation = useNavigation(); // Use the useNavigation hook

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchQuery.toLowerCase())
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

      {/* Render profiles */}
      <FlatList
        data={filteredProfiles}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              // Use navigation.push to go to ProfileScreen
              navigation.push("screen/navigation", { userId: item.id });
            }}
          >
            <View style={styles.profileContainer}>
              <Avatar.Image size={80} source={{ uri: item.avatar }} />
              <Text style={styles.profileName} numberOfLines={1}>
                {item.name}
              </Text>
            </View>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.grid}
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
});

export default ExploreScreen;
