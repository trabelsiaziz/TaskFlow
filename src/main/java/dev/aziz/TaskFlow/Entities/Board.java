package dev.aziz.TaskFlow.Entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
public class Board {

    private int id;
    private String title;
    private String description;
    private Date createdAt;

}
