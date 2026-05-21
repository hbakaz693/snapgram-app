package com.snapgram.backend.app.repository;

import com.snapgram.backend.app.model.Reel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReelRepository extends JpaRepository<Reel, Long> {

    List<Reel> findByUserIdOrderByCreatedAtDesc(Long userId);

    List<Reel> findTop20ByOrderByCreatedAtDesc();
}