package com.snapgram.backend.app.controller;

import com.snapgram.backend.app.model.Reel;
import com.snapgram.backend.app.model.ReelComment;
import com.snapgram.backend.app.service.ReelService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/reels")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ReelController {

    private final ReelService reelService;

    @PostMapping("/{reelId}/comment")
public ReelComment addComment(
        @PathVariable Long reelId,
        @RequestParam Long userId,
        @RequestParam String text
) {
    return reelService.addComment(reelId, userId, text);
}

@GetMapping("/{reelId}/comments")
public List<ReelComment> getComments(
        @PathVariable Long reelId
) {
    return reelService.getCommentsByReel(reelId);
}



    @PostMapping("/{reelId}/like")
public Reel likeOrUnlikeReel(
        @PathVariable Long reelId,
        @RequestParam Long userId
) {
    return reelService.likeOrUnlikeReel(reelId, userId);
}

    // Ajouter reel avec upload video
    @PostMapping(value = "/add", consumes = "multipart/form-data")
    public Reel addReel(
            @RequestParam("file") MultipartFile file,
            @RequestParam("description") String description,
            @RequestParam("musicName") String musicName,
            @RequestParam("userId") Long userId
    ) throws Exception {

        return reelService.createReel(
                file,
                description,
                musicName,
                userId
        );
    }

    // Tous les reels
    @GetMapping
    public List<Reel> getAllReels() {
        return reelService.getAllReels();
    }

    // Reels utilisateur
    @GetMapping("/user/{userId}")
    public List<Reel> getUserReels(@PathVariable Long userId) {
        return reelService.getUserReels(userId);
    }

    // Supprimer reel
    @DeleteMapping("/{id}")
    public void deleteReel(@PathVariable Long id) {
        reelService.deleteReel(id);
    }
}