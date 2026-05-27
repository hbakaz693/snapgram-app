import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Base_URL } from "../../config/api";

type Comment = {
  id: number;
  postId: number;
  userId: number;
  text: string;
};

type Props = {
  postId: number;
};

export default function Commentaire({ postId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch(`${Base_URL}/api/comments/post/${postId}`);
      const data = await response.json();

      setComments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Erreur comments:", error);
    }
  };

  const addComment = async () => {
    if (!text.trim()) return;

    try {
      const response = await fetch(`${Base_URL}/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: postId,
          userId: 1,
          text: text,
        }),
      });

      const newComment = await response.json();

      setComments((prev) => [...prev, newComment]);
      setText("");
    } catch (error) {
      console.log("Erreur add comment:", error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.commentBox}>
            <Text style={styles.username}>User {item.userId}</Text>
            <Text style={styles.commentText}>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.inputBox}>
        <TextInput
          placeholder="Ajouter un commentaire..."
          value={text}
          onChangeText={setText}
          style={styles.input}
        />

        <TouchableOpacity onPress={addComment}>
          <Ionicons name="send" size={24} color="#078738" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingBottom: 10,
  },

  commentBox: {
    marginBottom: 8,
  },

  username: {
    fontWeight: "bold",
    fontSize: 13,
  },

  commentText: {
    fontSize: 13,
    color: "#222",
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: "#ddd",
    paddingTop: 8,
  },

  input: {
    flex: 1,
    fontSize: 14,
  },
});