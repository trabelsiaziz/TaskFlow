package dev.aziz.TaskFlow.Repositories;

import dev.aziz.TaskFlow.Entities.Board;
import dev.aziz.TaskFlow.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Integer> {

    List<Board> findByOwner(User owner);

    List<Board> findByOwnerOrderByCreatedAtDesc(User owner);

    @Query("SELECT b FROM Board b WHERE b.owner = :user OR EXISTS (SELECT bm FROM BoardMember bm WHERE bm.board = b AND bm.user = :user)")
    List<Board> findAllBoardsForUser(@Param("user") User user);

    @Query("SELECT b FROM Board b WHERE b.owner = :user AND b.isStarred = true")
    List<Board> findStarredBoardsByOwner(@Param("user") User user);
}

