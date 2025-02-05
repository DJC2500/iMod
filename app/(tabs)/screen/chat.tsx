import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, FlatList, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Appbar, Avatar, TextInput, Text, IconButton } from 'react-native-paper';
import axios from 'axios';

function ChatScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', type: 'received', text: 'Looking forward to the trip.', avatar: require('../../../assets/images/canyon.jpg') }
  ]);

  const handleMessageChange = (text: string) => {
    setMessage(text);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return; // Prevent sending empty messages

    const newMessage = { id: Date.now().toString(), type: 'sent', text: message };
    setMessages((prevMessages) => [...prevMessages, newMessage]); // Add message to the list

    try {
      const response = await axios.post('http://192.168.100.217:3000/moses', { text: message });

      const botReply = {
        id: Date.now().toString() + '-bot',
        type: 'received',
        text: response.data.response,
        avatar: require('../../../assets/images/canyon.jpg'),
      };

      setMessages((prevMessages) => [...prevMessages, botReply]); // Add bot response
    } catch (error) {
      console.error('Error communicating with server', error);
    }

    setMessage(''); // Clear input field
  };

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
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          {/* App Bar */}
          <Appbar.Header style={styles.appbar}>
            <Appbar.BackAction onPress={() => router.back()} />
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
            keyboardShouldPersistTaps="handled"
          />

          {/* Message Input */}
          <View style={styles.inputContainer}>
            <TextInput
              label="Message"
              value={message}
              onChangeText={handleMessageChange}
              style={styles.input}
              placeholder="Type a message"
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
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  inner: { flex: 1 },
  appbar: { backgroundColor: '#F5F5F5' },
  chatContainer: { padding: 10 },
  messageContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  received: { alignSelf: 'flex-start' },
  sent: { alignSelf: 'flex-end', flexDirection: 'row-reverse' },
  bubble: { padding: 12, borderRadius: 20, maxWidth: '70%' },
  bubbleReceived: { backgroundColor: '#E0E0E0' },
  bubbleSent: { backgroundColor: '#336BFF' },
  avatar: { marginRight: 8 },
  messageText: { color: '#000' },
  systemMessage: { alignSelf: 'center', color: '#888', fontSize: 12, marginVertical: 10 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', padding: 10 },
  input: { flex: 1, color: '#000', backgroundColor: '#E0E0E0', borderRadius: 20, paddingHorizontal: 15, marginHorizontal: 10 },
  image: { width: 250, height: 150, borderRadius: 10, marginBottom: 5 },
});

export default ChatScreen;





{/* export default function App() {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');

  // Function to send the message to the server
  const sendMessage = async () => {
    try {
      const response = await axios.post('http://192.168.100.217:3000/moses', {
        text: inputText,
      });
      setResponseText(response.data.response);
    } catch (error) {
      setResponseText('Error communicating with server');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type your message"
        placeholderTextColor="#555"
        value={inputText}
        onChangeText={setInputText}
      />
      <Button title="Send" onPress={sendMessage} color="#007BFF" />
      {responseText ? <Text style={styles.response}>{responseText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF', // Light background
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#f5f5f5', // Light input background
    color: '#000', // Text color
  },
  response: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000', // Ensure response text is black
  },
}); */}
