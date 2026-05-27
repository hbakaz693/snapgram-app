package com.snapgram.backend.app.service;

import com.snapgram.backend.app.model.Reel;
import com.snapgram.backend.app.model.ReelComment;
import com.snapgram.backend.app.model.ReelLike;
import com.snapgram.backend.app.model.User;
import com.snapgram.backend.app.repository.ReelCommentRepository;
import com.snapgram.backend.app.repository.ReelLikeRepository;
import com.snapgram.backend.app.repository.ReelRepository;
import com.snapgram.backend.app.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReelService {

    private final ReelRepository reelRepository;
    private final UserRepository userRepository;
    private final ReelLikeRepository reelLikeRepository;
    private final ReelCommentRepository reelCommentRepository;

    public Reel createReel(
            MultipartFile file,
            String description,
            String musicName,
            Long userId
    ) throws Exception {

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        Path uploadPath = Paths.get(System.getProperty("user.dir"), "uploads");

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve(fileName);
        file.transferTo(filePath.toFile());

        String videoUrl = "http://10.25.108.144:8080/uploads/" + fileName;

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Reel reel = Reel.builder()
                .videoUrl(videoUrl)
                .description(description)
                .musicName(musicName)
                .user(user)
                .likesCount(0)
                .commentsCount(0)
                .sharesCount(0)
                .createdAt(LocalDateTime.now())
                .build();

        return reelRepository.save(reel);
    }

    public List<Reel> getAllReels() {
        return reelRepository.findTop20ByOrderByCreatedAtDesc();
    }

    public List<Reel> getUserReels(Long userId) {
        return reelRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public void deleteReel(Long id) {
        reelRepository.deleteById(id);
    }

    @Transactional
    public Reel likeOrUnlikeReel(Long reelId, Long userId) {

        Reel reel = reelRepository.findById(reelId)
                .orElseThrow(() -> new RuntimeException("Reel not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean alreadyLiked =
                reelLikeRepository.existsByReelIdAndUserId(reelId, userId);

        if (alreadyLiked) {
            reelLikeRepository.deleteByReelIdAndUserId(reelId, userId);
        } else {
            ReelLike like = ReelLike.builder()
                    .reel(reel)
                    .user(user)
                    .build();

            reelLikeRepository.save(like);
        }

        long likesCount = reelLikeRepository.countByReelId(reelId);
        reel.setLikesCount((int) likesCount);

        return reelRepository.save(reel);
    }

    @Transactional
    public ReelComment addComment(Long reelId, Long userId, String text) {

        Reel reel = reelRepository.findById(reelId)
                .orElseThrow(() -> new RuntimeException("Reel not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ReelComment comment = ReelComment.builder()
                .text(text)
                .createdAt(LocalDateTime.now())
                .reel(reel)
                .user(user)
                .build();

        ReelComment savedComment = reelCommentRepository.save(comment);

        long commentsCount = reelCommentRepository.countByReelId(reelId);
        reel.setCommentsCount((int) commentsCount);

        reelRepository.save(reel);

        return savedComment;
    }

    public List<ReelComment> getCommentsByReel(Long reelId) {
        return reelCommentRepository.findByReelIdOrderByCreatedAtDesc(reelId);
    }
}