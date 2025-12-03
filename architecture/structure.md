# Trello Clone - Complete Architecture Guide

## 📁 Project Structure

```
TaskFlow/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── dev/
│   │   │       └── aziz/
│   │   │           └── TaskFlow/
│   │   │               ├── TaskFlowApplication.java
│   │   │               ├── configs/
│   │   │               │   ├── Config.java
│   │   │               │   ├── SecurityConfig.java
│   │   │               │   └── WebSocketConfig.java
│   │   │               ├── Controllers/
│   │   │               │   ├── AuthController.java
│   │   │               │   ├── UserController.java
│   │   │               │   ├── BoardController.java
│   │   │               │   ├── ListController.java
│   │   │               │   └── CardController.java
│   │   │               ├── Entities/
│   │   │               │   ├── User.java
│   │   │               │   ├── Board.java
│   │   │               │   ├── ListEntity.java
│   │   │               │   ├── Card.java
│   │   │               │   ├── Comment.java
│   │   │               │   ├── Label.java
│   │   │               │   └── BoardMember.java
│   │   │               ├── Repositories/
│   │   │               │   ├── UserRepository.java
│   │   │               │   ├── BoardRepository.java
│   │   │               │   ├── ListRepository.java
│   │   │               │   ├── CardRepository.java
│   │   │               │   ├── CommentRepository.java
│   │   │               │   └── LabelRepository.java
│   │   │               ├── Service/
│   │   │               │   ├── UserService.java
│   │   │               │   ├── AuthService.java
│   │   │               │   ├── BoardService.java
│   │   │               │   ├── ListService.java
│   │   │               │   ├── CardService.java
│   │   │               │   ├── EmailService.java
│   │   │               │   └── NotificationService.java
│   │   │               ├── DTOs/
│   │   │               │   ├── UserDTO.java
│   │   │               │   ├── BoardDTO.java
│   │   │               │   ├── CardDTO.java
│   │   │               │   └── AuthDTO.java
│   │   │               ├── security/
│   │   │               │   ├── JwtAuthenticationFilter.java
│   │   │               │   ├── JwtTokenProvider.java
│   │   │               │   └── CustomUserDetailsService.java
│   │   │               ├── exceptions/
│   │   │               │   ├── GlobalExceptionHandler.java
│   │   │               │   ├── ResourceNotFoundException.java
│   │   │               │   └── UnauthorizedException.java
│   │   │               └── utils/
│   │   │                   └── ValidationUtils.java
│   │   └── resources/
│   │       ├── application.yml
│   │       ├── static/
│   │       └── templates/
│   └── test/
│       └── java/
│           └── dev/
│               └── aziz/
│                   └── TaskFlow/
│                       └── TaskFlowApplicationTests.java
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Board.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Column.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Welcome.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── pom.xml
├── mvnw
├── mvnw.cmd
├── Dockerfile
└── compose.yaml
```

## 🔌 API Endpoints

### Authentication

```
POST   /api/auth/register          # Register new user
POST   /api/auth/login             # Login user
POST   /api/auth/logout            # Logout user
POST   /api/auth/refresh-token     # Refresh JWT token
POST   /api/auth/forgot-password   # Send password reset email
POST   /api/auth/reset-password    # Reset password with token
GET    /api/auth/me                # Get current user
```

### Users

```
GET    /api/users/:id              # Get user profile
PUT    /api/users/:id              # Update user profile
DELETE /api/users/:id              # Delete user account
GET    /api/users/search           # Search users (for invitations)
PUT    /api/users/:id/avatar       # Upload avatar
```

### Boards

```
GET    /api/boards                 # Get all boards for user
POST   /api/boards                 # Create new board
GET    /api/boards/:id             # Get board details with lists & cards
PUT    /api/boards/:id             # Update board
DELETE /api/boards/:id             # Delete board
POST   /api/boards/:id/star        # Star/unstar board
# Board Members
GET    /api/boards/:id/members     # Get board members
POST   /api/boards/:id/members     # Add member to board
PUT    /api/boards/:id/members/:userId  # Update member role
DELETE /api/boards/:id/members/:userId  # Remove member

# Board Labels
GET    /api/boards/:id/labels      # Get all labels
POST   /api/boards/:id/labels      # Create label
PUT    /api/boards/:id/labels/:labelId  # Update label
DELETE /api/boards/:id/labels/:labelId  # Delete label
```

