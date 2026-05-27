import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Base_URL } from "@/config/api";

type Reel = {
  id: number;
  likesCount: number;
};

export default function LikeButton({ reel }: { reel: Reel }) {
  const [localReel, setLocalReel] = useState(reel);

  const userId = 1;

  const likeOrUnlikeReel = async () => {
    try {
      const response = await fetch(
        `${Base_URL}/api/reels/${localReel.id}/like?userId=${userId}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Erreur backend:", errorText);
        return;
      }

      const updatedReel = await response.json();

      setLocalReel(updatedReel);

    } catch (error) {
      console.log("Erreur réseau:", error);
    }
  };

  return (
    <TouchableOpacity
      style={styles.iconBox}
      onPress={likeOrUnlikeReel}
    >
      <Ionicons
        name="heart"
        size={34}
        color="white"
      />

      <Text style={styles.iconText}>
        {localReel.likesCount || 0}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconBox: {
    alignItems: "center",
    justifyContent: "center",
  },

  iconText: {
    color: "white",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 5,
  },
});