package com.snapgram.backend.app.service;

import com.snapgram.backend.app.dto.request.SendMessageRequest;
import com.snapgram.backend.app.dto.response.ConversationResponse;
import com.snapgram.backend.app.dto.response.MessageResponse;

import java.util.List;

public interface MessageService {

    MessageResponse sendMessage(Long senderId, SendMessageRequest request);

    List<MessageResponse> getConversationMessages(Long currentUserId, Long otherUserId);

    List<ConversationResponse> getConversations(Long currentUserId);
}