import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, FlatList } from "react-native";
import { Avatar, List } from "react-native-paper";
import { useRouter } from "expo-router";

const ChatsScreen = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const chats = [
    { id: 1, name: "Bryan", message: "What do you think?", time: "4:30 PM", unread: 2 },
    { id: 2, name: "Kari", message: "Looks great!", time: "4:23 PM", unread: 1 },
    { id: 4, name: "Ben", message: "You sent a photo.", time: "3:58 PM", unread: 0 },
    { id: 5, name: "Naomi", message: "Naomi sent a photo.", time: "3:31 PM", unread: 0 },
  ];

  const handlePress = (chat) => {
    router.push({
      pathname: "/screen/chat",
      params: { id: chat.id, name: chat.name },
    });
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search chats..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)} activeOpacity={0.7}>
            <List.Item
              title={item.name}
              description={item.message}
              left={(props) => (
                <Avatar.Image {...props} source={{ uri: "https://i.pravatar.cc/48" }} size={48} />
              )}
              right={(props) => (
                <View style={styles.rightSection}>
                  <Text style={styles.chatTime}>{item.time}</Text>
                  {item.unread > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadText}>{item.unread}</Text>
                    </View>
                  )}
                </View>
              )}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  searchBar: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  rightSection: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginTop: 5,
  },
  chatTime: {
    color: "#999",
    fontSize: 12,
  },
  unreadBadge: {
    backgroundColor: "#6200ea",
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 5,
  },
  unreadText: {
    color: "#fff",
    fontSize: 12,
  },
});

export default ChatsScreen;
