import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AfficherPost from "../AfficherPost.tsx";
import StoriesList from "../Story/StoriesList/StoriesList";

export default function Home() {
  const [showOptions, setShowOptions] = useState(false);
  const router = useRouter();

  const openPage = (page: string) => {
    setShowOptions(false);
    router.push(page as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <Text style={styles.logo}>Snapgram</Text>

        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => router.push("/ReelComponenet/Reel")}>
            <Ionicons name="heart-outline" size={26} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowOptions(true)}>
            <Ionicons name="add-outline" size={30} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.story}>
        <StoriesList />
      </View>

      <View style={styles.postsContainer}>
        <AfficherPost />
      </View>

      <View style={styles.bottomNav}>
        <Ionicons name="home" size={28} color="#078738" />

        <TouchableOpacity onPress={() => router.replace("/SearchScreen")}>
          <Ionicons name="search-outline" size={28} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowOptions(true)}>
          <Ionicons name="add-circle-outline" size={32} color="#000" />
        </TouchableOpacity>

        <Ionicons name="chatbubble-outline" size={28} color="#000" />

        <TouchableOpacity onPress={() => router.push("/Profile")}>
          <Ionicons name="person-outline" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      <Modal visible={showOptions} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowOptions(false)}
        >
          <View style={styles.modalBox}>
            <TouchableOpacity
              style={styles.optionBtn}
              onPress={() => openPage("/AddPost")}
            >
              <Ionicons name="image-outline" size={25} color="#078738" />
              <Text style={styles.optionText}>Ajouter publication</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionBtn}
              onPress={() => openPage("/AddStory")}
            >
              <Ionicons name="add-circle-outline" size={25} color="#078738" />
              <Text style={styles.optionText}>Ajouter story</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionBtn}
              onPress={() => openPage("/ReelComponenet/AddReel")}
            >
              <Ionicons name="videocam-outline" size={25} color="#078738" />
              <Text style={styles.optionText}>Ajouter reel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setShowOptions(false)}
            >
              <Text style={styles.cancelText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },

  story: {
    paddingTop: 10,
    paddingBottom: 15,
  },

  postsContainer: {
    flex: 1,
    paddingBottom: 80,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#dbdbdb",
  },

  logo: {
    fontSize: 28,
    fontWeight: "700",
    color: "#078738",
  },

  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    paddingBottom: 28,
    borderTopWidth: 0.7,
    borderTopColor: "#dbdbdb",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },

  modalBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  optionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  optionText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111",
  },

  cancelBtn: {
    marginTop: 15,
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },

  cancelText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
});