package dev.aziz.TaskFlow.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardMemberDTO {
    private Integer id;
    private Integer boardId;
    private Integer userId;
    private String userName;
    private String userEmail;
    private String role;
    private LocalDateTime joinedAt;
}

