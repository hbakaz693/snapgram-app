import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Base_URL } from "@/config/api";

type CommentUser = {
  id: number;
  fullName?: string;
  username?: string;
};

type ReelComment = {
  id: number;
  text: string;
  createdAt: string;
  user?: CommentUser;
};

type Props = {
  visible: boolean;
  reelId: number;
  onClose: () => void;
  onCommentAdded?: () => void;
};

export default function CommentsModal({
  visible,
  reelId,
  onClose,
  onCommentAdded,
}: Props) {
  const [comments, setComments] = useState<ReelComment[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  const userId = 1;

  const fetchComments = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${Base_URL}/api/reels/${reelId}/comments`);
      const data = await response.json();

      if (response.ok) {
        setComments(data);
      }
    } catch (error) {
      console.log("Erreur fetch comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const sendComment = async () => {
    if (!text.trim()) return;

    try {
      setSending(true);

      const response = await fetch(
        `${Base_URL}/api/reels/${reelId}/comment?userId=${userId}&text=${encodeURIComponent(
          text
        )}`,
        { method: "POST" }
      );

      if (!response.ok) {
        console.log("Erreur add comment:", await response.text());
        return;
      }

      const newComment = await response.json();

      setComments((prev) => [newComment, ...prev]);
      setText("");
      onCommentAdded?.();
    } catch (error) {
      console.log("Erreur réseau comment:", error);
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    if (visible) {
      fetchComments();
    }
  }, [visible, reelId]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView
        style={styles.modalWrapper}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Commentaires</Text>

            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color="#111" />
            </TouchableOpacity>
          </View>

          {loading ? (
            <View style={styles.loadingBox}>
              <ActivityIndicator size="large" color="#111" />
            </View>
          ) : (
            <FlatList
              data={comments}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.list}
              ListEmptyComponent={
                <Text style={styles.emptyText}>
                  Aucun commentaire pour le moment
                </Text>
              }
              renderItem={({ item }) => (
                <View style={styles.commentItem}>
                  <View style={styles.avatar}>
                    <Ionicons name="person" size={18} color="white" />
                  </View>

                  <View style={styles.commentContent}>
                    <Text style={styles.username}>
                      {item.user?.username ||
                        item.user?.fullName ||
                        "Utilisateur"}
                    </Text>

                    <Text style={styles.commentText}>{item.text}</Text>
                  </View>
                </View>
              )}
            />
          )}

          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Ajouter un commentaire..."
              value={text}
              onChangeText={setText}
              multiline
            />

            <TouchableOpacity
              onPress={sendComment}
              disabled={sending || !text.trim()}
            >
              {sending ? (
                <ActivityIndicator size="small" color="#078738" />
              ) : (
                <Text style={styles.sendText}>Publier</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  container: {
    height: "72%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  header: {
    height: 55,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },

  loadingBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  list: {
    padding: 16,
    paddingBottom: 80,
  },

  emptyText: {
    textAlign: "center",
    color: "#777",
    marginTop: 30,
  },

  commentItem: {
    flexDirection: "row",
    marginBottom: 18,
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  commentContent: {
    flex: 1,
  },

  username: {
    fontWeight: "700",
    fontSize: 13,
    color: "#111",
    marginBottom: 2,
  },

  commentText: {
    fontSize: 14,
    color: "#222",
  },

  inputBox: {
    minHeight: 58,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: "#111",
  },

  sendText: {
    color: "#078738",
    fontWeight: "700",
    fontSize: 14,
    marginLeft: 8,
  },
});