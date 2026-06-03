package com.snapgram.backend.app.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.snapgram.backend.app.model.Post;
import com.snapgram.backend.app.model.SavedPost;
import com.snapgram.backend.app.repository.PostRepository;
import com.snapgram.backend.app.repository.SavedPostRepository;
import com.snapgram.backend.app.repository.UserRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    private final SavedPostRepository savedPostRepository;

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

public void saveOrUnsavePost(Long userId, Long postId) {

    boolean saved =
            savedPostRepository.existsByUserIdAndPostId(
                    userId,
                    postId
            );

    if (saved) {

        savedPostRepository.deleteByUserIdAndPostId(
                userId,
                postId
        );

    } else {

        SavedPost save = new SavedPost();

        save.setUser(userRepository.findById(userId).get());

        save.setPost(postRepository.findById(postId).get());

        savedPostRepository.save(save);
    }
}


}
