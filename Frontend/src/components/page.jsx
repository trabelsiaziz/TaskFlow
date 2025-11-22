import { Board } from "./Board";

// Sample board data
const boardData = {
  columns: [
    {
      id: "todo",
      title: "To Do",
      color: "blue",
      cards: [
        {
          id: "1",
          title: "Design homepage wireframes",
          description:
            "Create low-fidelity wireframes for the new homepage design.",
          priority: "high",
          dueDate: "Nov 25",
          assignee: "A",
        },
        {
          id: "2",
          title: "Research user feedback",
          description:
            "Compile and analyze feedback from user testing sessions.",
          priority: "medium",
          dueDate: "Nov 28",
          assignee: "S",
        },
        {
          id: "3",
          title: "Set up development environment",
          description:
            "Configure and test the development setup for all team members.",
          priority: "high",
          dueDate: "Nov 24",
        },
        {
          id: "4",
          title: "Create database schema",
          description: "Design the database schema for user data and content.",
          priority: "medium",
          dueDate: "Nov 27",
          assignee: "J",
        },
      ],
    },
    {
      id: "in-progress",
      title: "In Progress",
      color: "purple",
      cards: [
        {
          id: "5",
          title: "Implement authentication",
          description:
            "Build login and registration functionality with JWT tokens.",
          priority: "high",
          dueDate: "Nov 26",
          assignee: "M",
        },
        {
          id: "6",
          title: "Build API endpoints",
          description: "Create RESTful API endpoints for core features.",
          priority: "medium",
          dueDate: "Nov 29",
          assignee: "D",
        },
        {
          id: "7",
          title: "Design component library",
          description: "Create reusable React components for consistent UI.",
          priority: "medium",
          dueDate: "Nov 30",
          assignee: "S",
        },
      ],
    },
    {
      id: "in-review",
      title: "In Review",
      color: "green",
      cards: [
        {
          id: "8",
          title: "Code review: User module",
          description: "Review pull request for user management module.",
          priority: "medium",
          dueDate: "Nov 24",
          assignee: "A",
        },
        {
          id: "9",
          title: "Performance optimization",
          description: "Optimize database queries and API response times.",
          priority: "low",
          dueDate: "Dec 1",
        },
      ],
    },
    {
      id: "done",
      title: "Done",
      color: "red",
      cards: [
        {
          id: "10",
          title: "Project kickoff meeting",
          description: "Initial meeting with stakeholders and team members.",
          priority: "high",
          dueDate: "Nov 20",
          assignee: "A",
        },
        {
          id: "11",
          title: "Set up repository",
          description:
            "Initialize Git repository and configure CI/CD pipeline.",
          priority: "high",
          dueDate: "Nov 21",
          assignee: "D",
        },
        {
          id: "12",
          title: "Brand guidelines review",
          description: "Review and approve brand guidelines for the project.",
          priority: "medium",
          dueDate: "Nov 22",
          assignee: "M",
        },
      ],
    },
  ],
};

export default function Home() {
  return <Board initialData={boardData} />;
}
