classDiagram
class User {
+String id
+String email
+String password
+String name
+String avatar
+DateTime createdAt
+DateTime updatedAt
+getBoards()
+updateProfile()
}

    class Board {
        +String id
        +String title
        +String description
        +String background
        +String visibility
        +String ownerId
        +DateTime createdAt
        +DateTime updatedAt
        +addMember()
        +removeMember()
        +updateSettings()
    }

    class BoardMember {
        +String id
        +String boardId
        +String userId
        +String role
        +DateTime joinedAt
        +updateRole()
    }

    class List {
        +String id
        +String boardId
        +String title
        +Integer position
        +DateTime createdAt
        +DateTime updatedAt
        +reorder()
        +archive()
    }

    class Card {
        +String id
        +String listId
        +String title
        +String description
        +Integer position
        +String priority
        +Date dueDate
        +Boolean archived
        +DateTime createdAt
        +DateTime updatedAt
        +move()
        +archive()
        +addLabel()
    }

    class CardMember {
        +String id
        +String cardId
        +String userId
        +DateTime assignedAt
        +assign()
        +unassign()
    }


    class CardLabel {
        +String id
        +String cardId
        +String labelId
        +attach()
        +detach()
    }

    class Comment {
        +String id
        +String cardId
        +String userId
        +String content
        +DateTime createdAt
        +DateTime updatedAt
        +edit()
        +delete()
    }

    User "1" --> "*" Board : owns
    User "1" --> "*" BoardMember : member of
    Board "1" --> "*" BoardMember : has members
    Board "1" --> "*" List : contains
   
    List "1" --> "*" Card : contains
    Card "1" --> "*" CardMember : assigned to
    Card "1" --> "*" CardLabel : has labels
    Card "1" --> "*" Comment : has comments
    User "1" --> "*" CardMember : assigned
    User "1" --> "*" Comment : creates

