package dev.aziz.TaskFlow.Controllers;

import dev.aziz.TaskFlow.DTOs.ListDTO;
import dev.aziz.TaskFlow.Service.ListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lists")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ListController {

    private final ListService listService;

    @GetMapping("/board/{boardId}")
    public ResponseEntity<List<ListDTO>> getListsByBoardId(@PathVariable Integer boardId) {
        List<ListDTO> lists = listService.getListsByBoardId(boardId);
        return ResponseEntity.ok(lists);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ListDTO> getListById(@PathVariable Integer id) {
        ListDTO list = listService.getListById(id);
        return ResponseEntity.ok(list);
    }

    @PostMapping("/board/{boardId}")
    public ResponseEntity<ListDTO> createList(
            @PathVariable Integer boardId,
            @RequestBody ListDTO listDTO) {
        ListDTO createdList = listService.createList(boardId, listDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdList);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ListDTO> updateList(
            @PathVariable Integer id,
            @RequestBody ListDTO listDTO) {
        ListDTO updatedList = listService.updateList(id, listDTO);
        return ResponseEntity.ok(updatedList);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteList(@PathVariable Integer id) {
        listService.deleteList(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/position")
    public ResponseEntity<ListDTO> updateListPosition(
            @PathVariable Integer id,
            @RequestParam int position) {
        ListDTO updatedList = listService.updateListPosition(id, position);
        return ResponseEntity.ok(updatedList);
    }

    @PostMapping("/{id}/archive")
    public ResponseEntity<ListDTO> archiveList(@PathVariable Integer id) {
        ListDTO list = listService.archiveList(id);
        return ResponseEntity.ok(list);
    }

    @PostMapping("/{id}/copy")
    public ResponseEntity<ListDTO> copyList(@PathVariable Integer id) {
        ListDTO copiedList = listService.copyList(id);
        return ResponseEntity.status(HttpStatus.CREATED).body(copiedList);
    }
}

