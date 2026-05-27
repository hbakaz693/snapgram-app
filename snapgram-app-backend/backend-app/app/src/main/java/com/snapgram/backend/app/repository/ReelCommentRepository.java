package com.snapgram.backend.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.snapgram.backend.app.model.ReelComment;

public interface ReelCommentRepository extends JpaRepository<ReelComment,Long> {
    List<ReelComment> findByReelIdOrderByCreatedAtDesc(Long reelId);

    long countByReelId(Long reelId);
}