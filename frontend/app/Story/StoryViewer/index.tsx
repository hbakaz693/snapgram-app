import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";

const { width, height } = Dimensions.get("window");

type Story = {
  id: number;
  imageUrl: string;
  musicTitle?: string;
  musicAudioUrl?: string;
  user?: {
    fullName: string;
    profilePicture?: string;
  };
};

type Props = {
  visible: boolean;
  story: Story | null;
  onClose: () => void;
};

export default function StoryViewer({ visible, story, onClose }: Props) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const stopMusic = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
    }
  };

  const playMusic = async () => {
    if (!story?.musicAudioUrl) return;

    try {
      if (sound) {
        await sound.playAsync();
        setIsPlaying(true);
        return;
      }

      const { sound: newSound } = await Audio.Sound.createAsync({
        uri: story.musicAudioUrl,
      });

      setSound(newSound);
      setIsPlaying(true);
      await newSound.playAsync();
    } catch (error) {
      console.log("Erreur music:", error);
    }
  };

  const pauseMusic = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  const toggleMusic = async () => {
    if (isPlaying) {
      await pauseMusic();
    } else {
      await playMusic();
    }
  };

  const handleClose = async () => {
    await stopMusic();
    onClose();
  };

  useEffect(() => {
    if (visible && story?.musicAudioUrl) {
      playMusic();
    }

    return () => {
      stopMusic();
    };
  }, [visible, story?.id]);

  if (!story) return null;

  return (
    <Modal visible={visible} animationType="fade">
      <View style={styles.container}>
        <Image
          source={{ uri: story.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.top}>
          <TouchableOpacity style={styles.backButton} onPress={handleClose}>
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>

          <Text style={styles.username}>
            {story.user?.fullName || "Story"}
          </Text>

          <TouchableOpacity onPress={handleClose}>
            <Ionicons name="close" size={32} color="white" />
          </TouchableOpacity>
        </View>

        {story.musicTitle && (
          <TouchableOpacity style={styles.musicBox} onPress={toggleMusic}>
            <Ionicons
              name={isPlaying ? "pause-circle" : "play-circle"}
              size={22}
              color="white"
            />

            <Ionicons
              name="musical-note"
              size={18}
              color="white"
              style={styles.musicIcon}
            />

            <Text style={styles.musicText}>{story.musicTitle}</Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: "black",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  top: {
    position: "absolute",
    top: 45,
    left: 15,
    right: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    marginRight: 12,
  },

  username: {
    flex: 1,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  musicBox: {
    position: "absolute",
    bottom: 45,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.45)",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 22,
  },

  musicIcon: {
    marginLeft: 8,
  },

  musicText: {
    color: "white",
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "600",
  },
});