package com.snapgram.backend.app.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConversationResponse {

    private Long id;

    private String user;

    private String avatar;

    private String lastMsg;

    private String time;

    private Integer unread;

    private Boolean online;
}