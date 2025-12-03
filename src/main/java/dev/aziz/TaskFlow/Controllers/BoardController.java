package dev.aziz.TaskFlow.Controllers;

import dev.aziz.TaskFlow.DTOs.BoardDTO;
import dev.aziz.TaskFlow.DTOs.BoardMemberDTO;
import dev.aziz.TaskFlow.Service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BoardController {

    private final BoardService boardService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BoardDTO>> getAllBoardsForUser(@PathVariable Integer userId) {
        List<BoardDTO> boards = boardService.getAllBoardsForUser(userId);
        return ResponseEntity.ok(boards);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BoardDTO> getBoardById(@PathVariable Integer id) {
        BoardDTO board = boardService.getBoardById(id);
        return ResponseEntity.ok(board);
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<BoardDTO> createBoard(
            @PathVariable Integer userId,
            @RequestBody BoardDTO boardDTO) {
        BoardDTO createdBoard = boardService.createBoard(boardDTO, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBoard);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BoardDTO> updateBoard(
            @PathVariable Integer id,
            @RequestBody BoardDTO boardDTO) {
        BoardDTO updatedBoard = boardService.updateBoard(id, boardDTO);
        return ResponseEntity.ok(updatedBoard);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBoard(@PathVariable Integer id) {
        boardService.deleteBoard(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/star")
    public ResponseEntity<BoardDTO> toggleStarBoard(@PathVariable Integer id) {
        BoardDTO board = boardService.toggleStarBoard(id);
        return ResponseEntity.ok(board);
    }

    // Board Members endpoints
    @GetMapping("/{boardId}/members")
    public ResponseEntity<List<BoardMemberDTO>> getBoardMembers(@PathVariable Integer boardId) {
        List<BoardMemberDTO> members = boardService.getBoardMembers(boardId);
        return ResponseEntity.ok(members);
    }

    @PostMapping("/{boardId}/members/{userId}")
    public ResponseEntity<BoardMemberDTO> addMemberToBoard(
            @PathVariable Integer boardId,
            @PathVariable Integer userId,
            @RequestParam(required = false, defaultValue = "MEMBER") String role) {
        BoardMemberDTO member = boardService.addMemberToBoard(boardId, userId, role);
        return ResponseEntity.status(HttpStatus.CREATED).body(member);
    }

    @DeleteMapping("/{boardId}/members/{userId}")
    public ResponseEntity<Void> removeMemberFromBoard(
            @PathVariable Integer boardId,
            @PathVariable Integer userId) {
        boardService.removeMemberFromBoard(boardId, userId);
        return ResponseEntity.noContent().build();
    }
}

