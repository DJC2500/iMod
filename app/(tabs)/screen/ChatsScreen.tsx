import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Avatar, List } from "react-native-paper";
import { useRouter } from "expo-router";

const ChatsScreen = () => {
  const router = useRouter();

  const chats = [
    { id: 1, name: "Bryan", message: "What do you think?", time: "4:30 PM", unread: 2 },
    { id: 2, name: "Kari", message: "Looks great!", time: "4:23 PM", unread: 1 },
    { id: 4, name: "Ben", message: "You sent a photo.", time: "3:58 PM", unread: 0 },
    { id: 5, name: "Naomi", message: "Naomi sent a photo.", time: "3:31 PM", unread: 0 },
  ];

  const handlePress = (chat) => {
    router.push({
      pathname: "/screen/chat",
    });
  };

  const renderChats = () => {
    return chats.map((chat) => (
      <TouchableOpacity
        key={chat.id}
        onPress={() => handlePress(chat)}
        activeOpacity={0.7} // Native-like press effect
      >
        <List.Item
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
        />
      </TouchableOpacity>
    ));
  };

  return <View style={styles.container}>{renderChats()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
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
