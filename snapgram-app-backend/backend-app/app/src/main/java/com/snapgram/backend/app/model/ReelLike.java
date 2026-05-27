package com.snapgram.backend.app.model;

import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "reel_likes",uniqueConstraints = {
        @UniqueConstraint(columnNames = {"reel_id", "user_id"})
    })
    @Getter
    @Setter

    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
public class ReelLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "reel_id",nullable = false)
    private Reel reel;

    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    private User user;
    
}
