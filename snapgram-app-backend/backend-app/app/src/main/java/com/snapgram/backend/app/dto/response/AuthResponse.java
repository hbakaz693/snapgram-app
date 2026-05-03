package com.snapgram.backend.app.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {

    private Long id;
    private String username;
    private String email;
    private String fullName;
    private String token;
    private String message;
}