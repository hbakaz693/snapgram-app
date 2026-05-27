import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Base_URL } from "@/config/api";

export default function AddPost() {
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const userId = 1;

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Erreur", "Permission refusée");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePublish = async () => {
    if (!image) {
      Alert.alert("Erreur", "Veuillez choisir une image");
      return;
    }

    setLoading(true);

    try {
      const filename = image.split("/").pop() || "post.jpg";

      const formData = new FormData();

      formData.append("image", {
        uri: image,
        name: filename,
        type: "image/jpeg",
      } as any);

      formData.append("description", description);
      formData.append("userId", userId.toString());

      const response = await fetch(`${Base_URL}/api/posts`, {
        method: "POST",
        body: formData,
      });

      const text = await response.text();
      console.log("Réponse serveur:", response.status, text);

      if (response.ok) {
        Alert.alert("Succès", "Publication ajoutée !");
        setImage(null);
        setDescription("");
        router.replace("/Home");
      } else {
        Alert.alert("Erreur", text || "Erreur lors de la publication");
      }
    } catch (error) {
      console.log("Erreur upload:", error);
      Alert.alert("Erreur", "Problème de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter une publication</Text>

      <TouchableOpacity onPress={pickImage} style={styles.imageBox}>
        {image ? (
          <Image source={{ uri: image }} style={styles.previewImage} />
        ) : (
          <>
            <Ionicons name="image-outline" size={45} color="#777" />
            <Text style={styles.imageText}>Choisir une image</Text>
          </>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Description..."
        placeholderTextColor="#999"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handlePublish}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Publier</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => router.back()}
      >
        <Text style={styles.cancelText}>Annuler</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 25,
    color: "#000",
  },

  imageBox: {
    height: 350,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fafafa",
    overflow: "hidden",
  },

  previewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  imageText: {
    marginTop: 10,
    fontSize: 15,
    color: "#777",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 20,
    minHeight: 55,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#078738",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonDisabled: {
    opacity: 0.7,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  cancelButton: {
    marginTop: 15,
    alignItems: "center",
  },

  cancelText: {
    color: "#777",
    fontSize: 15,
  },
});