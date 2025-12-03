# Trello Clone - Classes & Relationships Explained

## 🎯 Core Concept

Think of Trello as a hierarchy: **User** → **Board** → **List** → **Card**. Everything flows from this structure, with additional features enhancing collaboration and organization.

---

## 📦 Class Breakdown

### 1️⃣ **User** (The Person)

```
WHO: The actual person using the application
STORES: Authentication info, profile data
```

**Real-world use case:**

- Sarah creates an account → New User record
- Sarah logs in → User authentication
- Sarah updates her profile picture → User.avatar updated

**Key relationships:**

- **Owns Boards** (1:Many) - Sarah can create multiple boards
- **Member of Boards** (Many:Many via BoardMember) - Sarah can be invited to other people's boards
- **Assigned to Cards** (Many:Many via CardMember) - Sarah can be assigned tasks
- **Writes Comments** (1:Many) - Sarah can comment on cards
- **Uploads Attachments** (1:Many) - Sarah can attach files

---

### 2️⃣ **Board** (The Project/Workspace)

```
WHAT: A project workspace containing all related tasks
EXAMPLE: "Website Redesign", "Sprint 23", "Personal Tasks"
```

**Real-world use case:**

```
Sarah creates "Q4 Marketing Campaign" board
├── Sets background to blue gradient
├── Makes it "team" visibility (only team members can see)
├── Invites Mike and Alex as members
└── Creates lists: "Ideas", "In Progress", "Done"
```

**Key fields:**

- `visibility`:
  - **public** = anyone can view
  - **private** = only invited members
  - **team** = anyone in organization
- `ownerId`: Who created/owns the board
- `archived`: Soft delete (keeps history but hides board)

**Relationships:**

- **Has Members** (1:Many via BoardMember) - Multiple people collaborate
- **Contains Lists** (1:Many) - Organizes work into columns
- **Has Labels** (1:Many) - Color-coded tags for cards
- **Logs Activity** (1:Many) - Tracks all changes

---

### 3️⃣ **BoardMember** (Collaboration Join Table)

```
PURPOSE: Links Users to Boards with roles/permissions
WHY NEEDED: Same user can have different roles on different boards
```

**Real-world use case:**

```
Board: "Q4 Marketing Campaign"
├── Sarah (Owner) - role: "admin" - full control
├── Mike (Designer) - role: "normal" - can edit
└── Alex (Stakeholder) - role: "normal" - can view/comment
```

**Role permissions:**

- **admin**: Can manage members, board settings, delete board
- **normal**: Can create/edit cards, lists, comments

**Why separate table?**

- Sarah is admin on "Marketing Board" but normal member on "Engineering Board"
- Need to store when each person joined (`joinedAt`)
- Can easily remove members without deleting user

---

### 4️⃣ **BoardList** (Columns/Stages)

```
WHAT: Vertical columns representing workflow stages
EXAMPLE: "To Do", "In Progress", "Review", "Done"
```

**Real-world use case:**

```
Marketing Board
├── List 1: "Backlog" (position: 0)
├── List 2: "This Week" (position: 1)
├── List 3: "In Progress" (position: 2)
└── List 4: "Completed" (position: 3)
```

**Key fields:**

- `position`: Order of lists (0, 1, 2...) - enables drag & drop reordering
- `archived`: Hide list without deleting (preserves cards inside)

**Use cases:**

- Sarah drags "Backlog" list to position 1 → all positions updated
- Mike archives "Old Ideas" list → cards preserved but hidden
- Alex creates new list "Urgent" → automatically positioned at end

---

### 5️⃣ **Card** (Individual Tasks)

```
WHAT: The actual work items/tasks
EXAMPLE: "Design homepage mockup", "Write blog post", "Fix login bug"
```

**Real-world use case:**

```
Card: "Design homepage mockup"
├── In list: "In Progress"
├── Description: "Create mobile and desktop versions with new branding"
├── Priority: "high"
├── Due date: Dec 15, 2024
├── Cover image: mockup-preview.jpg
├── Position: 2 (third card in the list)
├── Assigned to: Mike, Sarah
├── Labels: "Design", "Urgent"
├── Has 3 comments
├── Has 2 attachments (design-specs.pdf, colors.png)
└── Has 1 checklist with 5 items
```

**Key fields:**

- `position`: Order within list (enables drag & drop)
- `coverImage`: Visual preview shown on card front
- `archived`: Soft delete (can be restored)
- `priority`: low/medium/high (for filtering/sorting)

**Complex use cases:**

**Moving cards between lists:**

```javascript
// User drags card from "To Do" to "In Progress"
Card.update({
  listId: "in-progress-list-id",
  position: 0, // Move to top of new list
});
// Activity log: "Sarah moved 'Design homepage' from To Do to In Progress"
```

**Reordering cards:**

```javascript
// User drags card from position 5 to position 2
// All cards between positions 2-4 shift down
Card.update({ position: 2 });
```

---

### 6️⃣ **CardMember** (Task Assignments)