### Lists

```
GET    /api/lists/:id              # Get list details
POST   /api/boards/:boardId/lists  # Create list
PUT    /api/lists/:id              # Update list (title)
DELETE /api/lists/:id              # Delete list
POST   /api/lists/:id/archive      # Archive list
PUT    /api/lists/:id/position     # Reorder list
POST   /api/lists/:id/copy         # Duplicate list
```

### Cards

```
GET    /api/cards/:id              # Get card details
POST   /api/lists/:listId/cards    # Create card
PUT    /api/cards/:id              # Update card
DELETE /api/cards/:id              # Delete card
POST   /api/cards/:id/archive      # Archive card
PUT    /api/cards/:id/move         # Move card to another list
PUT    /api/cards/:id/position     # Reorder card

# Card Members
POST   /api/cards/:id/members      # Assign member to card
DELETE /api/cards/:id/members/:userId  # Unassign member

# Card Labels
POST   /api/cards/:id/labels       # Add label to card
DELETE /api/cards/:id/labels/:labelId  # Remove label

# Card Comments
GET    /api/cards/:id/comments     # Get all comments
POST   /api/cards/:id/comments     # Add comment
PUT    /api/comments/:id           # Update comment
DELETE /api/comments/:id           # Delete comment
```

## 📊 Database Schema (PostgreSQL/MongoDB)

### Users Table

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    avatar VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Boards Table

