package dev.aziz.TaskFlow.Entities;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Card {
    private int id;
    private User[] assignedUsers;
}
