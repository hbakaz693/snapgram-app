package com.snapgram.backend.app.repository;

import com.snapgram.backend.app.model.SavedPost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SavedPostRepository
        extends JpaRepository<SavedPost, Long> {

    boolean existsByUserIdAndPostId(Long userId, Long postId);

    void deleteByUserIdAndPostId(Long userId, Long postId);
}