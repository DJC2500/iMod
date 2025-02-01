import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, FlatList, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Appbar, Avatar, TextInput, Text, IconButton } from 'react-native-paper';

function ChatScreen() {
  const [message, setMessage] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const handleMessageChange = (text: string) => {
    setMessage(text);
  };

  const handleSendMessage = () => {
    // Handle sending the message
    setMessage(''); // Reset message input after sending
  };

  // Monitor keyboard visibility to handle screen layout
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    // Clean up listeners
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  // Define message data
  const messages = [
    { id: '1', type: 'received', text: 'Looking forward to the trip.', avatar: require('../../../assets/images/canyon.jpg') },
    { id: '2', type: 'sent', text: 'Same! Can’t wait.' },
    { id: '3', type: 'system', text: 'Today 8:43 AM' },
    {
      id: '4',
      type: 'received',
      text: 'Antelope canyon guide tour\nairbnb.com',
      image: require('../../../assets/images/canyon.jpg'),
      avatar: require('../../../assets/images/canyon.jpg')
    },
    { id: '5', type: 'received', text: 'What do you think?', avatar: require('../../../assets/images/canyon.jpg') },
    { id: '6', type: 'sent', text: 'Oh yes this looks great!' }
  ];

  // Render message items
  const renderMessage = ({ item }: { item: any; }) => {
    if (item.type === 'system') {
      return <Text style={styles.systemMessage}>{item.text}</Text>;
    }
    return (
      <View style={[styles.messageContainer, item.type === 'sent' ? styles.sent : styles.received]}>
        {item.avatar && <Avatar.Image size={40} source={item.avatar} style={styles.avatar} />}
        <View style={[styles.bubble, item.type === 'sent' ? styles.bubbleSent : styles.bubbleReceived]}>
          {item.image && <Image source={item.image} style={styles.image} />}
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.inner}>
          {/* App Bar */}
          <Appbar.Header style={styles.appbar}>
            <Appbar.BackAction onPress={() => { router.back() }} />
            <Avatar.Image size={40} source={require('../../../assets/images/canyon.jpg')} />
            <Appbar.Content title="Bryan" />
            <Appbar.Action icon="phone" onPress={() => { }} />
            <Appbar.Action icon="magnify" onPress={() => { }} />
            <Appbar.Action icon="dots-vertical" onPress={() => { }} />
          </Appbar.Header>

          {/* Messages List */}
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            contentContainerStyle={styles.chatContainer}
            keyboardShouldPersistTaps="handled" />

          {/* Message Input */}
          <View style={styles.inputContainer}>
            <TextInput
              label="Message"
              value={message}
              onChangeText={handleMessageChange}
              style={styles.input}
              placeholder="Type a message"
              autoFocus={true} // Ensure the input is focused by default
            />
            <IconButton
              icon="send"
              size={24}
              iconColor={message.trim() ? "blue" : "grey"}
              onPress={handleSendMessage}
              disabled={!message.trim()}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Light background
  },
  inner: {
    flex: 1,
  },
  appbar: {
    backgroundColor: '#F5F5F5', // Light app bar background
  },
  chatContainer: {
    padding: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  received: {
    alignSelf: 'flex-start',
  },
  sent: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  bubble: {
    padding: 12,
    borderRadius: 20,
    maxWidth: '70%',
  },
  bubbleReceived: {
    backgroundColor: '#E0E0E0', // Beautify white
  },
  bubbleSent: {
    backgroundColor: '#336BFF', // Turquiose blue
  },
  avatar: {
    marginRight: 8,
  },
  messageText: {
    color: '#000000', // Dark text for better contrast
  },
  systemMessage: {
    alignSelf: 'center',
    color: '#888',
    fontSize: 12,
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', // Lighter input container
    padding: 10,
  },
  input: {
    flex: 1,
    color: '#000',
    backgroundColor: '#E0E0E0', // Lighter background for the input field
    borderRadius: 20,
    paddingHorizontal: 15,
    marginHorizontal: 10,
  },
  image: {
    width: 250,
    height: 150,
    borderRadius: 10,
    marginBottom: 5,
  },
});

export default ChatScreen;