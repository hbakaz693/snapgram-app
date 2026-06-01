package com.snapgram.backend.app.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SendMessageRequest {

    @NotNull(message = "Receiver id is required")
    private Long receiverId;

    @NotBlank(message = "Message content is required")
    private String content;
}