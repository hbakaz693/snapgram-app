import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { Video, ResizeMode } from "expo-av";

const API_BASE_URL = "http://10.25.108.144:808";

export default function AddReel() {
  const [video, setVideo] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [musicName, setMusicName] = useState("");
  const [loading, setLoading] = useState(false);

  const userId = 1;

  const pickVideo = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Erreur", "Permission refusée");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["videos"],
      quality: 1,
    });

    if (!result.canceled) {
      setVideo(result.assets[0].uri);
    }
  };

  const addReel = async () => {
    if (!video) {
      Alert.alert("Erreur", "Choisir une vidéo");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append("file", {
      uri: video,
      name: `reel_${Date.now()}.mp4`,
      type: "video/mp4",
    } as any);

    formData.append("description", description);
    formData.append("musicName", musicName);
    formData.append("userId", userId.toString());

    try {
      const response = await fetch(`${API_BASE_URL}/api/reels/add`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        Alert.alert("Succès", "Reel ajouté");
        router.back();
      } else {
  const errorText = await response.text();
  console.log("STATUS:", response.status);
  console.log("ERREUR BACKEND:", errorText);
  Alert.alert("Erreur backend", errorText);
}
    } catch (error) {
      console.log("Erreur réseau:", error);
      Alert.alert("Erreur", "Serveur non connecté");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter Reel</Text>

      <TouchableOpacity style={styles.videoBox} onPress={pickVideo}>
        {video ? (
          <Video
            source={{ uri: video }}
            style={styles.preview}
            resizeMode={ResizeMode.COVER}
            shouldPlay
            isLooping
            useNativeControls
          />
        ) : (
          <>
            <Ionicons name="videocam-outline" size={55} color="#777" />
            <Text style={styles.videoText}>Choisir une vidéo</Text>
          </>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Nom de musique"
        value={musicName}
        onChangeText={setMusicName}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={addReel}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Publier Reel</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
    color: "#078738",
  },

  videoBox: {
    height: 280,
    borderWidth: 2,
    borderColor: "#ddd",
    borderStyle: "dashed",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
    overflow: "hidden",
    backgroundColor: "#f7f7f7",
  },

  preview: {
    width: "100%",
    height: "100%",
  },

  videoText: {
    marginTop: 10,
    color: "#777",
    fontSize: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#078738",
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
});