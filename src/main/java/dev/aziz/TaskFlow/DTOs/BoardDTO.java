package dev.aziz.TaskFlow.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardDTO {
    private Integer id;
    private String title;
    private String description;
    private String background;
    private String visibility;
    private Integer ownerId;
    private String ownerName;
    private boolean isStarred;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<ListDTO> lists;
    private List<BoardMemberDTO> members;
}

