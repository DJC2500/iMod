import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Dialog, Portal, Text, IconButton } from 'react-native-paper';

const DeleteConversationDialog = () => {
    const [visible, setVisible] = useState(true);

    const hideDialog = () => setVisible(false);

    return (
        <View style={styles.container}>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
                    <Dialog.Icon icon="delete" size={40} color="#4285F4" />
                    <Dialog.Title style={styles.title}>Delete conversation?</Dialog.Title>
                    <Dialog.Content>
                        <Text style={styles.content}>
                            This conversation will be removed from all your synced devices. This action cannot be undone.
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button textColor="#4285F4" onPress={hideDialog}>
                            Cancel
                        </Button>
                        <Button textColor="#4285F4" onPress={() => console.log('Delete conversation')}>
                            Delete
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dialog: {
        borderRadius: 15,
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
    },
});

export default DeleteConversationDialog;