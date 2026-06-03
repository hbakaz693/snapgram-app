package com.snapgram.backend.app.service;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.snapgram.backend.app.repository.StoryRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StoryCleanupService {
    private final StoryRepository storyRepository;
    
    //Execute chaque 1heur
    @Scheduled(fixedRate = 3600000)
    @Modifying
    @Transactional
    public void deleteOldStrories(){
        LocalDateTime limit=LocalDateTime.now().minusHours(1);
        storyRepository.deleteByCreatedAtBefore(limit);
        System.out.println("Anciennes stories supprimées");
    }
    
}
