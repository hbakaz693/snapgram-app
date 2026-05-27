package com.snapgram.backend.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.snapgram.backend.app.model.ReelLike;

public interface ReelLikeRepository extends JpaRepository<ReelLike,Long> {
    //Verifie si utilisateur est deja likes 
    boolean existsByReelIdAndUserId(Long reelId, Long userId);

    void deleteByReelIdAndUserId(Long reelId,Long userId);

    long countByReelId(Long reelId);

}
