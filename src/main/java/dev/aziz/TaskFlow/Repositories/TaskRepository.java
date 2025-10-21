package dev.aziz.TaskFlow.Repositories;

import dev.aziz.TaskFlow.Entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
}