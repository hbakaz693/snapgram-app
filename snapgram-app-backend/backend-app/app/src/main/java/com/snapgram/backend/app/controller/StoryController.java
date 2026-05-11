package com.snapgram.backend.app.controller;

import com.snapgram.backend.app.model.User;
import com.snapgram.backend.app.model.Story;
import com.snapgram.backend.app.repository.UserRepository;
import com.snapgram.backend.app.repository.StoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/stories")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class StoryController {
    private final StoryRepository storyRepository;
    private final UserRepository userRepository;

    // Créer le dossier uploads dans le projet
    private final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/stories/";

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addStory(
            @RequestParam Long userId,
            @RequestParam("image") MultipartFile file) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            // 1. Vérifier l'utilisateur
            User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable avec ID: " + userId));
            
            // 2. Créer le dossier s'il n'existe pas
            File directory = new File(UPLOAD_DIR);
            if (!directory.exists()) {
                boolean created = directory.mkdirs();
                System.out.println("Dossier créé: " + created + " à " + UPLOAD_DIR);
            }
            
            // 3. Vérifier si une image a été envoyée
            if (file == null || file.isEmpty()) {
                response.put("success", false);
                response.put("message", "Aucune image envoyée");
                return ResponseEntity.badRequest().body(response);
            }
            
            // 4. Générer un nom unique
            String originalFileName = file.getOriginalFilename();
            String fileExtension = "";
            if (originalFileName != null && originalFileName.contains(".")) {
                fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
            }
            String fileName = UUID.randomUUID().toString() + fileExtension;
            
            // 5. Sauvegarder l'image
            Path filePath = Paths.get(UPLOAD_DIR + fileName);
            Files.write(filePath, file.getBytes());
            
            // 6. Créer l'URL publique
            String imageUrl = "http://10.68.202.144:8080/uploads/stories/" + fileName;
            
            // 7. Sauvegarder en base
            Story story = Story.builder()
                .imageUrl(imageUrl)
                .user(user)
                .build();
            
            Story savedStory = storyRepository.save(story);
            
            response.put("success", true);
            response.put("message", "Story ajoutée avec succès");
            response.put("storyId", savedStory.getId());
            response.put("imageUrl", imageUrl);
            
            return ResponseEntity.ok(response);
            
        } catch (IOException e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "Erreur d'upload: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
            
        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("message", "Erreur: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    //Get les stories moins de 24H
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getStories(@PathVariable Long userId) {
        try {
            LocalDateTime limit=LocalDateTime.now().minusHours(1);
            //stories<24
            List<Story> stories = storyRepository.findByUserIdAndCreatedAtAfter(userId,limit);
            return ResponseEntity.ok(stories);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.internalServerError().body(error);
        }
    }
}