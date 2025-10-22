package dev.aziz.TaskFlow.Entities;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Role {
    private int id;
    private String name;

    public Role(int id, String name) {
        this.id = id;
        this.name = name;
    }
}
