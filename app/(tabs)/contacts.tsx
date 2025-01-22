import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Avatar, Text, TextInput, FAB, IconButton, Appbar, BottomNavigation } from 'react-native-paper';

const contacts = [
  { id: '1', name: 'Alicia', avatar: 'https://example.com/avatar1.jpg', letter: 'A' },
  { id: '2', name: 'Anthony', avatar: 'https://example.com/avatar2.jpg', letter: 'A' },
  { id: '3', name: 'Ben', avatar: 'https://example.com/avatar3.jpg', letter: 'B' },
  { id: '4', name: 'Bryan', avatar: 'https://example.com/avatar4.jpg', letter: 'B' },
  { id: '5', name: 'Brianna', avatar: 'https://example.com/avatar5.jpg', letter: 'B' },
  { id: '6', name: 'Cindy', avatar: 'https://example.com/avatar6.jpg', letter: 'C' },
  { id: '7', name: 'Daisy', avatar: 'https://example.com/avatar7.jpg', letter: 'D' },
  { id: '8', name: 'Diana', avatar: 'https://example.com/avatar8.jpg', letter: 'D' },
];

const ContactsScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const renderItem = ({ item }) => (
    <View style={styles.contactItem}>
      <Avatar.Image size={40} source={{ uri: item.avatar }} />
      <Text style={styles.contactName}>{item.name}</Text>
    </View>
  );

  const renderSeparator = (letter) => (
    <View style={styles.separator}>
      <Text style={styles.separatorText}>{letter}</Text>
    </View>
  );

  const groupedContacts = contacts.reduce((acc, contact) => {
    if (!acc[contact.letter]) acc[contact.letter] = [];
    acc[contact.letter].push(contact);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appBar}>
        <Text style={styles.headerTitle}>Contacts</Text>
        <IconButton icon="dots-vertical" onPress={() => {}} />
      </Appbar.Header>

      <TextInput
        mode="outlined"
        placeholder="Search"
        left={<TextInput.Icon icon="magnify" />}
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchBar}
      />

      {/* Contact List */}
      <FlatList
        data={Object.entries(groupedContacts).flatMap(([letter, items]) => [
          { id: letter, isSeparator: true, letter },
          ...items,
        ])}
        keyExtractor={(item) => (item.isSeparator ? item.letter : item.id)}
        renderItem={({ item }) =>
          item.isSeparator ? renderSeparator(item.letter) : renderItem({ item })
        }
        contentContainerStyle={styles.listContent}
      />

      {/* Floating Action Button */}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  appBar: {
    backgroundColor: '#F5F5F5',
    elevation: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'left',
    marginLeft: 16,
  },
  searchBar: {
    margin: 16,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  contactName: {
    marginLeft: 12,
    fontSize: 16,
  },
  separator: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 4,
  },
  separatorText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 80, // To leave space for bottom navigation
  },
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default ContactsScreen;
