import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState("posts");
  const posts = [
    { id: 1, image: "https://picsum.photos/300?1" },
    { id: 2, image: "https://picsum.photos/300?2" },
    { id: 3, image: "https://picsum.photos/300?3" },
    { id: 4, image: "https://picsum.photos/300?4" },
    { id: 5, image: "https://picsum.photos/300?5" },
    { id: 6, image: "https://picsum.photos/300?6" },
  ];
  const screenWidth = Dimensions.get("window").width;
  const imgSize = screenWidth / 3;
  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://picsum.photos/300" }}
          style={styles.profileImage}
        />
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>127</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2.5k</Text>
            <Text style={styles.statLabel}>Abonnés</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statNumber}>892</Text>
            <Text style={styles.statLabel}>Suivis</Text>
          </View>
        </View>
      </View>

      {/* INFOS */}
      <View style={styles.infos}>
        <View style={styles.info}>
          <Text style={styles.name}>Votre Nom</Text>
          <Text style={styles.bio}>
            Photographe 📸 | Voyageur 🌍 Paris, France
          </Text>
        </View>

        {/* BOUTONS */}
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editText}>Modifier</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.shareButton}>
            <Text>Partager</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* STORIES */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.stories}
      >
        {[1, 2, 3, 4, 5].map((item, index) => (
          <View key={index} style={styles.storyItem}>
            <View style={styles.storyCircle}>
              <Text style={{ fontSize: 20 }}>+</Text>
            </View>
            <Text>Nouveau</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => setActiveTab("posts")}
          style={styles.tab}
        >
          <Text
            style={
              activeTab === "posts" ? styles.activeTab : styles.inactiveTab
            }
          >
            Posts
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("saved")}
          style={styles.tab}
        >
          <Text
            style={
              activeTab === "saved" ? styles.activeTab : styles.inactiveTab
            }
          >
            Sauvegardés
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("tags")}
          style={styles.tab}
        >
          <Text
            style={activeTab === "tags" ? styles.activeTab : styles.inactiveTab}
          >
            Tags
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === "posts" && (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.image }}
              style={{
                width: imgSize,
                height: imgSize,
                margin: 1,
              }}
            />
          )}
        />
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderColor: "#ddd",
    marginTop: 15,
  },

  tab: {
    padding: 10,
  },

  activeTab: {
    fontWeight: "bold",
    color: "green",
  },

  inactiveTab: {
    color: "gray",
  },

  infos: {
    paddingTop: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 30,
  },

  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "green",
  },

  stats: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
  },

  statItem: {
    alignItems: "center",
  },

  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },

  statLabel: {
    color: "gray",
  },

  info: {
    marginTop: 10,
  },

  name: {
    fontWeight: "bold",
    fontSize: 16,
  },

  bio: {
    color: "gray",
    marginTop: 5,
  },

  buttons: {
    flexDirection: "row",
    marginTop: 15,
  },

  editButton: {
    flex: 1,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 5,
  },

  editText: {
    color: "white",
    fontWeight: "bold",
  },

  shareButton: {
    flex: 1,
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 5,
  },

  stories: {
    marginTop: 20,
  },

  storyItem: {
    alignItems: "center",
    marginRight: 15,
  },

  storyCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
});
