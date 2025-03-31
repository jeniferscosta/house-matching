import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Swipeable } from 'react-native-gesture-handler';

const Notification = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('notifications');
  const [filter, setFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState([]);

  const mockData = [
    { id: '1', type: 'notifications', text: 'Você tem uma nova correspondência de imóvel!', read: false },
    { id: '2', type: 'notifications', text: 'Novo imóvel disponível na sua região.', read: true },
    { id: '3', type: 'messages', text: 'Sua conta foi atualizada com sucesso.', read: true },
    { id: '4', type: 'messages', text: 'Lembrete: Visita marcada para amanhã.', read: false },
  ];

  const filteredNotifications = [
    {
      id: 'n1',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=100&q=80',
      propertyId: 'p101',
      read: false,
    },
    {
      id: 'n2',
      image: 'https://images.unsplash.com/photo-1560185008-cb6b36a1f972?auto=format&fit=crop&w=100&q=80',
      propertyId: 'p102',
      read: true,
    },
    {
      id: 'n3',
      image: 'https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=100&q=80',
      propertyId: 'p103',
      read: false,
    },
    {
      id: 'n4',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=100&q=80',
      propertyId: 'p104',
      read: true,
    },
  ];

  const filteredMessages = [
    {
      id: 'm1',
      sender: 'Ana Oliveira',
      senderImage: 'https://randomuser.me/api/portraits/women/45.jpg',
      text: 'Olá! Encontrei uma casa que pode te interessar.',
      read: false,
    },
    {
      id: 'm2',
      sender: 'João Silva',
      senderImage: 'https://randomuser.me/api/portraits/men/32.jpg',
      text: 'Bom dia! Você já viu os novos apartamentos em oferta?',
      read: true,
    },
    {
      id: 'm3',
      sender: 'Equipe HouseMatching',
      senderImage: 'https://randomuser.me/api/portraits/lego/5.jpg',
      text: 'Sua conta foi atualizada com sucesso!',
      read: true,
    },
    {
      id: 'm4',
      sender: 'Marina Costa',
      senderImage: 'https://randomuser.me/api/portraits/women/68.jpg',
      text: 'Tenho uma sugestão de imóvel com ótima localização.',
      read: false,
    },
  ];

  const filterData = (data, filter) => {
    return data
      .filter((item) => {
        if (filter === 'all') return true;
        if (filter === 'new') return !item.read;
        if (filter === 'read') return item.read;
      })
      .sort((a, b) => Number(a.read) - Number(b.read));
  };

  const filteredList = filterData(filteredNotifications, filter);
  const filteredMessagesList = filterData(filteredMessages, filter);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    Alert.alert('Deletar', `Você quer deletar ${selectedIds.length} item(s)?`);
  };

  const handleDeleteItem = (id) => {
    Alert.alert('Deletar', 'Você quer deletar este item?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Deletar', onPress: () => console.log(`Item ${id} deletado`) },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'notifications' && styles.tabButtonSelected,
          ]}
          onPress={() => setActiveTab('notifications')}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === 'notifications' && styles.tabButtonTextSelected,
            ]}
          >
            Notifications
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'messages' && styles.tabButtonSelected,
          ]}
          onPress={() => setActiveTab('messages')}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === 'messages' && styles.tabButtonTextSelected,
            ]}
          >
            Messages
          </Text>
        </TouchableOpacity>
      </View>

      {/* Filter */}
      <View style={styles.filterContainer}>
        {['all', 'new', 'read'].map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setFilter(item)}
            style={[
              styles.filterButton,
              filter === item
                ? styles.filterButtonActive
                : styles.filterButtonInactive,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                filter === item ? styles.filterTextActive : styles.filterTextInactive,
              ]}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Delete button */}
      {selectedIds.length > 0 && (
        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
          <Icon name="delete" size={24} color="#FF4D4D" />
        </TouchableOpacity>
      )}

      {/* Lista */}
      {activeTab === 'notifications' && (
        <View style={styles.tabContent}>
          <Text style={styles.sectionTitle}>
            {filter === 'new'
              ? 'New Notifications'
              : filter === 'read'
              ? 'Read Notifications'
              : 'All Notifications'}
          </Text>

          {filteredList.map((item) => {
            const isSelected = selectedIds.includes(item.id);

            return (
              <Swipeable
                key={item.id}
                renderRightActions={() => (
                  <TouchableOpacity
                    style={styles.SwipeDelete}
                    onPress={() => handleDeleteItem(item.id)}
                  >
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                )}
              >
                <TouchableOpacity
                  style={[
                    styles.notificationCard,
                    isSelected && styles.selectedItem,
                  ]}

                  onPress={() => navigation.navigate('PropertyDetails', { propertyId: item.propertyId })}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles.notificationImage}
                  />
                  <View style={styles.notificationTextContainer}>
                    <Text
                      style={[
                        styles.notificationText,
                        isSelected && { color: '#fff' },
                      ]}
                    >
                      You have a property match.
                    </Text>
                    <Text
                      style={[
                        styles.notificationTextSecondary,
                        isSelected && { color: '#fff' },
                      ]}
                    >
                      Click here for more details.
                    </Text>
                  </View>
                </TouchableOpacity>
              </Swipeable>
            );
          })}
        </View>
      )}

      {activeTab === 'messages' && (
        <View style={styles.tabContent}>
          <Text style={styles.sectionTitle}>
            {filter === 'new'
              ? 'New Messages'
              : filter === 'read'
              ? 'Read Messages'
              : 'All Messages'}
          </Text>

          {filteredMessagesList.map((item) => {
            const isSelected = selectedIds.includes(item.id);
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.messageCard,
                  { backgroundColor: isSelected ? '#234F68' : '#F5F4F8' },
                ]}
                onPress={() => toggleSelect(item.id)}
              >
                <View style={styles.messageHeader}>
                  <Image
                    source={{ uri: item.senderImage }}
                    style={styles.senderImage}
                  />
                  <View style={styles.senderInfo}>
                    <View style={styles.senderRow}>
                      <Text
                        style={[
                          styles.messageSender,
                          isSelected && { color: '#fff' },
                        ]}
                      >
                        {item.sender}
                      </Text>
                      {!item.read && <View style={styles.unreadDot} />}
                    </View>
                    <Text
                      style={[
                        styles.messageText,
                        isSelected && { color: '#fff' },
                      ]}
                    >
                      {item.text}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // branco
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F4F8',
    borderRadius: 16,
    padding: 4,
    marginHorizontal: 24,
    marginTop: 46,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deleteButton: {
    alignSelf: 'flex-end',
    marginRight: 16,
    marginTop: 8,
    padding: 8,
    backgroundColor: '#F5F4F8',
    borderRadius: 20,
  },
  selectedItem: {
    backgroundColor: '#234F68',
    borderRadius: 12,
  },
  tabButton: {
    backgroundColor: '#F5F4F8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  tabButtonText: {
    fontSize: 14,
    color: '#1F4C6B',
    fontFamily: 'Lato-Bold',
  },
  tabButtonSelected: {
    backgroundColor: '#234F68',
  },
  tabButtonTextSelected: {
    color: '#fff',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    borderRadius: 20,
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 24,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  filterButtonActive: {
    backgroundColor: '#234F68',
  },
  filterButtonInactive: {
    backgroundColor: '#F5F4F8',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#FFF',
  },
  filterTextInactive: {
    color: '#1F4C6B',
  },
  tabContent: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Lato-Bold',
    color: '#1F4C6B',
    marginBottom: 8,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E4E3E8',
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  notificationImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  notificationText: {
    flex: 1,
    fontSize: 16,
    color: '#252B5C',
    fontFamily: 'Lato-bold',
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationTextSecondary: {
    fontSize: 12,
    color: '#234F68',
    marginTop: 2,
    marginBottom: 20,
  },
  messageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginHorizontal: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    gap: 12,
    marginHorizontal: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  messageSender: {
    fontSize: 14,
    fontFamily: 'Lato-Bold',
    color: '#1F4C6B',
  },
  messageText: {
    marginTop: 4,
    fontSize: 13,
    fontFamily: 'Lato-Regular',
    color: '#1F4C6B',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8BC83F',
    marginLeft: 8,
  },
  senderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  senderInfo: {
    flex: 1,
  },
  senderImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  selectedText: {
    color: '#FFFFFF',
  },
});
