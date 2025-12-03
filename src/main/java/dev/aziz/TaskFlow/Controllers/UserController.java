package dev.aziz.TaskFlow.Controllers;

import dev.aziz.TaskFlow.Entities.User;
import dev.aziz.TaskFlow.Repositories.UserRepository;
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
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody Map<String, Object> loginInfo) {
        if (loginInfo == null || !loginInfo.containsKey("email") || !loginInfo.containsKey("password")) {
            Map<String, Object> errorBody = new HashMap<>();
            errorBody.put("success", false);
            errorBody.put("message", "Missing required fields: email and password");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorBody);
        }

        String email = loginInfo.get("email") == null ? "" : loginInfo.get("email").toString().trim();
        String password = loginInfo.get("password") == null ? "" : loginInfo.get("password").toString();

        log.info("User login data received: {}", loginInfo);

        User user = userRepository.findByEmail(email);
        if (user == null) {
            Map<String, Object> errorBody = new HashMap<>();
            errorBody.put("success", false);
            errorBody.put("message", "Invalid email or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorBody);
        }

        if (user.getPassword() == null || !user.getPassword().equals(password)) {
            Map<String, Object> errorBody = new HashMap<>();
            errorBody.put("success", false);
            errorBody.put("message", "Invalid email or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorBody);
        }

        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("success", true);
        responseBody.put("message", "User logged in successfully");
        return ResponseEntity.ok(responseBody);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteUser(@PathVariable int id) {
        if (!userRepository.existsById(id)) {
            Map<String, Object> errorBody = new HashMap<>();
            errorBody.put("success", false);
            errorBody.put("message", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorBody);
        }
        userRepository.deleteById(id);
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("success", true);
        responseBody.put("message", "User deleted successfully");
        return ResponseEntity.ok(responseBody);
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        log.info("Health check endpoint called");
        return ResponseEntity.ok("OK");
    }
}
