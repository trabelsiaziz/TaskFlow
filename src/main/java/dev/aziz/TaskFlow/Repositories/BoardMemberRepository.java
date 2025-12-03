package dev.aziz.TaskFlow.Repositories;

import dev.aziz.TaskFlow.Entities.Board;
import dev.aziz.TaskFlow.Entities.BoardMember;
import dev.aziz.TaskFlow.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BoardMemberRepository extends JpaRepository<BoardMember, Integer> {

    List<BoardMember> findByBoard(Board board);

    List<BoardMember> findByUser(User user);

    Optional<BoardMember> findByBoardAndUser(Board board, User user);

    boolean existsByBoardAndUser(Board board, User user);
}

