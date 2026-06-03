import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Share,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Base_URL } from "../../config/api";
import { router } from "expo-router";

type User = {
  id: number;
  fullName: string;
  username: string;
  profilePicture?: string | null;
};

type Post = {
  id: number;
  imgUrl: string;
  description: string;
  userId: number;
  likeCount: number;
  createdAt: string;
  user?: User;
};

export default function AfficherPost() {
  const [posts, setPosts] = useState<Post[]>([]);

  const defaultAvatar =
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  useEffect(() => {
    fetchPosts();
  }, []);

  const formatTime = (dateString?: string) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const now = new Date();

    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMin < 1) return "À l’instant";
    if (diffMin < 60) return `il y a ${diffMin} min`;
    if (diffHours < 24) return `il y a ${diffHours} h`;
    return `il y a ${diffDays} j`;
  };

  const sharePost = async (post: Post) => {
    try {
      await Share.share({
        message: `${post.description}\n${post.imgUrl}`,
      });
    } catch (error) {
      console.log("Erreur partage:", error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/posts`);
      const data = await response.json();

      if (Array.isArray(data)) {
        setPosts(data.filter((post) => post && post.id !== undefined));
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.log("Erreur posts:", error);
      setPosts([]);
    }
  };

  const likePost = async (postId: number) => {
    try {
      const response = await fetch(`${Base_URL}/api/posts/${postId}/like`, {
        method: "PUT",
      });

      if (response.ok) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? { ...post, likeCount: (post.likeCount || 0) + 1 }
              : post
          )
        );
      }
    } catch (error) {
      console.log("Erreur like:", error);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({ item }) => {
        if (!item || !item.imgUrl) return null;

        return (
          <View style={styles.card}>
            <View style={styles.header}>
              <Image
                source={{
                  uri: item.user?.profilePicture || defaultAvatar,
                }}
                style={styles.avatar}
              />

              <View>
                <Text style={styles.username}>
                  {item.user?.fullName || item.user?.username || `User ${item.userId}`}
                </Text>

                <Text style={styles.time}>
                  {formatTime(item.createdAt)}
                </Text>
              </View>
            </View>

            <Image
              source={{ uri: item.imgUrl }}
              style={styles.image}
              resizeMode="cover"
            />

            <View style={styles.actions}>
              <TouchableOpacity onPress={() => likePost(item.id)}>
                <Ionicons name="heart-outline" size={28} color="#000" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/Commentaire",
                    params: { postId: item.id },
                  })
                }
              >
                <Ionicons name="chatbubble-outline" size={26} color="#000" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => sharePost(item)}>
                <Ionicons name="paper-plane-outline" size={26} color="#000" />
              </TouchableOpacity>

              <TouchableOpacity>
                <Ionicons name="bookmark-outline" size={28} color="white" />
              </TouchableOpacity>
            </View>

            <Text style={styles.likes}>{item.likeCount || 0} j'adore</Text>

            <Text style={styles.description}>
              <Text style={styles.username}>
                {item.user?.fullName || item.user?.username || `User ${item.userId}`}{" "}
              </Text>
              {item.description}
            </Text>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginBottom: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#ddd",
    marginRight: 10,
  },

  username: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#000",
  },

  time: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },

  image: {
    width: "100%",
    height: 400,
    backgroundColor: "#eee",
  },

  actions: {
    flexDirection: "row",
    gap: 15,
    padding: 12,
  },

  likes: {
    fontWeight: "bold",
    paddingHorizontal: 12,
    marginBottom: 5,
  },

  description: {
    paddingHorizontal: 12,
    paddingBottom: 10,
    fontSize: 14,
  },
});