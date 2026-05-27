package com.snapgram.backend.app.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.snapgram.backend.app.model.Post;
import com.snapgram.backend.app.repository.PostRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    public Post createPost(Post post){
        return postRepository.save(post);
    }

    public List<Post> getUserPosts(Long userId){
        return postRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public List<Post> getAllPosts(){
        return postRepository.findTop10ByOrderByCreatedAtDesc();
    }

    public void deletPost(Long Id){
        postRepository.deleteByUserId(Id);
    }

   public Post likePost(Long postId) {
    Post post = postRepository.findById(postId)
            .orElseThrow(() -> new RuntimeException("Post introuvable"));

    post.setLikeCount(post.getLikeCount() + 1);
    post.setCreatedAt(LocalDateTime.now());

    return postRepository.save(post);
}


}
