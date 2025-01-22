import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, List, Switch, Appbar } from 'react-native-paper';

const NotificationsScreen = () => {
    const [privateChats, setPrivateChats] = useState(true);
    const [groupChats, setGroupChats] = useState(false);
    const [doNotDisturb, setDoNotDisturb] = useState(false);
    const [chatBackup, setChatBackup] = useState(false);
    const [mute, setMute] = useState(false);
    const [block, setBlock] = useState(false);

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => { }} />
                <Appbar.Content title="Notifications" />
            </Appbar.Header>

            <List.Section>
                <Text style={styles.sectionTitle}>Message notifications</Text>

                <List.Item
                    title="Private chats"
                    right={() => (
                        <Switch
                            value={privateChats}
                            onValueChange={() => setPrivateChats(!privateChats)}
                        />
                    )}
                />

                <List.Item
                    title="Group chats"
                    right={() => (
                        <Switch
                            value={groupChats}
                            onValueChange={() => setGroupChats(!groupChats)}
                        />
                    )}
                />

                <List.Item
                    title="Do not disturb"
                    right={() => (
                        <Switch
                            value={doNotDisturb}
                            onValueChange={() => setDoNotDisturb(!doNotDisturb)}
                        />
                    )}
                />

                <List.Item
                    title="Chat backup"
                    right={() => (
                        <Switch
                            value={chatBackup}
                            onValueChange={() => setChatBackup(!chatBackup)}
                        />
                    )}
                />

                <List.Item
                    title="Mute"
                    right={() => (
                        <Switch
                            value={mute}
                            onValueChange={() => setMute(!mute)}
                        />
                    )}
                />

                <List.Item
                    title="Block"
                    right={() => (
                        <Switch
                            value={block}
                            onValueChange={() => setBlock(!block)}
                        />
                    )}
                />

            </List.Section>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    sectionTitle: {
        marginLeft: 20,
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4285F4',
    },
});

export default NotificationsScreen;
