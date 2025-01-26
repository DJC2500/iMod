// import React, { useState } from "react";
// import { Link, router} from "expo-router"
// import { View, StyleSheet, Text } from "react-native";
// import { Avatar, List } from "react-native-paper";

// const ChatsScreen = () => {
//   const [searchText, setSearchText] = useState("");

//   const chats = [
//     { id: 1, name: "Bryan", message: "What do you think?", time: "4:30 PM", unread: 2 },
//     { id: 2, name: "Kari", message: "Looks great!", time: "4:23 PM", unread: 1 },
//     { id: 4, name: "Ben", message: "You sent a photo.", time: "3:58 PM", unread: 0 },
//     { id: 5, name: "Naomi", message: "Naomi sent a photo.", time: "3:31 PM", unread: 0 },
//   ];

//   const renderChats = () => {
//     return chats.map((chat) => (
//       <List.Item
//         key={chat.id}
//         title={chat.name}
//         description={chat.message}
//         left={(props) => (
//           <Avatar.Image
//             {...props}
//             source={{ uri: "https://i.pravatar.cc/48" }}
//             size={48}
//           />
//         )}
//         right={(props) => (
//           <View style={styles.rightSection}>
//             <Text style={styles.chatTime}>{chat.time}</Text>
//             {chat.unread > 0 && (
//               <View style={styles.unreadBadge}>
//                 <Text style={styles.unreadText}>{chat.unread}</Text>
//               </View>
//             )}
//           </View>
//         )}
//         onPress={() => console.log(`Open chat with ${chat.name}`)}
//       />
//     ));
//     <Link href={"/Screen/ProfileScreen"}></Link>
//   };

//   return <View style={styles.container}>{renderChats()}</View>;
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f4f4f4",
//   },
//   rightSection: {
//     alignItems: "flex-end",
//     justifyContent: "center",
//     marginTop: 5,
//   },
//   chatTime: {
//     color: "#999",
//     fontSize: 12,
//   },
//   unreadBadge: {
//     backgroundColor: "#6200ea",
//     borderRadius: 12,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     marginTop: 5,
//   },
//   unreadText: {
//     color: "#fff",
//     fontSize: 12,
//   },
// });

// export default ChatsScreen;



import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { Avatar, List } from "react-native-paper";
import { Link, router } from "expo-router"; 

const ChatsScreen = () => {
  const [searchText, setSearchText] = useState("");

  const chats = [
    { id: 1, name: "Bryan", message: "What do you think?", time: "4:30 PM", unread: 2 },
    { id: 2, name: "Kari", message: "Looks great!", time: "4:23 PM", unread: 1 },
    { id: 4, name: "Ben", message: "You sent a photo.", time: "3:58 PM", unread: 0 },
    { id: 5, name: "Naomi", message: "Naomi sent a photo.", time: "3:31 PM", unread: 0 },
  ];


  const renderChats = () => {
  
    return chats.map((chat) => (
      <Pressable
        key={chat.id}
        onPress={() => {
          router.push("/screen/ProfileScreen"); // Use router.push for navigation
        }}
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
      </Pressable>
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
