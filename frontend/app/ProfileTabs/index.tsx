import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ProfilePostsGrid from "../ProfilePostsGrid.tsx";

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <View>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab("posts")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "posts" && styles.tabActive,
            ]}
          >
            Posts
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab("saved")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "saved" && styles.tabActive,
            ]}
          >
            Sauves
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab("tags")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "tags" && styles.tabActive,
            ]}
          >
            Tags
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {activeTab === "posts" && <ProfilePostsGrid />}

        {activeTab === "saved" && (
          <Text style={styles.emptyText}>Aucune publication sauvegardée</Text>
        )}

        {activeTab === "tags" && (
          <Text style={styles.emptyText}>Aucune publication taguée</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
    marginTop: 10,
    borderTopWidth: 1,
    paddingTop: 12,
    borderTopColor: "#eee",
  },

  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },

  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#999",
  },

  tabActive: {
    color: "#000",
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    paddingBottom: 8,
  },

  content: {
    paddingBottom: 80,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 30,
    color: "#777",
    fontSize: 14,
  },
});