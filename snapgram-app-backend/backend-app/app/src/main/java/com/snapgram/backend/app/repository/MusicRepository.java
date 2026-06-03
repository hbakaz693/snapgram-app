package com.snapgram.backend.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.snapgram.backend.app.model.Music;

public interface MusicRepository extends JpaRepository<Music,Long>{
}