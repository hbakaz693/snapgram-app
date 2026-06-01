package com.snapgram.backend.app.repository;

import com.snapgram.backend.app.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findByConversationIdOrderByCreatedAtAsc(Long conversationId);

    @Query("""
        SELECT m FROM Message m
        WHERE m.sender.id = :userId OR m.receiver.id = :userId
        ORDER BY m.createdAt DESC
    """)
    List<Message> findUserMessagesOrderByCreatedAtDesc(@Param("userId") Long userId);

    @Query("""
        SELECT COUNT(m) FROM Message m
        WHERE m.sender.id = :senderId
        AND m.receiver.id = :receiverId
        AND m.read = false
    """)
    int countUnreadMessages(
            @Param("senderId") Long senderId,
            @Param("receiverId") Long receiverId
    );

    @Modifying
    @Query("""
        UPDATE Message m
        SET m.read = true
        WHERE m.sender.id = :senderId
        AND m.receiver.id = :receiverId
        AND m.read = false
    """)
    void markMessagesAsRead(
            @Param("senderId") Long senderId,
            @Param("receiverId") Long receiverId
    );
}