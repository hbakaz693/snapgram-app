package com.snapgram.backend.app.repository;

import com.snapgram.backend.app.model.Story;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.time.LocalDateTime;

//Recherche les stories cree avent 24 heur
public interface StoryRepository extends JpaRepository<Story, Long> {
    //Recherche les stories cree avent 24 heur
    List<Story> findByUserIdAndCreatedAtAfter(Long userId,LocalDateTime date);
    //Supprimer les stories ancien 
    void deleteByCreatedAtBefore(LocalDateTime date);
}

