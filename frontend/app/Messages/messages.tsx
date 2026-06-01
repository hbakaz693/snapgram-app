import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const GREEN = '#0a7a3d';

// Remplace cette IP par l'adresse IPv4 de ton PC.
const API_URL = 'http://10.109.145.181:8080';

type Conversation = {
  id: string;
  user: string;
  avatar: string;
  lastMsg: string;
  time: string;
  unread: number;
  online: boolean;
};

export default function MessagesScreen() {
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchConversations = async () => {
    try {
      const response = await fetch(`${API_URL}/api/messages/conversations`);

      if (!response.ok) {
        throw new Error(`Erreur backend: ${response.status}`);
      }

      const data = await response.json();
      setConversations(data);
    } catch (error) {
      console.log('Erreur conversations:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchConversations();
  }, []);

  const filtered = conversations.filter((c) =>
    c.user.toLowerCase().includes(search.toLowerCase())
  );

  const openChat = (item: Conversation) => {
  router.push(`/Chat/${item.id}` as any);
};
  const renderItem = ({ item }: { item: Conversation }) => (
    <TouchableOpacity
      style={styles.row}
      activeOpacity={0.7}
      onPress={() => openChat(item)}
    >
      <View style={styles.avatarWrapper}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        {item.online && <View style={styles.onlineDot} />}
      </View>

      <View style={styles.textBlock}>
        <Text style={styles.username}>{item.user}</Text>

        <Text
          style={[styles.lastMsg, item.unread > 0 && styles.lastMsgBold]}
          numberOfLines={1}
        >
          {item.lastMsg}
        </Text>
      </View>

      <View style={styles.rightBlock}>
        <Text style={styles.time}>{item.time}</Text>

        {item.unread > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.unread}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>

        <TouchableOpacity activeOpacity={0.7}>
          <Ionicons name="create-outline" size={24} color="#222" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchWrapper}>
        <Ionicons
          name="search-outline"
          size={16}
          color="#999"
          style={styles.searchIcon}
        />

        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher..."
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={GREEN} />
          <Text style={styles.loadingText}>Chargement des conversations...</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons name="chatbubbles-outline" size={48} color="#ccc" />
              <Text style={styles.emptyText}>Aucune conversation trouvée</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderColor: '#e0e0e0',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111',
  },

  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },

  listContent: {
    paddingTop: 4,
    paddingBottom: 20,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  avatarWrapper: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: GREEN,
    borderWidth: 2,
    borderColor: '#fff',
  },

  textBlock: {
    flex: 1,
  },
  username: {
    fontWeight: '700',
    fontSize: 14,
    color: '#111',
    marginBottom: 3,
  },
  lastMsg: {
    fontSize: 13,
    color: '#888',
  },
  lastMsgBold: {
    color: '#333',
    fontWeight: '600',
  },

  rightBlock: {
    alignItems: 'flex-end',
    minWidth: 40,
  },
  time: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 6,
  },
  badge: {
    backgroundColor: GREEN,
    borderRadius: 12,
    minWidth: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },

  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#777',
    fontSize: 14,
  },

  empty: {
    alignItems: 'center',
    marginTop: 80,
  },
  emptyText: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 12,
  },
});