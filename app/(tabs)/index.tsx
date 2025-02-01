import React, { useState } from "react";
import { BottomNavigation } from "react-native-paper";
import ChatsScreen from "./screen/ChatsScreen";
import ExploreScreen from "./screen/ExploreScreen";
import SettingsScreen from "./screen/SettingsScreen";

const App = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "chats", title: "Chats", icon: "chat" },
    { key: "explore", title: "Explore", icon: "account" },
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
    />
  );
};

export default App;
