package dev.aziz.TaskFlow.Service;

import dev.aziz.TaskFlow.DTOs.CardDTO;
import dev.aziz.TaskFlow.DTOs.ListDTO;
import dev.aziz.TaskFlow.Entities.Board;
import dev.aziz.TaskFlow.Entities.List;
import dev.aziz.TaskFlow.Repositories.BoardRepository;
import dev.aziz.TaskFlow.Repositories.CardRepository;
import dev.aziz.TaskFlow.Repositories.ListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ListService {

    private final ListRepository listRepository;
    private final BoardRepository boardRepository;
    private final CardRepository cardRepository;

    @Transactional(readOnly = true)
    public java.util.List<ListDTO> getListsByBoardId(Integer boardId) {
        java.util.List<List> lists = listRepository.findByBoardIdOrderByPositionAsc(boardId);
        return lists.stream()
                .map(this::convertToDTOWithCards)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ListDTO getListById(Integer id) {
        List list = listRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("List not found with id: " + id));
        return convertToDTOWithCards(list);
    }

    @Transactional
    public ListDTO createList(Integer boardId, ListDTO listDTO) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("Board not found with id: " + boardId));

        // Get the highest position to place new list at the end
        java.util.List<List> existingLists = listRepository.findByBoardIdOrderByPositionAsc(boardId);
        int nextPosition = existingLists.isEmpty() ? 0 : existingLists.get(existingLists.size() - 1).getPosition() + 1;

        List list = new List();
        list.setTitle(listDTO.getTitle());
        list.setBoard(board);
        list.setPosition(nextPosition);

        List savedList = listRepository.save(list);
        return convertToDTO(savedList);
    }

    @Transactional
    public ListDTO updateList(Integer id, ListDTO listDTO) {
        List list = listRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("List not found with id: " + id));

        if (listDTO.getTitle() != null) {
            list.setTitle(listDTO.getTitle());
        }
        if (listDTO.getPosition() >= 0) {
            list.setPosition(listDTO.getPosition());
        }

        List updatedList = listRepository.save(list);
        return convertToDTO(updatedList);
    }

    @Transactional
    public void deleteList(Integer id) {
        if (!listRepository.existsById(id)) {
            throw new RuntimeException("List not found with id: " + id);
        }
        listRepository.deleteById(id);
    }

    @Transactional
    public ListDTO updateListPosition(Integer id, int newPosition) {
        List list = listRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("List not found with id: " + id));

        list.setPosition(newPosition);
        List updatedList = listRepository.save(list);
        return convertToDTO(updatedList);
    }

    @Transactional
    public ListDTO archiveList(Integer id) {
        List list = listRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("List not found with id: " + id));

        list.setArchived(!list.isArchived());
        List updatedList = listRepository.save(list);
        return convertToDTO(updatedList);
    }

    @Transactional
    public ListDTO copyList(Integer id) {
        List originalList = listRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("List not found with id: " + id));

        List newList = new List();
        newList.setTitle(originalList.getTitle() + " (Copy)");
        newList.setBoard(originalList.getBoard());
        newList.setPosition(originalList.getPosition() + 1);

        List savedList = listRepository.save(newList);
        return convertToDTO(savedList);
    }

    private ListDTO convertToDTO(List list) {
        ListDTO dto = new ListDTO();
        dto.setId(list.getId());
        dto.setTitle(list.getTitle());
        dto.setBoardId(list.getBoard().getId());
        dto.setPosition(list.getPosition());
        dto.setArchived(list.isArchived());
        dto.setCreatedAt(list.getCreatedAt());
        dto.setUpdatedAt(list.getUpdatedAt());
        return dto;
    }

    private ListDTO convertToDTOWithCards(List list) {
        ListDTO dto = convertToDTO(list);

        // Add cards
        java.util.List<CardDTO> cards = list.getCards().stream()
                .map(card -> {
                    CardDTO cardDTO = new CardDTO();
                    cardDTO.setId(card.getId());
                    cardDTO.setTitle(card.getTitle());
                    cardDTO.setDescription(card.getDescription());
                    cardDTO.setListId(card.getList().getId());
                    cardDTO.setPosition(card.getPosition());
                    cardDTO.setPriority(card.getPriority() != null ? card.getPriority().name() : null);
                    cardDTO.setDueDate(card.getDueDate());
                    cardDTO.setArchived(card.isArchived());
                    cardDTO.setCreatedAt(card.getCreatedAt());
                    cardDTO.setUpdatedAt(card.getUpdatedAt());
                    return cardDTO;
                })
                .collect(Collectors.toList());

        dto.setCards(cards);
        return dto;
    }
}

