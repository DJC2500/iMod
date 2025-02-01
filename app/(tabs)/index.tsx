import React, { useState } from "react";
import { BottomNavigation } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Add this line

import ChatsScreen from "./screen/ChatsScreen";
import ExploreScreen from "./screen/ExploreScreen";
import SettingsScreen from "./screen/SettingsScreen";

const App = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "chats", title: "Chats", icon: "chat" },
    { key: "explore", title: "Explore", icon: "account-circle" },
    { key: "settings", title: "Settings", icon: "cog" },
  ]);



  const renderScene = BottomNavigation.SceneMap({
    chats: ChatsScreen,
    explore: ExploreScreen,
    settings: SettingsScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      renderIcon={({ route, color }) => {
        return <MaterialCommunityIcons name={route.icon} color={color} size={24} />;
      }}
      style={{ height: 60 }} // Adjust the height here
    />
  );
};

export default App;
