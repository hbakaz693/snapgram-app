import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";
import { useFocusEffect } from "expo-router";

const { height, width } = Dimensions.get("window");

const API_BASE_URL = "http://10.25.108.144:808";

type Reel = {
  id: number;
  videoUrl: string;
  description: string;
  musicName: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
};

export default function ReelsScreen() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReels = async () => {
    try {
      setLoading(true);

      console.log("URL:", `${API_BASE_URL}/api/reels`);

      const response = await fetch(`${API_BASE_URL}/api/reels`);

      console.log("STATUS:", response.status);

      const data = await response.json();

      console.log("REELS:", data);

      if (response.ok) {
        setReels(data);
      }
    } catch (error) {
      console.log("Erreur fetch reels:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchReels();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <FlatList
      data={reels}
      keyExtractor={(item) => item.id.toString()}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <ReelItem reel={item} />}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Aucun reel trouvé</Text>
        </View>
      }
    />
  );
}

function ReelItem({ reel }: { reel: Reel }) {
  return (
    <View style={styles.container}>
      <Video
        source={{ uri: reel.videoUrl }}
        style={styles.background}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        useNativeControls={false}
      />

      <View style={styles.overlay} />

      <View style={styles.top}>
        <Text style={styles.title}>Reels</Text>
        <Ionicons name="camera-outline" size={28} color="white" />
      </View>

      <View style={styles.rightActions}>
        <Icon name="heart" text={`${reel.likesCount || 0}`} />
        <Icon name="chatbubble" text={`${reel.commentsCount || 0}`} />
        <Icon name="paper-plane" text={`${reel.sharesCount || 0}`} />
        <Icon name="ellipsis-horizontal" text="" />
      </View>

      <View style={styles.bottom}>
        <Text style={styles.username}>@hicham_dev</Text>
        <Text style={styles.description}>
          {reel.description || "No description"}
        </Text>
        <Text style={styles.music}>
          🎵 {reel.musicName || "Original audio"}
        </Text>
      </View>
    </View>
  );
}

function Icon({ name, text }: { name: any; text: string }) {
  return (
    <TouchableOpacity style={styles.iconBox}>
      <Ionicons name={name} size={32} color="white" />
      {text !== "" && <Text style={styles.iconText}>{text}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: "black",
  },

  loading: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },

  empty: {
    width,
    height,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },

  background: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },

  top: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
  },

  rightActions: {
    position: "absolute",
    right: 15,
    bottom: 120,
    alignItems: "center",
    gap: 22,
  },

  iconBox: {
    alignItems: "center",
  },

  iconText: {
    color: "white",
    fontSize: 12,
    marginTop: 4,
  },

  bottom: {
    position: "absolute",
    left: 15,
    right: 80,
    bottom: 80,
  },

  username: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },

  description: {
    color: "white",
    fontSize: 14,
    marginBottom: 8,
  },

  music: {
    color: "white",
    fontSize: 13,
  },
});