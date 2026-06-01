package com.snapgram.backend.app.controller;

import com.snapgram.backend.app.model.Conversation;
import com.snapgram.backend.app.model.Message;
import com.snapgram.backend.app.model.User;
import com.snapgram.backend.app.repository.ConversationRepository;
import com.snapgram.backend.app.repository.MessageRepository;
import com.snapgram.backend.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dev")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DevSeedController {

    private final UserRepository userRepository;
    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;

    @PostMapping("/seed-messages")
    public String seedMessages() {
        User me = userRepository.findById(1L).orElseGet(() -> userRepository.save(
                User.builder()
                        .username("me_user")
                        .email("me@test.com")
                        .password("123456")
                        .fullName("Moi")
                        .profilePicture("https://ui-avatars.com/api/?name=Moi&background=0a7a3d&color=ffffff")
                        .bio("Compte test")
                        .build()
        ));

        User alice = userRepository.findByEmail("alice@test.com").orElseGet(() -> userRepository.save(
                User.builder()
                        .username("alice_travels")
                        .email("alice@test.com")
                        .password("123456")
                        .fullName("Alice Travels")
                        .profilePicture("https://randomuser.me/api/portraits/women/44.jpg")
                        .bio("Travel lover")
                        .build()
        ));

        User bob = userRepository.findByEmail("bob@test.com").orElseGet(() -> userRepository.save(
                User.builder()
                        .username("bob_fitness")
                        .email("bob@test.com")
                        .password("123456")
                        .fullName("Bob Fitness")
                        .profilePicture("https://randomuser.me/api/portraits/men/45.jpg")
                        .bio("Fitness coach")
                        .build()
        ));

        createConversationWithMessages(me, alice);
        createConversationWithMessages(me, bob);

        return "Fake users, conversations and messages created successfully";
    }

    private void createConversationWithMessages(User me, User otherUser) {
        Conversation conversation = conversationRepository
                .findBetweenUsers(me.getId(), otherUser.getId())
                .orElseGet(() -> conversationRepository.save(
                        Conversation.builder()
                                .userOne(me)
                                .userTwo(otherUser)
                                .build()
                ));

        if (!messageRepository.findByConversationIdOrderByCreatedAtAsc(conversation.getId()).isEmpty()) {
            return;
        }

        messageRepository.save(Message.builder()
                .conversation(conversation)
                .sender(otherUser)
                .receiver(me)
                .content("Salut! Comment ça va ?")
                .read(false)
                .build());

        messageRepository.save(Message.builder()
                .conversation(conversation)
                .sender(me)
                .receiver(otherUser)
                .content("Très bien merci! Et toi ?")
                .read(true)
                .build());

        messageRepository.save(Message.builder()
                .conversation(conversation)
                .sender(otherUser)
                .receiver(me)
                .content("Super! Tu as vu mon dernier post ?")
                .read(false)
                .build());

        messageRepository.save(Message.builder()
                .conversation(conversation)
                .sender(me)
                .receiver(otherUser)
                .content("Oui! C'est magnifique!")
                .read(true)
                .build());

        messageRepository.save(Message.builder()
                .conversation(conversation)
                .sender(otherUser)
                .receiver(me)
                .content("[Message vocal]")
                .read(false)
                .build());
    }
}