```sql
CREATE TABLE boards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    background VARCHAR(255),
    visibility VARCHAR(20) DEFAULT 'private',
    owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
    is_starred BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Board Members Table

```sql
CREATE TABLE board_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    board_id UUID REFERENCES boards(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(20) DEFAULT 'member',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(board_id, user_id)
);
```

### Lists Table

```sql
CREATE TABLE lists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    board_id UUID REFERENCES boards(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    position INTEGER NOT NULL,
    archived BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Cards Table

```sql
CREATE TABLE cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    list_id UUID REFERENCES lists(id) ON DELETE CASCADE,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    position INTEGER NOT NULL,
    priority VARCHAR(20),
    due_date DATE,
    archived BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Labels Table

```sql
CREATE TABLE labels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    board_id UUID REFERENCES boards(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    color VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Card Labels (Junction Table)

```sql
CREATE TABLE card_labels (
    card_id UUID REFERENCES cards(id) ON DELETE CASCADE,
    label_id UUID REFERENCES labels(id) ON DELETE CASCADE,
    PRIMARY KEY (card_id, label_id)
);
```

### Comments Table

```sql
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    card_id UUID REFERENCES cards(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔐 Authentication & Authorization

### JWT Token Structure

```java
// JWT Claims
{
  "sub": "user-uuid",           // Subject (User ID)
  "email": "user@example.com",
  "role": "ROLE_USER",
  "iat": 1234567890,            // Issued at
  "exp": 1234567890             // Expiration
}
```

### Permission Levels

- **Owner**: Full control (only one per board)
- **Admin**: Can manage members, settings
- **Member**: Can create/edit cards and lists
- **Observer**: Read-only access

## 🚀 Key Features to Implement

### Phase 1: Core Features

1. User authentication (register, login, JWT)
2. Board CRUD operations
3. List CRUD with drag & drop
4. Card CRUD with drag & drop
5. Basic card details (title, description, due date)

### Phase 2: Collaboration

1. Board members and invitations
2. Card assignments
3. Comments
4. Labels and filtering
5. Real-time updates (WebSockets/Socket.io)

### Phase 3: Polish & UX

1. Custom backgrounds
2. Board templates
3. Search functionality
4. Keyboard shortcuts
5. Mobile responsive design
6. Dark mode

## 🔄 Real-time Updates (WebSocket Events)

```java
// Server-side WebSocket Configuration (Spring STOMP)
// Clients subscribe to topics like: /topic/board/{boardId}

// Message destinations:
@MessageMapping("/board/{boardId}/card/create")
@SendTo("/topic/board/{boardId}")
public CardDTO createCard(@DestinationVariable String boardId, CardDTO card) {}

@MessageMapping("/board/{boardId}/card/update")
@SendTo("/topic/board/{boardId}")
public CardDTO updateCard(@DestinationVariable String boardId, CardDTO card) {}

// Client-side subscriptions (JavaScript/SockJS):
const socket = new SockJS('/ws');
const stompClient = Stomp.over(socket);

stompClient.subscribe('/topic/board/123', (message) => {
    const event = JSON.parse(message.body);
    // Handle: card_created, card_updated, card_moved, etc.
});
```

## 🧪 Testing Strategy

1. **Unit Tests**: JUnit 5 + Mockito for service layer and utility functions
2. **Integration Tests**: Spring Boot Test (`@SpringBootTest`) with `@WebMvcTest` for controllers
3. **Repository Tests**: `@DataJpaTest` for database layer testing
4. **E2E Tests**: Playwright/Cypress for complete user flows
5. **Performance Tests**: JMeter or Gatling for load testing

## 📦 Tech Stack Recommendations

### Backend

- **Framework**: Spring Boot 3.x + Maven
- **Database**: PostgreSQL with Spring Data JPA / Hibernate
- **Auth**: Spring Security + JWT + BCrypt
- **Real-time**: Spring WebSocket (STOMP) / SockJS
- **Validation**: Hibernate Validator / Jakarta Bean Validation
- **File Upload**: AWS S3 SDK / Cloudinary
- **Email**: Spring Mail / SendGrid
- **API Documentation**: Springdoc OpenAPI (Swagger)
- **Caching**: Spring Cache + Redis

### Frontend

- **Framework**: React + Vite
- **State Management**: Redux Toolkit / Zustand
- **Drag & Drop**: @dnd-kit / react-beautiful-dnd
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios / TanStack Query
- **Real-time**: SockJS-client + STOMP.js

### DevOps

- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Hosting**: Railway/Render (backend) + Vercel/Netlify (frontend)
- **Monitoring**: Spring Boot Actuator + Prometheus + Grafana / Sentry

## 🎯 API Response Format

```java
// Success Response
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation successful",
  "timestamp": "2025-12-03T10:15:30.000Z"
}

// Error Response
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": { /* field errors */ }
  },
  "timestamp": "2025-12-03T10:15:30.000Z",
  "path": "/api/boards"
}
```

## 🔍 Best Practices

1. **Validation**: Use Jakarta Bean Validation (`@Valid`, `@NotNull`, etc.) for request validation
2. **Error Handling**: Centralized exception handling with `@ControllerAdvice` and `GlobalExceptionHandler`
3. **Rate Limiting**: Implement with Spring AOP or API Gateway (e.g., Spring Cloud Gateway)
4. **Pagination**: Use Spring Data's `Pageable` and `Page<T>` for pagination
5. **Caching**: Use Spring Cache abstraction with Redis for frequently accessed data
6. **Logging**: Use SLF4J + Logback for structured logging
7. **Documentation**: Springdoc OpenAPI (Swagger) for API documentation
8. **Security**: Spring Security with CORS configuration, input sanitization, HTTPS enforcement
9. **Database Migrations**: Use Flyway or Liquibase for version-controlled schema changes
10. **DTO Pattern**: Use DTOs to separate API contracts from domain entities

## 🚀 Build & Run Commands

### Backend (Spring Boot)

```bash
# Build the project
./mvnw clean package

# Run the application
./mvnw spring-boot:run

# Run tests
./mvnw test

# Run with specific profile
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev

# Build Docker image
docker build -t taskflow-backend .
```

### Frontend (React + Vite)

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

### Docker Compose

```bash
# Start all services
docker-compose up

# Start in detached mode
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f
```

This architecture provides a solid foundation for building a production-ready Trello clone!
