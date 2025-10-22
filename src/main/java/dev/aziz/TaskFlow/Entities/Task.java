package dev.aziz.TaskFlow.Entities;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class Task {

    private int id;
    private String title;
    private String description;
    private String status;
    private Date DueDate;
    private User[] assignedUsers;

    public Task(int id, String title, String description, String status, Date dueDate, User[] assignedUsers) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        DueDate = dueDate;
        this.assignedUsers = assignedUsers;
    }

}
