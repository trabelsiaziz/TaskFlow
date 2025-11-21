package dev.aziz.TaskFlow.Entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Column {
    private int id;
    private String name;
    private Card[] cards;
}
