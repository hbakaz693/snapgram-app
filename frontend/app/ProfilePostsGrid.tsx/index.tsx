import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";

const API_BASE_URL = "http://10.25.108.144:808";
const userId = 2;

type Post = {
  id: number;
  imgUrl: string;
  description: string;
};

const imageSize = Dimensions.get("window").width / 3;

export default function ProfilePostsGrid() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/posts/user/${userId}`);
      const data = await response.json();

      console.log("POSTS:", data);
      setPosts(data);
    } catch (error) {
      console.log("Erreur chargement posts:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#049353" />;
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      numColumns={3}
      scrollEnabled={false}
      renderItem={({ item }) => (
        <View style={styles.postBox}>
          <Image source={{ uri: item.imgUrl }} style={styles.postImage} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  postBox: {
    width: imageSize,
    height: imageSize,
    padding: 1,
  },
  postImage: {
    width: "100%",
    height: "100%",
  },
});