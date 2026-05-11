import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert("Erreur", "Veuillez remplir tous les champs");
    return;
  }

  try {
    console.log("📤 Envoi requête...");
    
    const response = await fetch("http://10.68.202.144:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    console.log("📥 Status:", response.status);
    console.log("📥 Headers:", response.headers.get("content-type"));

    // ✅ Lire le texte d'abord
    const textResponse = await response.text();
    console.log("📄 Réponse brute:", textResponse);

    // ✅ Si la réponse est vide
    if (!textResponse || textResponse.trim().length === 0) {
      Alert.alert("Erreur", "Le serveur n'a pas répondu correctement");
      return;
    }

    // ✅ Essayer de parser le JSON
    let data;
    try {
      data = JSON.parse(textResponse);
    } catch (e) {
      console.log("Erreur JSON:", e);
      Alert.alert("Erreur", "Réponse invalide du serveur");
      return;
    }

    if (response.ok) {
      Alert.alert("Succès", "Connexion réussie 🎉");
      router.replace("/Home");
    } else {
      Alert.alert("Erreur", data.message || "Email ou mot de passe incorrect");
    }
    
  } catch (error) {
    console.log("❌ Erreur:", error);
    Alert.alert("Erreur", "Impossible de contacter le serveur");
  }
};
  return (
    <View style={styles.container}>
      {/* Logo */}
      <TouchableOpacity onPress={() => router.push("/")}>
        <View style={styles.logoBox}>
          <Ionicons name="flash" size={40} color="#0a7a3d" />
        </View>
      </TouchableOpacity>

      {/* Titre */}
      <Text style={styles.title}>Snapgram</Text>

      {/* Sous titre */}
      <Text style={styles.subtitle}>Se connecter</Text>

      {/* Formulaire */}
      <View style={styles.formContainer}>
        {/* Email */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password */}
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Forgot password */}
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              "Mot de passe oublié",
              "Fonctionnalité à venir"
            )
          }
        >
          <Text style={styles.forgotPassword}>
            Mot de passe oublié ?
          </Text>
        </TouchableOpacity>

        {/* Bouton login */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>
            Se connecter
          </Text>
        </TouchableOpacity>

        {/* Register */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>
            Pas de compte ?
          </Text>

          <TouchableOpacity
            onPress={() => router.replace("/Register")}
          >
            <Text style={styles.signupLink}>
              S'inscrire
            </Text>
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
    backgroundColor: "#fff",
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
    color: "#fff",
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