import { useState } from "react"

export const Card = ({ id, title, description, priority = "medium", dueDate, assignee }) => {
  const [isHovered, setIsHovered] = useState(false)

  const priorityColors = {
    low: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
    high: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group relative mb-3 cursor-grab rounded-lg border border-border 
        bg-card p-4 shadow-sm transition-all duration-200
        ${isHovered ? "shadow-md" : ""}
        hover:border-primary/30 active:cursor-grabbing
      `}
      draggable="true"
      data-card-id={id}
    >
      {/* Title */}
      <h3 className="mb-2 line-clamp-2 font-medium text-card-foreground">{title}</h3>

      {/* Description Preview */}
      <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{description}</p>

      {/* Metadata */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Priority Badge */}
        <span
          className={`
            inline-flex items-center rounded-full px-2 py-1 
            text-xs font-semibold transition-opacity
            ${priorityColors[priority]}
            ${isHovered ? "opacity-100" : "opacity-75"}
          `}
        >
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </span>

        {/* Due Date */}
        {dueDate && <span className="text-xs text-muted-foreground">{dueDate}</span>}

        {/* Assignee Placeholder */}
        {assignee && (
          <div className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {assignee.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Drag Handle Indicator */}
      <div
        className={`
        absolute right-3 top-3 transition-opacity duration-200
        ${isHovered ? "opacity-100" : "opacity-0"}
      `}
      >
        <div className="flex flex-col gap-1">
          <div className="h-1 w-4 rounded-full bg-muted-foreground" />
          <div className="h-1 w-4 rounded-full bg-muted-foreground" />
          <div className="h-1 w-4 rounded-full bg-muted-foreground" />
        </div>
      </div>
    </div>
  )
}
