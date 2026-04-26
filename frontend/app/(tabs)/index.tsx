import React,{useEffect} from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Header() {
  const router=useRouter();
  useEffect(() => {
  const timer = setTimeout(() => {
    router.replace("/Login");
  }, 1000);

  return () => clearTimeout(timer);
}, []);
  return (
    <View style={styles.container}>
      
      {/* Logo */}
      <View style={styles.logoBox}>
        <Ionicons name="flash" size={40} color="#0a7a3d" />
      </View>

      {/* Nom de l'app */}
      <Text style={styles.title}>Snapgram</Text>

      {/* Sous-titre */}
      <Text style={styles.subtitle}>Partagez vos moments</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop:60,
    backgroundColor: "#0a7a3d", // 👈 vert
  },

  logoBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: 10,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff", // blanc sur vert
  },

  subtitle: {
    fontSize: 14,
    color: "#e0e0e0",
    marginTop: 5,
  },
});