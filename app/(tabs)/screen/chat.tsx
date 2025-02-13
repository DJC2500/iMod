import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, FlatList, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Appbar, Avatar, TextInput, Text, IconButton } from 'react-native-paper';
import { wsService } from '../../../services/wsService'; 

function ChatScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ id: string, type: string, text: string }[]>([]);

  useEffect(() => {
    wsService.connect("ws://192.168.100.217:8080");

    wsService.onMessage((msg) => {
      console.log(`Message from ${msg.sender}: ${msg.content}`);
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now().toString() + '-bot', type: 'received', text: msg.content }
      ]);
    });

    return () => wsService.disconnect();
  }, []);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      sender: "akkin",
      recipient: "divine",
      content: message,
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    wsService.sendMessage(newMessage);
    setMessage('');
  };

  const renderMessage = ({ item }: { item: any }) => (
    <View style={[styles.messageContainer, item.type === 'sent' ? styles.sent : styles.received]}>
      <View style={[styles.bubble, item.type === 'sent' ? styles.bubbleSent : styles.bubbleReceived]}>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Appbar.Header style={styles.appbar}>
            <Appbar.BackAction onPress={() => router.back()} />
            <Avatar.Image size={40} source={require('../../../assets/images/canyon.jpg')} />
            <Appbar.Content title="Bryan" />
          </Appbar.Header>

          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            contentContainerStyle={styles.chatContainer}
          />

          <View style={styles.inputContainer}>
            <TextInput label="Message" value={message} onChangeText={setMessage} style={styles.input} />
            <IconButton icon="send" size={24} iconColor="blue" onPress={handleSendMessage} disabled={!message.trim()} />
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
  messageText: { color: '#000' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', padding: 10 },
  input: { flex: 1, backgroundColor: '#E0E0E0', borderRadius: 20, paddingHorizontal: 15 },
});

export default ChatScreen;
