package com.snapgram.backend.app.service;

import com.snapgram.backend.app.model.Reel;
import com.snapgram.backend.app.model.User;
import com.snapgram.backend.app.repository.ReelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReelService {

    private final ReelRepository reelRepository;

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

        String videoUrl = "http://10.25.108.144:808/uploads/" + fileName;

        User user = new User();
        user.setId(userId);

        Reel reel = Reel.builder()
                .videoUrl(videoUrl)
                .description(description)
                .musicName(musicName)
                .user(user)
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
}