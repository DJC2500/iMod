import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Avatar, List, FAB, BottomNavigation, TextInput } from "react-native-paper";
import { SafeAreaView } from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ChatScreen />
    </SafeAreaView>
  );
};

const ChatScreen = () => {
  const [searchText, setSearchText] = useState("");

  const chats = [
    { id: 1, name: "Bryan", message: "What do you think?", time: "4:30 PM", unread: 2 },
    { id: 2, name: "Kari", message: "Looks great!", time: "4:23 PM", unread: 1 },
    { id: 4, name: "Ben", message: "You sent a photo.", time: "3:58 PM", unread: 0 },
    { id: 5, name: "Naomi", message: "Naomi sent a photo.", time: "3:31 PM", unread: 0 },
  ];

  const renderChats = () => {
    return chats.map((chat) => (
      <List.Item
        key={chat.id}
        title={chat.name}
        description={chat.message}
        left={(props) => (
          <Avatar.Image
            {...props}
            source={{ uri: "https://i.pravatar.cc/48" }}
            size={48}
          />

        )}
        right={(props) => (
          <View style={styles.rightSection}>
            <Text style={styles.chatTime}>{chat.time}</Text>
            {chat.unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{chat.unread}</Text>
              </View>
            )}
          </View>
        )}
        onPress={() => console.log(`Open chat with ${chat.name}`)}
      />
    ));
  };

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "chats", title: "Chats", icon: "chat" },
    { key: "contacts", title: "Contacts", icon: "account" },
    { key: "settings", title: "Settings", icon: "cog" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    chats: () => (
      <View style={styles.container}>
        <TextInput
          mode="outlined"
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchBar}
          left={<TextInput.Icon icon="magnify" />}
        />
        {renderChats()}
        <FAB
          style={styles.fab}
          small
          icon="pencil"
          onPress={() => console.log("New chat")}
        />
      </View>
    ),
    contacts: () => (
      <View style={styles.centered}>
        <Text>Contacts Screen</Text>
      </View>
    ),
    settings: () => (
      <View style={styles.centered}>
        <Text>Settings Screen</Text>
      </View>
    ),
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  searchBar: {
    margin: 10,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "#6200ea",
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatScreen;