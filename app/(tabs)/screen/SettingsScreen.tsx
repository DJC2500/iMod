import { Link } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Avatar, Button, List } from 'react-native-paper';

const SettingsScreen = () => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <Text variant="headlineLarge" style={styles.header}>
                Settings
            </Text>

            {/* Profile Section - Make this clickable */}
            <Link
                href="/screen/ProfileScreen?name=Daniel"
                asChild
            >
                <View style={styles.profileContainer}>
                    <Avatar.Image size={64} source={{ uri: 'https://via.placeholder.com/150' }} />
                    <View style={styles.profileText}>
                        <Text variant="titleLarge">Daniel</Text>
                    </View>
                </View>
            </Link>

            <Button mode="contained" style={styles.editButton}>
                Edit
            </Button>

            {/* Settings List */}
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

export default SettingsScreen;
