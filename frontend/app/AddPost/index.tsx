import React from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

export default function AddPost() {
    const pickImage=async ()=>{

        const permission=await ImagePicker.requestMediaLibraryPermissionsAsync();

        if(!permission.granted){
            alert("Permission refuse");
            return;
        }

        const result=await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
        });

        if(!result.canceled){
            console.log(result.assets[0].uri);
        }
    }
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Ajouter Publication</Text>

      <TouchableOpacity onPress={pickImage} style={styles.imageBox}>
        <Ionicons name="image-outline" size={45} color="#777" />
        <Text style={styles.imageText}>Choisir une image</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Écrire une description..."
        multiline
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Publier</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 25,
    color: "#000",
  },

  imageBox: {
    height: 220,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fafafa",
  },

  imageText: {
    marginTop: 10,
    fontSize: 15,
    color: "#777",
  },

  input: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 15,
    fontSize: 15,
    textAlignVertical: "top",
    marginBottom: 25,
  },

  button: {
    backgroundColor: "#000",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

});