import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect, useRouter } from "expo-router";
import AfficherPost from "../AfficherPost";
import { replace } from "expo-router/build/global-state/routing";
import StoriesList from "../StoriesList/StoriesList";

const API_BASE_URL = "http://10.25.108.144:808";

type Post = {
  id: number;
  imageUrl?: string;
  imgUrl?: string;
  description?: string;
  createdAt?: string;
  username?: string;
  userAvatar?: string;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const router=useRouter();

  const fetchPosts = async () => {
    setLoadingPosts(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/posts`);

      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.log("Erreur fetchPosts:", error);
      setPosts([]);
    } finally {
      setLoadingPosts(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

  const refreshData = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  const openPage = (page: string) => {
    setShowOptions(false);
    router.push(page as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <Text style={styles.logo}>Snapgram</Text>


        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => router.push("/Reel")}>
            <Ionicons name="heart-outline" size={26} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowOptions(true)}>
            <Ionicons name="add-outline" size={30} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

       <View style={styles.story}>
          <StoriesList />
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <AfficherPost post={item} />}
        refreshing={refreshing}
        onRefresh={refreshData}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.feedContent}
        ListEmptyComponent={
          !loadingPosts ? (
            <View style={styles.emptyFeed}>
              <Ionicons name="images-outline" size={80} color="#ccc" />
              <Text style={styles.emptyFeedTitle}>Aucune publication</Text>
              <Text style={styles.emptyFeedText}>
                Appuyez sur + pour ajouter
              </Text>
            </View>
          ) : null
        }
        ListFooterComponent={
          loadingPosts ? (
            <View style={styles.loading}>
               <ActivityIndicator size="large" color="#078738" />
            </View>
          ) : null
        }
      />

      <View style={styles.bottomNav}>
        <Ionicons name="home" size={28} color="#078738" />
        <Ionicons name="search-outline" size={28} color="#000" />

        <TouchableOpacity onPress={() => setShowOptions(true)}>
          <Ionicons name="add-circle-outline" size={32} color="#000" />
        </TouchableOpacity>

        <Ionicons name="chatbubble-outline" size={28} color="#000" />
        <TouchableOpacity onPress={()=>router.push("/Profile")}>
          <Ionicons name="person-outline" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      <Modal visible={showOptions} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowOptions(false)}
        >
          <View style={styles.modalBox}>
            <TouchableOpacity
              style={styles.optionBtn}
              onPress={() => openPage("/AddPost")}
            >
              <Ionicons name="image-outline" size={25} color="#078738" />
              <Text style={styles.optionText}>Ajouter publication</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionBtn}
              onPress={() => openPage("/AddStory")}
            >
              <Ionicons name="add-circle-outline" size={25} color="#078738" />
              <Text style={styles.optionText}>Ajouter story</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionBtn}
              onPress={() => openPage("/AddReel")}
            >
              <Ionicons name="videocam-outline" size={25} color="#078738" />
              <Text style={styles.optionText}>Ajouter reel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setShowOptions(false)}
            >
              <Text style={styles.cancelText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  story:{
    paddingTop:10,
    paddingBottom:15,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#dbdbdb",
  },

  logo: {
    fontSize: 28,
    fontWeight: "700",
    color: "#078738",
  },

  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },

  feedContent: { paddingBottom: 90 },

  emptyFeed: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 150,
  },

  emptyFeedTitle: {
    fontSize: 18,
    color: "#999",
    marginTop: 10,
  },

  emptyFeedText: {
    fontSize: 14,
    color: "#bbb",
    marginTop: 5,
  },

  loading: { paddingVertical: 30 },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    paddingBottom: 28,
    borderTopWidth: 0.7,
    borderTopColor: "#dbdbdb",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },

  modalBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  optionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  optionText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111",
  },

  cancelBtn: {
    marginTop: 15,
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },

  cancelText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
});