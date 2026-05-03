import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* HEADER - Snapgram exactement comme l'image */}
      <View style={styles.header}>
        <Text style={styles.logo}>Snapgram</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={26} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.messageIcon}>
            <Ionicons name="chatbubble-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* SECTION STORIES */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.storiesContainer}
        contentContainerStyle={styles.storiesContent}
      >
        {/* Votre story */}
        <View style={styles.storyItem}>
          <View style={[styles.storyRing, styles.yourStoryRing]}>
            <View style={styles.yourStoryPlus}>
              <Text style={styles.plusIcon}>+</Text>
            </View>
          </View>
          <Text style={styles.storyName}>Votre story</Text>
        </View>
      </ScrollView>

      {/* Barre de navigation du bas */}
      <View style={styles.bottomNav}>
        <Ionicons name="home" size={28} color="#000" />
        <Ionicons name="search-outline" size={28} color="#000" />
        <Ionicons name="play-circle-outline" size={28} color="#000" />
        <Ionicons name="chatbubble-outline" size={28} color="#000" />
        <Ionicons name="person-outline" size={28} color="#000" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // HEADER
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dbdbdb',
  },
  logo: {
    fontSize: 28,  // ✅ nombre, pas string
    fontWeight: '700',
    letterSpacing: -0.3,
    color:"#078738"
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  messageIcon: {
    marginLeft: 4,
  },
  
  // STORIES
  storiesContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#dbdbdb',
    paddingVertical: 12,
  },
  storiesContent: {
    paddingHorizontal: 12,
    gap: 16,
  },
  storyItem: {
    alignItems: 'center',
    gap: 6,
  },
  storyRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e4405f',
  },
  yourStoryRing: {
    borderColor: '#dbdbdb',
    position: 'relative',
  },
  yourStoryPlus: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#0095f6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  plusIcon: {
    color: '#fff',
    fontSize: 14,  // ✅ nombre
    fontWeight: 'bold',
  },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#e4405f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 24,  // ✅ nombre
    fontWeight: '600',
  },
  storyName: {
    fontSize: 12,  // ✅ nombre
    color: '#262626',
    marginTop: 4,
  },
  
  // BOTTOM NAVIGATION
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 0.5,
    borderTopColor: '#dbdbdb',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});