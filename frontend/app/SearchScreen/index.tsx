import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { Base_URL } from "@/config/api";

type User = {
  id: number;
  username: string;
  fullName: string;
  email: string;
};

export default function SearchScreen() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  const searchUsers = async (text: string) => {
    setSearch(text);

    if (text.trim() === "") {
      setUsers([]);
      return;
    }

    try {
      const response = await fetch(
        `${Base_URL}/api/users/search?name=${text}`
      );

      const data = await response.json();

      setUsers(data);
    } catch (error) {
      console.log("Erreur:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recherche</Text>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#777" />

        <TextInput
          placeholder="Rechercher"
          value={search}
          onChangeText={searchUsers}
          style={styles.input}
        />
      </View>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.userCard} onPress={()=>router.replace("/Profile")}>
            
            <View style={styles.avatar} />
           

            <View>
              <Text style={styles.name}>
                {item.fullName || item.username}
              </Text>

              <Text style={styles.username}>
                @{item.username}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#efefef",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 45,
    marginBottom: 20,
  },

  input: {
    marginLeft: 8,
    flex: 1,
    fontSize: 16,
  },

  userCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ccc",
    marginRight: 12,
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
  },

  username: {
    color: "#777",
    marginTop: 2,
  },
});