import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Base_URL } from "../../config/api";
import ProfileStats from "../ProfileStats";

type Props = {
  userId: number;
  username: string;
  bio: string;
};

export default function ProfileInfo({ userId, username, bio }: Props) {
  const defaultAvatar =
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const [avatar, setAvatar] = useState(defaultAvatar);

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/users/${userId}`);
      const user = await response.json();

      if (user.profilePicture) {
        setAvatar(user.profilePicture);
      } else {
        setAvatar(defaultAvatar);
      }
    } catch (error) {
      console.log("Erreur fetch user:", error);
    }
  };

  const changeProfilePicture = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission refusée", "Autorise l'accès à la galerie.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (result.canceled) return;

    const image = result.assets[0];

    const formData = new FormData();

    formData.append("image", {
      uri: image.uri,
      name: "profile.jpg",
      type: "image/jpeg",
    } as any);

    try {
      const response = await fetch(
        `${Base_URL}/api/users/${userId}/profile-picture`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const updatedUser = await response.json();

      if (updatedUser.profilePicture) {
        setAvatar(updatedUser.profilePicture);
      }

      Alert.alert("Succès", "Photo de profil modifiée");
    } catch (error) {
      console.log("Erreur upload profile:", error);
      Alert.alert("Erreur", "Impossible de modifier la photo.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <TouchableOpacity onPress={changeProfilePicture}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
        </TouchableOpacity>

        <ProfileStats userId={userId} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{username}</Text>
        <Text style={styles.bio}>{bio || "Aucune bio"}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button1}>
          <Text style={styles.buttonText}>Modifier</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Partager</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },

  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  avatar: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    backgroundColor: "#ddd",
  },

  infoContainer: {
    marginTop: 14,
    paddingHorizontal: 4,
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },

  bio: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },

  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },

  button: {
    flex: 1,
    backgroundColor: "#efefef",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },

  button1: {
    flex: 1,
    backgroundColor: "#049353",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
});