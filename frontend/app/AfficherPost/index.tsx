import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Post = {
  id: number;
  imageUrl?: string;
  imgUrl?: string;
  description?: string;
  createdAt?: string;
  username?: string;
  userAvatar?: string;
};

export default function AfficherPost({ post }: { post: Post }) {
  const imageSource = post.imageUrl || post.imgUrl;

  return (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image
          source={{
            uri: post.userAvatar || "https://via.placeholder.com/40",
          }}
          style={styles.postAvatar}
        />

        <View style={styles.postUserInfo}>
          <Text style={styles.postUsername}>
            {post.username || "Utilisateur"}
          </Text>

          <Text style={styles.postTime}>
            {post.createdAt
              ? new Date(post.createdAt).toLocaleDateString("fr-FR")
              : "Aujourd'hui"}
          </Text>
        </View>

        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {imageSource ? (
        <Image source={{ uri: imageSource }} style={styles.postImage} />
      ) : (
        <View style={styles.noImage}>
          <Text>Aucune image</Text>
        </View>
      )}

      <View style={styles.postActions}>
        <View style={styles.postActionsLeft}>
          <Ionicons name="heart-outline" size={25} color="#000" />
          <Ionicons name="chatbubble-outline" size={23} color="#000" />
          <Ionicons name="share-outline" size={25} color="#000" />
        </View>

        <Ionicons name="bookmark-outline" size={25} color="#000" />
      </View>

      {post.description ? (
        <View style={styles.postDescription}>
          <Text style={styles.descriptionUsername}>
            {post.username || "Utilisateur"}
          </Text>
          <Text style={styles.descriptionText}>{post.description}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  postCard: {
    backgroundColor: "#fff",
    marginBottom: 15,
  },

  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },

  postUserInfo: {
    flex: 1,
  },

  postUsername: {
    fontWeight: "600",
    fontSize: 14,
    color: "#000",
  },

  postTime: {
    fontSize: 11,
    color: "#8e8e8e",
    marginTop: 2,
  },

  postImage: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
  },

  noImage: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
  },

  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  postActionsLeft: {
    flexDirection: "row",
    gap: 16,
  },

  postDescription: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingBottom: 10,
  },

  descriptionUsername: {
    fontWeight: "600",
    marginRight: 8,
    color: "#000",
  },

  descriptionText: {
    flex: 1,
    color: "#000",
  },
});