import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Base_URL } from "@/config/api";

export type Music = {
  id: number;
  title: string;
  artist: string;
  audioUrl: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelectMusic: (music: Music) => void;
};

export default function MusicScreen({
  visible,
  onClose,
  onSelectMusic,
}: Props) {
  const [musics, setMusics] = useState<Music[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMusics = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${Base_URL}/api/music`);
      const data = await response.json();

      if (response.ok) {
        setMusics(data);
      }
    } catch (error) {
      console.log("Erreur fetch music:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible) {
      fetchMusics();
    }
  }, [visible]);

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Choisir une musique</Text>

          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={28} color="#111" />
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#e1306c" />
        ) : (
          <FlatList
            data={musics}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.musicItem}
                onPress={() => {
                  onSelectMusic(item);
                  onClose();
                }}
              >
                <View style={styles.cover}>
                  <Ionicons name="musical-note" size={26} color="white" />
                </View>

                <View style={styles.info}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.artist}>{item.artist}</Text>
                </View>

                <Ionicons name="chevron-forward" size={24} color="#777" />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 45,
  },

  header: {
    paddingHorizontal: 18,
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },

  musicItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 12,
  },

  cover: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: "#e1306c",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  info: {
    flex: 1,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
  },

  artist: {
    fontSize: 13,
    color: "#777",
    marginTop: 3,
  },
});