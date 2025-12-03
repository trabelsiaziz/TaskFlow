package dev.aziz.TaskFlow.Repositories;

import dev.aziz.TaskFlow.Entities.Card;
import dev.aziz.TaskFlow.Entities.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepository extends JpaRepository<Card, Integer> {

    java.util.List<Card> findByListOrderByPositionAsc(List list);

    java.util.List<Card> findByListAndArchivedFalseOrderByPositionAsc(List list);

    java.util.List<Card> findByListIdOrderByPositionAsc(Integer listId);
}

