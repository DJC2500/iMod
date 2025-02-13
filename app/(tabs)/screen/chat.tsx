import { router } from 'expo-router';
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, FlatList, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Appbar, Avatar, TextInput, Text, IconButton } from 'react-native-paper';

const WS_URL = "ws://ws://YOUR_EC2_PUBLIC_IP:8080"; // Replace with your EC2 WebSocket URL

function ChatScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ id: string, type: string, text: string }[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(WS_URL);

    ws.current.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      console.log(`Message from ${msg.sender}: ${msg.content}`);
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now().toString() + '-bot', type: 'received', text: msg.content }
      ]);
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket Error: ", error);
    };

    ws.current.onclose = () => {
      console.log("WebSocket Disconnected");
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (!message.trim() || !ws.current) return;

    const newMessage = {
      sender: "akkin",
      recipient: "divine",
      content: message,
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, { id: Date.now().toString(), type: 'sent', text: message }]);
    ws.current.send(JSON.stringify(newMessage));
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
