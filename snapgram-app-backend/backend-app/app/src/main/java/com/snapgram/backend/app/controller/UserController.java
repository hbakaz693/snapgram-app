package com.snapgram.backend.app.controller;

import com.snapgram.backend.app.dto.UserStatsResponse;
import com.snapgram.backend.app.model.User;
import com.snapgram.backend.app.repository.UserRepository;
import com.snapgram.backend.app.service.UserService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    @GetMapping("/search")
    public List<User> searchUsers(@RequestParam String name) {
        return userService.searchUsers(name);
    }

    @PutMapping(value = "/{userId}/profile-picture", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public User updateProfilePicture(
            @PathVariable Long userId,
            @RequestParam("image") MultipartFile image
    ) throws IOException {

        Files.createDirectories(Paths.get("uploads/profiles/"));

        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        Path filePath = Paths.get("uploads/profiles/" + fileName);

        Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        user.setProfilePicture("http://10.25.108.144:808/uploads/profiles/" + fileName);

        return userRepository.save(user);
    }

     @GetMapping("/{userId}")
    public User getUserById(@PathVariable Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));
    }

    @GetMapping("/{userId}/stats")
public UserStatsResponse getUserStats(@PathVariable Long userId) {
    return userService.getUserStats(userId);
}

}