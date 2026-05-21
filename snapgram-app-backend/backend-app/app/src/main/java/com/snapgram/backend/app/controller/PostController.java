package com.snapgram.backend.app.controller;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.snapgram.backend.app.model.Post;
import com.snapgram.backend.app.service.PostService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PostController {

    private final PostService postService;

    private final String UPLOAD_DIR = "uploads/";

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Post createPost(
            @RequestParam("image") MultipartFile image,
            @RequestParam("description") String description,
            @RequestParam("userId") Long userId
    ) throws IOException {

        Files.createDirectories(Paths.get(UPLOAD_DIR));

        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        Path filePath = Paths.get(UPLOAD_DIR + fileName);

        Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        Post post = new Post();
        post.setImgUrl("http://10.25.108.1441:808/uploads/" + fileName);
        post.setDescription(description);
        post.setUserId(userId);

        return postService.createPost(post);
    }

    @GetMapping("/user/{userId}")
    public List<Post> getUserPosts(@PathVariable Long userId) {
        return postService.getUserPosts(userId);
    }

    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @DeleteMapping("/{userId}")
    public void deletePost(@PathVariable Long userId) {
        postService.deletPost(userId);
    }
}