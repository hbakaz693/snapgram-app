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
import { Base_URL } from "@/config/api";
import CommentsModal from "../CommentsModal";

const { height, width } = Dimensions.get("window");

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

      const response = await fetch(`${Base_URL}/api/reels`);
      const data = await response.json();

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
  const [localReel, setLocalReel] = useState(reel);
  const [commentsVisible, setCommentsVisible] = useState(false);

  const videoSource = localReel.videoUrl.startsWith("http")
    ? localReel.videoUrl
    : `${Base_URL}${localReel.videoUrl}`;

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: videoSource }}
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
        <LikeButton reel={localReel} onUpdate={setLocalReel} />

        <TouchableOpacity
          style={styles.iconBox}
          onPress={() => setCommentsVisible(true)}
        >
          <Ionicons name="chatbubble" size={32} color="white" />
          <Text style={styles.iconText}>{localReel.commentsCount || 0}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBox}>
          <Ionicons name="paper-plane" size={32} color="white" />
          <Text style={styles.iconText}>{localReel.sharesCount || 0}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBox}>
          <Ionicons name="ellipsis-horizontal" size={32} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.bottom}>
        <Text style={styles.username}>@hicham_dev</Text>

        <Text style={styles.description}>
          {localReel.description || "No description"}
        </Text>

        <Text style={styles.music}>
          🎵 {localReel.musicName || "Original audio"}
        </Text>
      </View>

      <CommentsModal
        visible={commentsVisible}
        reelId={localReel.id}
        onClose={() => setCommentsVisible(false)}
        onCommentAdded={() =>
          setLocalReel({
            ...localReel,
            commentsCount: (localReel.commentsCount || 0) + 1,
          })
        }
      />
    </View>
  );
}

function LikeButton({
  reel,
  onUpdate,
}: {
  reel: Reel;
  onUpdate: (updatedReel: Reel) => void;
}) {
  const userId = 1;

  const likeOrUnlikeReel = async () => {
    try {
      const response = await fetch(
        `${Base_URL}/api/reels/${reel.id}/like?userId=${userId}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        console.log("Erreur like:", await response.text());
        return;
      }

      const updatedReel = await response.json();
      onUpdate(updatedReel);
    } catch (error) {
      console.log("Erreur réseau like:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.iconBox} onPress={likeOrUnlikeReel}>
      <Ionicons name="heart" size={32} color="white" />
      <Text style={styles.iconText}>{reel.likesCount || 0}</Text>
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