```
PURPOSE: Link Users to Cards (who's working on what)
MANY-TO-MANY: One card can have multiple assignees, one user can have multiple cards
```

**Real-world use case:**

```
Card: "Build authentication system"
├── Assigned to: Mike (backend developer)
├── Assigned to: Sarah (frontend developer)
└── assignedAt: Dec 1, 2024
```

**Why separate table?**

- Track exactly when someone was assigned
- Can assign/unassign without deleting user or card
- Query "all cards assigned to Mike" efficiently

**Use case flow:**

1. Card created → no assignees yet
2. Sarah assigns Mike → creates CardMember record
3. Mike assigns himself → creates another CardMember record
4. Task done, Sarah unassigns Mike → deletes CardMember record

---

### 7️⃣ **Label** (Color-coded Tags)

```
WHAT: Board-wide tags for categorizing cards
EXAMPLE: "Bug", "Feature", "Urgent", "Backend", "Frontend"
```

**Real-world use case:**

```
Marketing Board Labels:
├── "Content" (green)
├── "Design" (blue)
├── "Urgent" (red)
├── "Social Media" (purple)
└── "Analytics" (yellow)
```

**Why board-scoped?**

- Each board has its own set of labels
- Same label name can have different colors on different boards
- "Bug" label makes sense for dev board, not marketing board

---

### 8️⃣ **CardLabel** (Applying Tags)

```
PURPOSE: Links Labels to Cards (many-to-many)
WHY: One card can have multiple labels, one label used on multiple cards
```

**Real-world use case:**

```
Card: "Write blog post about new features"
├── Label: "Content" (green)
├── Label: "Urgent" (red)
└── Label: "Social Media" (purple)
```

**Filtering use case:**

```
User clicks "Urgent" label
→ Query: SELECT cards WHERE card_id IN (
    SELECT card_id FROM card_labels WHERE label_id = 'urgent'
  )
→ Shows all urgent cards across all lists
```

---

### 9️⃣ **Comment** (Discussions)

```
WHAT: Conversation threads on cards
PURPOSE: Team communication, updates, questions
```

**Real-world use case:**

```
Card: "Design homepage mockup"
├── Comment by Sarah (Dec 1): "Here's the initial mockup, thoughts?"
├── Comment by Alex (Dec 2): "Love it! Can we make the CTA button bigger?"
├── Comment by Sarah (Dec 2): "Done! Updated mockup attached."
└── Comment by Mike (Dec 3): "Approved, moving to development"
```

**Key features:**

- `updatedAt`: Track if comment was edited
- Direct link to user who commented
- Chronological discussion thread

**Use cases:**

- Team discussions without external chat
- Document decisions and feedback
- Notify assigned members of updates

---

## Relationship Patterns Explained

### **One-to-Many (1:M)**

```
Board ──(has)──> List
│
└─ One board can have many lists
   But each list belongs to only one board
```

**Real example:**

```
"Marketing Board" has:
├── List: "Backlog"
├── List: "In Progress"
└── List: "Done"

"Engineering Board" has:
├── List: "Sprint Backlog"
└── List: "Sprint Done"
```

---

### **Many-to-Many (M:N) via Junction Table**

```
User <──(BoardMember)──> Board
│                           │
Many users can be        One user can be
on many boards          member of many boards
```

**Real example:**

```
Sarah:
├── Member of "Marketing Board" (admin)
├── Member of "Engineering Board" (normal)
└── Member of "Personal Board" (owner)

Marketing Board:
├── Sarah (admin)
├── Mike (normal)
└── Alex (normal)
```

**Why junction table needed?**

- Store role per board (Sarah = admin here, normal there)
- Store join date per membership
- Easy to query "all boards for Sarah" or "all members for Marketing Board"

---

### **Many-to-Many Examples:**

**Cards ↔ Labels (via CardLabel)**

```
Card "Write blog post":
├── Label: "Content" (green)
├── Label: "Urgent" (red)

Label "Urgent":
├── Used on: "Write blog post"
├── Used on: "Fix critical bug"
├── Used on: "Review contract"
```

**Cards ↔ Users (via CardMember)**

```
Card "Build API":
├── Assigned to: Mike
├── Assigned to: Sarah

Sarah:
├── Assigned to: "Build API"
├── Assigned to: "Write docs"
├── Assigned to: "Fix bug"
```

---

## 🧩 Why This Structure Works

### **Scalability**

- Adding new boards doesn't affect others (isolated data)
- Position fields enable easy reordering without renumbering

### **Flexibility**

- Same user different roles on different boards
- Cards can have multiple assignees and labels
- Junction tables allow complex many-to-many relationships

### **Performance**

- Junction tables enable efficient many-to-many queries
- Indexes on foreign keys (boardId, listId, etc.)

### **User Experience**

- Drag & drop driven by position fields
- Rich filtering via labels and assignments
- Team collaboration through board membership

This simplified architecture provides the core Trello functionality while maintaining clean, normalized structure! 🚀
