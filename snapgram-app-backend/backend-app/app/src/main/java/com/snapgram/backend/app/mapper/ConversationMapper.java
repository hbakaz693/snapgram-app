package com.snapgram.backend.app.mapper;

import com.snapgram.backend.app.dto.response.ConversationResponse;
import com.snapgram.backend.app.model.Conversation;
import com.snapgram.backend.app.model.Message;
import com.snapgram.backend.app.model.User;
import org.springframework.stereotype.Component;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Component
public class ConversationMapper {

    public ConversationResponse toResponse(Conversation conversation, Long currentUserId) {
        User otherUser = conversation.getUserOne().getId().equals(currentUserId)
                ? conversation.getUserTwo()
                : conversation.getUserOne();

        List<Message> messages = conversation.getMessages();

        Message lastMessage = messages.stream()
                .max(Comparator.comparing(Message::getCreatedAt))
                .orElse(null);

        String lastMsg = lastMessage == null ? "" : lastMessage.getContent();

        String time = lastMessage == null ? "" : formatRelativeTime(lastMessage.getCreatedAt());

        long unread = messages.stream()
                .filter(m -> m.getSender().getId().equals(otherUser.getId()))
                .filter(m -> Boolean.FALSE.equals(m.getRead()))
                .count();

        String name = getDisplayName(otherUser);

        String avatar = otherUser.getProfilePicture() != null && !otherUser.getProfilePicture().isBlank()
                ? otherUser.getProfilePicture()
                : generateAvatar(name);

        return ConversationResponse.builder()
                .id(conversation.getId())
                .user(name)
                .avatar(avatar)
                .lastMsg(lastMsg)
                .time(time)
                .unread((int) unread)
                .online(false)
                .build();
    }

    private String getDisplayName(User user) {
        if (user.getFullName() != null && !user.getFullName().isBlank()) {
            return user.getFullName();
        }

        if (user.getUsername() != null && !user.getUsername().isBlank()) {
            return user.getUsername();
        }

        return user.getEmail();
    }

    private String generateAvatar(String name) {
        String encoded = URLEncoder.encode(name, StandardCharsets.UTF_8);
        return "https://ui-avatars.com/api/?name=" + encoded + "&background=0a7a3d&color=ffffff";
    }

    private String formatRelativeTime(LocalDateTime createdAt) {
        if (createdAt == null) {
            return "";
        }

        Duration d = Duration.between(createdAt, LocalDateTime.now());

        if (d.toMinutes() < 1) {
            return "maintenant";
        }

        if (d.toMinutes() < 60) {
            return d.toMinutes() + "m";
        }

        if (d.toHours() < 24) {
            return d.toHours() + "h";
        }

        return d.toDays() + "j";
    }
}