package com.snapgram.backend.app.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MessageResponse {

    private Long id;

    private Long senderId;

    private Long receiverId;

    private String text;

    @JsonProperty("isMe")
    private Boolean me;

    private String time;

    private LocalDateTime createdAt;
}