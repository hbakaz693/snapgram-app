import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const GREEN = '#0a7a3d';
const API_URL = 'http://10.109.145.181:8080';

type Message = {
  id: number | string;
  text: string;
  isMe: boolean;
  time: string;
};

export default function ChatScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${API_URL}/api/messages/conversations/${id}`);

      if (!response.ok) {
        throw new Error(`Erreur backend: ${response.status}`);
      }

      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.log('Erreur messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!text.trim()) return;

    try {
      const response = await fetch(`${API_URL}/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          receiverId: Number(id),
          content: text.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur backend: ${response.status}`);
      }

      const savedMessage = await response.json();

      setMessages((prev) => [...prev, savedMessage]);
      setText('');
    } catch (error) {
      console.log('Erreur envoi message:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [id]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#111" />
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.username}>Conversation</Text>
          <Text style={styles.status}>En ligne</Text>
        </View>

        <Ionicons name="call-outline" size={26} color="#111" />
        <Ionicons name="videocam-outline" size={26} color="#111" />
      </View>

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={GREEN} />
        </View>
      ) : (
        <FlatList
          data={messages}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.messages}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageRow,
                item.isMe ? styles.myMessageRow : styles.otherMessageRow,
              ]}
            >
              <View
                style={[
                  styles.bubble,
                  item.isMe ? styles.myBubble : styles.otherBubble,
                ]}
              >
                <Text style={[styles.messageText, item.isMe && styles.myText]}>
                  {item.text}
                </Text>
                <Text style={[styles.time, item.isMe && styles.myTime]}>
                  {item.time}
                </Text>
              </View>
            </View>
          )}
        />
      )}

      <View style={styles.inputBar}>
        <TouchableOpacity style={styles.micButton}>
          <Ionicons name="mic-outline" size={24} color={GREEN} />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Ecrire un message..."
          value={text}
          onChangeText={setText}
        />

        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 82,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e5e7eb',
  },
  headerText: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
  status: {
    color: GREEN,
    marginTop: 2,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messages: {
    padding: 12,
  },
  messageRow: {
    marginBottom: 16,
  },
  myMessageRow: {
    alignItems: 'flex-end',
  },
  otherMessageRow: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '78%',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 24,
  },
  myBubble: {
    backgroundColor: GREEN,
  },
  otherBubble: {
    backgroundColor: '#f0f1f4',
  },
  messageText: {
    fontSize: 16,
    color: '#111827',
  },
  myText: {
    color: '#fff',
  },
  time: {
    marginTop: 6,
    fontSize: 12,
    color: '#64748b',
  },
  myTime: {
    color: '#d1fae5',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#e5e7eb',
  },
  micButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 22,
    paddingHorizontal: 16,
    height: 44,
  },
  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: GREEN,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});