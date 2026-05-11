import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, StatusBar,
  TouchableOpacity, ScrollView, Alert, Image, ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';

export default function App() {
  const [stories, setStories] = useState([]);
  const [userId] = useState(2); // À remplacer par l'ID de l'utilisateur connecté
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // Ajout manquant

  const openAddMenu = () => {
    setShowMenu(true); // Afficher le menu
  };

  useEffect(() => {
    fetchStories();
    requestPermissions();
  }, []);

  // Fermer le menu quand on clique ailleurs
  useEffect(() => {
    const handleOutsideClick = () => {
      if (showMenu) setShowMenu(false);
    };
    // On ajoute un écouteur global
    return () => {};
  }, [showMenu]);

  // Demander la permission d'accéder à la galerie
  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission refusée', 'Vous devez autoriser l\'accès à la galerie pour ajouter des stories');
    }
  };

  // Récupérer toutes les stories de l'utilisateur
  const fetchStories = async () => {
    try {
      const response = await fetch(`http://10.68.202.144:8080/api/stories/user/${userId}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Stories chargées:', data);
        setStories(data);
      } else {
        console.log('Erreur chargement stories:', response.status);
      }
    } catch (error) {
      console.log('Erreur fetchStories:', error);
    }
  };

  // Ajouter une nouvelle story
  const addStory = async () => {
    setShowMenu(false); // Fermer le menu
    try {
      // 1. Ouvrir la galerie
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        base64: false,
      });

      // 2. Si l'utilisateur annule
      if (result.canceled) {
        console.log('Sélection annulée');
        return;
      }

      setLoading(true);

      // 3. Préparer l'image
      const imageUri = result.assets[0].uri;
      const filename = imageUri.split('/').pop();
      
      // 4. Créer FormData pour l'envoi
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        name: filename,
        type: 'image/jpeg',
      });

      console.log('📤 Envoi de la story...');

      // 5. Envoyer au backend
      const response = await fetch(
        `http://10.68.202.144:8080/api/stories/add?userId=${userId}`,
        {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // 6. Lire la réponse
      const responseText = await response.text();
      console.log('📥 Réponse:', response.status, responseText);

      let data = {};
      if (responseText && responseText.trim().length > 0) {
        try {
          data = JSON.parse(responseText);
        } catch (e) {
          console.log('Réponse non JSON');
        }
      }

      // 7. Vérifier le résultat
      if (response.ok) {
        await fetchStories(); // Recharger la liste des stories
        Alert.alert('✅ Succès', 'Votre story a été ajoutée avec succès !');
      } else {
        Alert.alert('❌ Erreur', data.message || 'Impossible d\'ajouter la story');
      }
      
    } catch (error) {
      console.log('❌ Erreur addStory:', error);
      Alert.alert('Erreur', 'Problème de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  // Ajouter une publication
  const addPost = () => {
    setShowMenu(false);
    router.push("/AddPost");
  };

  // Rafraîchir les stories
  const refreshStories = async () => {
    setRefreshing(true);
    await fetchStories();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>Snapgram</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => Alert.alert('Notifications', 'Fonctionnalité à venir')}>
            <Ionicons name="heart-outline" size={26} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('Messages', 'Fonctionnalité à venir')}>
            <Ionicons name="chatbubble-outline" size={24} color="#000" />
          </TouchableOpacity>
          
          {/* Menu wrapper corrigé */}
          <View style={styles.addMenuWrapper}>
            <TouchableOpacity onPress={openAddMenu} disabled={loading}>
              <Ionicons name="add-outline" size={26} color="#000" />
            </TouchableOpacity>

            {showMenu && (
              <View style={styles.menu}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={addStory}
                >
                  <Text style={styles.menuText}>Ajouter Story</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={addPost}
                >
                  <Text style={styles.menuText}>Ajouter Publication</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* SECTION STORIES - Cercles horizontaux */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.storiesContainer}
        contentContainerStyle={styles.storiesContent}
      >
        {/* Cercle "Votre story" avec bouton + */}
        <TouchableOpacity style={styles.storyItem} onPress={addStory} disabled={loading}>
          <View style={[styles.storyRing, styles.yourStoryRing]}>
            {stories.length > 0 ? (
              <Image 
                source={{ uri: stories[stories.length - 1]?.imageUrl || stories[stories.length - 1]?.ImageUrl }} 
                style={styles.storyImage}
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={36} color="#fff" />
              </View>
            )}
            <View style={styles.yourStoryPlus}>
              <Text style={styles.plusIcon}>+</Text>
            </View>
          </View>
          <Text style={styles.storyName}>Votre story</Text>
        </TouchableOpacity>

        {/* Afficher toutes les stories existantes */}
        {stories.map((story, index) => (
          <TouchableOpacity 
            key={story.id} 
            style={styles.storyItem}
            onPress={() => Alert.alert('Story', `Voir la story ${index + 1}`)}
          >
            <View style={styles.storyRing}>
              <Image 
                source={{ uri: story.imageUrl || story.ImageUrl }} 
                style={styles.storyImage}
              />
            </View>
            <Text style={styles.storyName}>
              {index === 0 ? 'Récents' : `Il y a ${index}h`}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Indicateur de chargement */}
        {loading && (
          <View style={styles.loadingStory}>
            <ActivityIndicator size="small" color="#e4405f" />
          </View>
        )}
      </ScrollView>

      {/* Indicateur de rafraîchissement */}
      {refreshing && (
        <View style={styles.refreshOverlay}>
          <ActivityIndicator size="large" color="#078738" />
        </View>
      )}

      {/* CONTENU PRINCIPAL (Feed) */}
      <ScrollView style={styles.feed}>
        <View style={styles.feedPlaceholder}>
          <Ionicons name="images-outline" size={80} color="#ccc" />
          <Text style={styles.feedText}>Aucune publication</Text>
          <Text style={styles.feedSubText}>Appuyez sur + pour ajouter une story</Text>
        </View>
      </ScrollView>

      {/* BOTTOM NAVIGATION */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Ionicons name="home" size={28} color="#078738" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="search-outline" size={28} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="play-circle-outline" size={28} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="chatbubble-outline" size={28} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person-outline" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      {/* LOADING OVERLAY */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Ajout en cours...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addMenuWrapper: {
    position: "relative",
  },
  menu: {
    position: "absolute",
    top: 35,
    right: 0,
    width: 190,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 6,
    borderWidth: 0.5,
    borderColor: "#dbdbdb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
    zIndex: 999,
  },
  menuItem: {
    paddingVertical: 13,
    paddingHorizontal: 15,
  },
  menuText: {
    fontSize: 14,
    color: "#262626",
    fontWeight: "500",
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
    fontSize: 28,
    fontWeight: '700',
    color: "#078738",
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  storiesContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#dbdbdb',
    paddingVertical: 12,
  },
  storiesContent: {
    paddingHorizontal: 12,
    gap: 16,
    alignItems: 'center',
  },
  storyItem: {
    alignItems: 'center',
    gap: 6,
    width: 74,
  },
  storyRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: '#e4405f',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  storyImage: {
    width: 68,
    height: 68,
    borderRadius: 34,
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
    fontSize: 14,
    fontWeight: 'bold',
  },
  avatarPlaceholder: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#e4405f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyName: {
    fontSize: 12,
    color: '#262626',
    marginTop: 4,
  },
  loadingStory: {
    width: 72,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    paddingBottom: 34,
    paddingTop: 12,
    borderTopWidth: 0.7,
    borderTopColor: '#dbdbdb',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  refreshOverlay: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  feed: {
    flex: 1,
    marginBottom: 50,
  },
  feedPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  feedText: {
    fontSize: 18,
    color: '#999',
    marginTop: 10,
  },
  feedSubText: {
    fontSize: 14,
    color: '#bbb',
    marginTop: 5,
  },
});