import React, { useState } from "react";
import { Router} from "expo-router";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Header() {
  const router=useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }
    // Ici vous pouvez ajouter votre logique d'authentification
    Alert.alert("Connexion", `Tentative de connexion avec ${email}`);
  };

  return (
    <View style={styles.container}>
      
      {/* Logo */}
      <TouchableOpacity onPress={() => router.push("/")}>
  <View style={styles.logoBox}>
    <Ionicons name="flash" size={40} color="#0a7a3d" />
  </View>
</TouchableOpacity>
      {/* Nom de l'app */}
      <Text style={styles.title}>Snapgram</Text>

      {/* Sous-titre */}
      <Text style={styles.subtitle}>Se Connecter</Text>

      {/* Formulaire de connexion */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity onPress={() => Alert.alert("Mot de passe oublié", "Fonctionnalité à venir")}>
          <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Se connecter</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Pas de compte ? </Text>
          <TouchableOpacity  onPress={() => router.replace("/Register") }>
            <Text style={styles.signupLink}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#0a7a3d",
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
    marginTop: 60,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  }, 

  subtitle: {
    fontSize: 14,
    color: "#e0e0e0",
    marginTop: 5,
    marginBottom: 40,
  },

  formContainer: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },

  forgotPassword: {
    color: "#0a7a3d",
    textAlign: "right",
    marginBottom: 20,
    fontSize: 14,
  },

  loginButton: {
    backgroundColor: "#0a7a3d",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },

  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  signupText: {
    fontSize: 14,
    color: "#666",
  },

  signupLink: {
    fontSize: 14,
    color: "#0a7a3d",
    fontWeight: "bold",
  },
});