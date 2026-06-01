package com.snapgram.backend.app.mapper;

import com.snapgram.backend.app.dto.request.SendMessageRequest;
import com.snapgram.backend.app.dto.response.MessageResponse;
import com.snapgram.backend.app.model.Message;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Mapper(componentModel = "spring")
public interface MessageMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "sender", ignore = true)
    @Mapping(target = "receiver", ignore = true)
    @Mapping(target = "read", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    Message toEntity(SendMessageRequest request);

    @Mapping(target = "senderId", source = "sender.id")
    @Mapping(target = "receiverId", source = "receiver.id")
    @Mapping(target = "text", source = "content")
    @Mapping(target = "me", expression = "java(message.getSender().getId().equals(currentUserId))")
    @Mapping(target = "time", expression = "java(formatTime(message.getCreatedAt()))")
    MessageResponse toResponse(Message message, @Context Long currentUserId);

    default String formatTime(LocalDateTime dateTime) {
        if (dateTime == null) {
            return "";
        }

        return dateTime.format(DateTimeFormatter.ofPattern("HH:mm"));
    }
}