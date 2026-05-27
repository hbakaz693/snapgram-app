import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Base_URL } from "../../config/api";

type Props = {
  userId: number;
};

type Stats = {
  postsCount: number;
  followersCount: number;
  followingCount: number;
};

export default function ProfileStats({ userId }: Props) {
  const [stats, setStats] = useState<Stats>({
    postsCount: 0,
    followersCount: 0,
    followingCount: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(
        `${Base_URL}/api/users/${userId}/stats`
      );

      const data = await response.json();

      setStats(data);
    } catch (error) {
      console.log("Erreur stats:", error);
    }
  };

  return (
    <View style={styles.stats}>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>
          {stats.postsCount}
        </Text>

        <Text style={styles.statLabel}>
          Posts
        </Text>
      </View>

      <View style={styles.statItem}>
        <Text style={styles.statNumber}>
          {stats.followersCount}
        </Text>

        <Text style={styles.statLabel}>
          Abonnés
        </Text>
      </View>

      <View style={styles.statItem}>
        <Text style={styles.statNumber}>
          {stats.followingCount}
        </Text>

        <Text style={styles.statLabel}>
          Suivis
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stats: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    paddingLeft: 20,
  },

  statItem: {
    alignItems: "center",
  },

  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },

  statLabel: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },
});