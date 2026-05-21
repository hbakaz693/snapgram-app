 package com.snapgram.backend.app.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "Posts")
@NoArgsConstructor
@AllArgsConstructor

public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String imgUrl;
    @Column(length = 500)
    private String description;
    @Column(nullable = false)
    private Long userId;
    @Column(nullable = false,updatable = false)
    private LocalDateTime createdAt;
    @PrePersist
    protected void OnCreate(){
        createdAt=LocalDateTime.now();
    }
}