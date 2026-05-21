package com.snapgram.backend.app.service;

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
}
