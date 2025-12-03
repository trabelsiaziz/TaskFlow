package dev.aziz.TaskFlow.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ListDTO {
    private Integer id;
    private String title;
    private Integer boardId;
    private int position;
    private boolean archived;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<CardDTO> cards;
}

