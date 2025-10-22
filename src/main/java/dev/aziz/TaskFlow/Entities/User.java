package dev.aziz.TaskFlow.Entities;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class User {
    private int id;
    private String name;
    private String email;
    private String password;
    private Role role;

    public User(Role role, String password, String email, String name, int id) {
        this.role = role;
        this.password = password;
        this.email = email;
        this.name = name;
        this.id = id;
    }

}
