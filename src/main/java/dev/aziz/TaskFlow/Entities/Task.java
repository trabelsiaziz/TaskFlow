package dev.aziz.TaskFlow.Entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
public class Task {

    private int id;
    private String title;
    private String description;
    private String status;
    private Date DueDate;
    private User[] assignedUsers;

}
