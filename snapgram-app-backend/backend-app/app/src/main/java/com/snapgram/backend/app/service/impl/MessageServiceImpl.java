package com.snapgram.backend.app.service.impl;


import com.snapgram.backend.app.dto.request.SendMessageRequest;
import com.snapgram.backend.app.dto.response.ConversationResponse;
import com.snapgram.backend.app.dto.response.MessageResponse;
import com.snapgram.backend.app.mapper.ConversationMapper;
import com.snapgram.backend.app.mapper.MessageMapper;
import com.snapgram.backend.app.model.Conversation;
import com.snapgram.backend.app.model.Message;
import com.snapgram.backend.app.model.User;
import com.snapgram.backend.app.repository.ConversationRepository;
import com.snapgram.backend.app.repository.MessageRepository;
import com.snapgram.backend.app.repository.UserRepository;
import com.snapgram.backend.app.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final MessageMapper messageMapper;
    private final ConversationMapper conversationMapper;   // ajouté
    //private final SimpMessagingTemplate messagingTemplate;
    private final ConversationRepository conversationRepository;

    @Override
    @Transactional
    public MessageResponse sendMessage(Long senderId, SendMessageRequest request) {
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Sender not found"));

        User receiver = userRepository.findById(request.getReceiverId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Receiver not found"));

        Conversation conversation = conversationRepository
                .findBetweenUsers(sender.getId(), receiver.getId())
                .orElseGet(() -> conversationRepository.save(
                        Conversation.builder().userOne(sender).userTwo(receiver).build()
                ));

        Message message = Message.builder()
                .conversation(conversation)
                .sender(sender)
                .receiver(receiver)
                .content(request.getContent())
                .read(false)
                .build();

        return messageMapper.toResponse(messageRepository.save(message), sender.getId());
    }

    @Override
    @Transactional
    public List<MessageResponse> getConversationMessages(Long currentUserId, Long otherUserId) {
        userRepository.findById(currentUserId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        userRepository.findById(otherUserId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        // CORRECTION : retourner liste vide au lieu de 404
        Optional<Conversation> convOpt = conversationRepository
                .findBetweenUsers(currentUserId, otherUserId);

        if (convOpt.isEmpty()) return List.of();

        Conversation conversation = convOpt.get();

        messageRepository.markMessagesAsRead(otherUserId, currentUserId);

        return messageRepository
                .findByConversationIdOrderByCreatedAtAsc(conversation.getId())
                .stream()
                .map(m -> messageMapper.toResponse(m, currentUserId))
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ConversationResponse> getConversations(Long currentUserId) {
        return conversationRepository.findByUserId(currentUserId)
                .stream()
                .map(c -> conversationMapper.toResponse(c, currentUserId))
                .toList();
    }
}