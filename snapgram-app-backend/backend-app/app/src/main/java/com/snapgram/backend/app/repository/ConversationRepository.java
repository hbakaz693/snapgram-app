package com.snapgram.backend.app.repository;

import com.snapgram.backend.app.model.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {

    @Query("""
        SELECT c FROM Conversation c
        WHERE c.userOne.id = :userId OR c.userTwo.id = :userId
        ORDER BY c.updatedAt DESC
    """)
    List<Conversation> findByUserId(@Param("userId") Long userId);

    @Query("""
        SELECT c FROM Conversation c
        WHERE 
            (c.userOne.id = :userOneId AND c.userTwo.id = :userTwoId)
            OR
            (c.userOne.id = :userTwoId AND c.userTwo.id = :userOneId)
    """)
    Optional<Conversation> findBetweenUsers(
            @Param("userOneId") Long userOneId,
            @Param("userTwoId") Long userTwoId
    );
}