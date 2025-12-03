package dev.aziz.TaskFlow.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CardDTO {
    private Integer id;
    private String title;
    private String description;
    private Integer listId;
    private int position;
    private String priority;
    private LocalDate dueDate;
    private boolean archived;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

