package com.snapgram.backend.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserStatsResponse {
    private long postsCount;
    private long followersCount;
    private long followingCount;
}
