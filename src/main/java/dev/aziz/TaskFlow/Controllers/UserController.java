package dev.aziz.TaskFlow.Controllers;

import dev.aziz.TaskFlow.Entities.User;
import dev.aziz.TaskFlow.Repositories.UserRepository;
import dev.aziz.TaskFlow.Service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/users")
@SuppressWarnings({"unused"}) // Controller discovered via component scan
public class UserController {

    private UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> registerUser(@RequestBody Map<String, Object> userinfo) {
        // Basic validation placeholder (replace with DTO + validation annotations later)
        if (userinfo == null || !userinfo.containsKey("email") || !userinfo.containsKey("password")) {
            Map<String, Object> errorBody = new HashMap<>();
            errorBody.put("success", false);
            errorBody.put("message", "Missing required fields: email and password");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorBody);
        }

        log.info("User registration data received: {}", userinfo);
        User user = new User();
        user.setEmail((String) userinfo.get("email"));
        user.setPassword((String) userinfo.get("password"));
        user.setName((String) userinfo.get("fullName"));

        userRepository.save(user);

        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("success", true);
        responseBody.put("message", "User registered successfully (stub)");
        return ResponseEntity.status(HttpStatus.CREATED).body(responseBody);
    }

    @GetMapping("/")
    public ResponseEntity<List<User>> allUsers() {
        var users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        log.info("Health check endpoint called");
        return ResponseEntity.ok("OK");
    }
}
