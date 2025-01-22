import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Avatar, Button, List, BottomNavigation } from 'react-native-paper';

const SettingsScreen = () => {
    return (
        <View style={styles.container}>
            <Text variant="headlineLarge" style={styles.header}>
                Settings
            </Text>
            <View style={styles.profileContainer}>
                <Avatar.Image size={64} source={{ uri: 'https://via.placeholder.com/150' }} />
                <View style={styles.profileText}>
                    <Text variant="titleLarge">Daniel</Text>
                </View>
                <Button mode="contained" style={styles.editButton}>
                    Edit
                </Button>
            </View>

            <List.Section>
                <List.Subheader style={styles.subheader}>General</List.Subheader>
                <List.Item title="Notifications" left={() => <List.Icon icon="bell-outline" />} />
                <List.Item title="Appearance" left={() => <List.Icon icon="theme-light-dark" />} />
                <List.Item title="Privacy" left={() => <List.Icon icon="lock-outline" />} />
                <List.Item title="Storage & Data" left={() => <List.Icon icon="cloud-outline" />} />
                <List.Item title="About" left={() => <List.Icon icon="help-circle-outline" />} />
            </List.Section>
        </View>
    );
};

const BottomTabs = () => {
    const [index, setIndex] = React.useState(2);
    const [routes] = React.useState([
        { key: 'chats', title: 'Chats', icon: 'chat-outline' },
        { key: 'profile', title: 'Profile', icon: 'account-outline' },
        { key: 'settings', title: 'Settings', icon: 'cog-outline' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        chats: () => <Text>Chats Screen</Text>,
        profile: () => <Text>Profile Screen</Text>,
        settings: () => <SettingsScreen />,
    });

    return <BottomNavigation navigationState={{ index, routes }} onIndexChange={setIndex} renderScene={renderScene} />;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontWeight: 'bold',
        marginBottom: 20,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    profileText: {
        flex: 1,
        marginLeft: 15,
    },
    editButton: {
        backgroundColor: '#E3ECFF',
    },
    subheader: {
        color: '#1976D2',
        fontWeight: 'bold',
    },
});

export default BottomTabs;
