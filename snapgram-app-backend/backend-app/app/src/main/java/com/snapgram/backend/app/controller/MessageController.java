package com.snapgram.backend.app.controller;

import com.snapgram.backend.app.dto.request.SendMessageRequest;
import com.snapgram.backend.app.dto.response.ConversationResponse;
import com.snapgram.backend.app.dto.response.MessageResponse;
import com.snapgram.backend.app.service.MessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MessageController {

    private final MessageService messageService;

    // TODO: remplacer par JWT
    private Long getCurrentUserId() { return 1L; }

    // Liste des conversations de l'utilisateur connecté
    @GetMapping("/conversations")
    public ResponseEntity<List<ConversationResponse>> getConversations() {
        return ResponseEntity.ok(messageService.getConversations(getCurrentUserId()));
    }

    // Messages entre l'utilisateur connecté et un autre utilisateur
    // CORRECTION : l'ordre était inversé — getCurrentUserId() en premier
    @GetMapping("/conversations/{otherId}")
    public ResponseEntity<List<MessageResponse>> getMessages(@PathVariable Long otherId) {
        return ResponseEntity.ok(
                messageService.getConversationMessages(getCurrentUserId(), otherId)
        );
    }

    // Envoyer un message
    @PostMapping
    public ResponseEntity<MessageResponse> send(@RequestBody @Valid SendMessageRequest req) {
        return ResponseEntity.ok(messageService.sendMessage(getCurrentUserId(), req));
    }
}