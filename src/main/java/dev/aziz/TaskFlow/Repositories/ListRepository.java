package dev.aziz.TaskFlow.Repositories;

import dev.aziz.TaskFlow.Entities.Board;
import dev.aziz.TaskFlow.Entities.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListRepository extends JpaRepository<List, Integer> {

    java.util.List<List> findByBoardOrderByPositionAsc(Board board);

    java.util.List<List> findByBoardAndArchivedFalseOrderByPositionAsc(Board board);

    java.util.List<List> findByBoardIdOrderByPositionAsc(Integer boardId);
}

