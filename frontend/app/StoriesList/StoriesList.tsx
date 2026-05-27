import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Base_URL } from "@/config/api";

type Story = {
  id: number;
  imageUrl: string;
  user?: {
    id: number;
    fullName: string;
  };
};

const userId = 1;

export default function StoriesList() {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/stories/user/${userId}`);
      const data = await response.json();

      console.log("Stories:", data);

      if (Array.isArray(data)) {
        setStories(data);
      } else {
        setStories([]);
      }
    } catch (error) {
      console.log("Erreur fetch stories:", error);
    }
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Erreur", "Permission galerie refusée");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      await uploadStory(result.assets[0].uri);
    }
  };

  const uploadStory = async (uri: string) => {
    try {
      const formData = new FormData();

      formData.append("userId", userId.toString());

      formData.append("image", {
        uri: uri,
        name: "story.jpg",
        type: "image/jpeg",
      } as any);

      const response = await fetch(`${Base_URL}/api/stories/add`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Upload:", data);

      if (response.ok) {
        await fetchStories();
      } else {
        Alert.alert("Erreur", data.message || "Story non ajoutée");
      }
    } catch (error) {
      console.log("Erreur upload story:", error);
    }
  };

  const renderStory = ({ item }: { item: Story }) => (
    <TouchableOpacity style={styles.container}>
      <View style={styles.storyBorder}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
      </View>

      <Text style={styles.username} numberOfLines={1}>
        {item.user?.fullName || "Story"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={stories}
      horizontal
      keyExtractor={(item) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
      ListHeaderComponent={
        <TouchableOpacity style={styles.container} onPress={pickImage}>
          <View style={styles.addCircle}>
            <Text style={styles.plus}>+</Text>
          </View>
          <Text style={styles.username}>Votre story</Text>
        </TouchableOpacity>
      }
      renderItem={renderStory}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  container: {
    alignItems: "center",
    marginRight: 14,
    width: 75,
  },
  addCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: "#999",
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  plus: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
  },
  storyBorder: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 3,
    borderColor: "#e1306c",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  username: {
    marginTop: 6,
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
});