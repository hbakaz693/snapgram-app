package com.snapgram.backend.app.service;

import com.snapgram.backend.app.dto.UserStatsResponse;
import com.snapgram.backend.app.model.User;
import com.snapgram.backend.app.repository.PostRepository;
import com.snapgram.backend.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public List<User> searchUsers(String name) {
        return userRepository
                .findByUsernameContainingIgnoreCaseOrFullNameContainingIgnoreCase(
                        name,
                        name
                );
    }

    public UserStatsResponse getUserStats(Long userId){
        long postsCount=postRepository.countByUserId(userId);

        long followersCount = 0;
long followingCount = 0;

return new UserStatsResponse(postsCount, followersCount, followingCount);
    }
}