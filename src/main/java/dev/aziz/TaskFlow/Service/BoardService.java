package dev.aziz.TaskFlow.Service;

import dev.aziz.TaskFlow.DTOs.BoardDTO;
import dev.aziz.TaskFlow.DTOs.BoardMemberDTO;
import dev.aziz.TaskFlow.DTOs.ListDTO;
import dev.aziz.TaskFlow.DTOs.CardDTO;
import dev.aziz.TaskFlow.Entities.Board;
import dev.aziz.TaskFlow.Entities.BoardMember;
import dev.aziz.TaskFlow.Entities.User;
import dev.aziz.TaskFlow.Repositories.BoardMemberRepository;
import dev.aziz.TaskFlow.Repositories.BoardRepository;
import dev.aziz.TaskFlow.Repositories.UserRepository;
import dev.aziz.TaskFlow.Repositories.ListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final BoardMemberRepository boardMemberRepository;
    private final ListRepository listRepository;

    @Transactional(readOnly = true)
    public List<BoardDTO> getAllBoardsForUser(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        List<Board> boards = boardRepository.findAllBoardsForUser(user);
        return boards.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public BoardDTO getBoardById(Integer id) {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Board not found with id: " + id));
        return convertToDTOWithDetails(board);
    }

    @Transactional
    public BoardDTO createBoard(BoardDTO boardDTO, Integer userId) {
        User owner = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        Board board = new Board();
        board.setTitle(boardDTO.getTitle());
        board.setDescription(boardDTO.getDescription());
        board.setBackground(boardDTO.getBackground());
        board.setVisibility(boardDTO.getVisibility() != null
            ? Board.Visibility.valueOf(boardDTO.getVisibility())
            : Board.Visibility.PRIVATE);
        board.setOwner(owner);

        Board savedBoard = boardRepository.save(board);
        return convertToDTO(savedBoard);
    }

    @Transactional
    public BoardDTO updateBoard(Integer id, BoardDTO boardDTO) {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Board not found with id: " + id));

        if (boardDTO.getTitle() != null) {
            board.setTitle(boardDTO.getTitle());
        }
        if (boardDTO.getDescription() != null) {
            board.setDescription(boardDTO.getDescription());
        }
        if (boardDTO.getBackground() != null) {
            board.setBackground(boardDTO.getBackground());
        }
        if (boardDTO.getVisibility() != null) {
            board.setVisibility(Board.Visibility.valueOf(boardDTO.getVisibility()));
        }

        Board updatedBoard = boardRepository.save(board);
        return convertToDTO(updatedBoard);
    }

    @Transactional
    public void deleteBoard(Integer id) {
        if (!boardRepository.existsById(id)) {
            throw new RuntimeException("Board not found with id: " + id);
        }
        boardRepository.deleteById(id);
    }

    @Transactional
    public BoardDTO toggleStarBoard(Integer id) {
        Board board = boardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Board not found with id: " + id));

        board.setStarred(!board.isStarred());
        Board updatedBoard = boardRepository.save(board);
        return convertToDTO(updatedBoard);
    }

    @Transactional
    public BoardMemberDTO addMemberToBoard(Integer boardId, Integer userId, String role) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("Board not found with id: " + boardId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        if (boardMemberRepository.existsByBoardAndUser(board, user)) {
            throw new RuntimeException("User is already a member of this board");
        }

        BoardMember member = new BoardMember();
        member.setBoard(board);
        member.setUser(user);
        member.setRole(role != null ? BoardMember.Role.valueOf(role) : BoardMember.Role.MEMBER);

        BoardMember savedMember = boardMemberRepository.save(member);
        return convertMemberToDTO(savedMember);
    }

    @Transactional
    public void removeMemberFromBoard(Integer boardId, Integer userId) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("Board not found with id: " + boardId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        BoardMember member = boardMemberRepository.findByBoardAndUser(board, user)
                .orElseThrow(() -> new RuntimeException("Member not found in this board"));

        boardMemberRepository.delete(member);
    }

    @Transactional(readOnly = true)
    public List<BoardMemberDTO> getBoardMembers(Integer boardId) {
        Board board = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("Board not found with id: " + boardId));

        return boardMemberRepository.findByBoard(board).stream()
                .map(this::convertMemberToDTO)
                .collect(Collectors.toList());
    }

    private BoardDTO convertToDTO(Board board) {
        BoardDTO dto = new BoardDTO();
        dto.setId(board.getId());
        dto.setTitle(board.getTitle());
        dto.setDescription(board.getDescription());
        dto.setBackground(board.getBackground());
        dto.setVisibility(board.getVisibility().name());
        dto.setOwnerId(board.getOwner().getId());
        dto.setOwnerName(board.getOwner().getName());
        dto.setStarred(board.isStarred());
        dto.setCreatedAt(board.getCreatedAt());
        dto.setUpdatedAt(board.getUpdatedAt());
        return dto;
    }

    private BoardDTO convertToDTOWithDetails(Board board) {
        BoardDTO dto = convertToDTO(board);

        // Add lists with cards
        List<ListDTO> lists = board.getLists().stream()
                .map(list -> {
                    ListDTO listDTO = new ListDTO();
                    listDTO.setId(list.getId());
                    listDTO.setTitle(list.getTitle());
                    listDTO.setBoardId(list.getBoard().getId());
                    listDTO.setPosition(list.getPosition());
                    listDTO.setArchived(list.isArchived());
                    listDTO.setCreatedAt(list.getCreatedAt());
                    listDTO.setUpdatedAt(list.getUpdatedAt());

                    // Add cards to list
                    List<CardDTO> cards = list.getCards().stream()
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
                    listDTO.setCards(cards);

                    return listDTO;
                })
                .collect(Collectors.toList());
        dto.setLists(lists);

        // Add members
        List<BoardMemberDTO> members = board.getMembers().stream()
                .map(this::convertMemberToDTO)
                .collect(Collectors.toList());
        dto.setMembers(members);

        return dto;
    }

    private BoardMemberDTO convertMemberToDTO(BoardMember member) {
        BoardMemberDTO dto = new BoardMemberDTO();
        dto.setId(member.getId());
        dto.setBoardId(member.getBoard().getId());
        dto.setUserId(member.getUser().getId());
        dto.setUserName(member.getUser().getName());
        dto.setUserEmail(member.getUser().getEmail());
        dto.setRole(member.getRole().name());
        dto.setJoinedAt(member.getJoinedAt());
        return dto;
    }
}

