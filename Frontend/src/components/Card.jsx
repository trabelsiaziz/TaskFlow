import { useState } from "react"
import { GripVertical, Calendar, User } from "lucide-react"


export const Card = ({ id, title, description, priority = "medium", dueDate, assignee }) => {
  const [isHovered, setIsHovered] = useState(false)

  const priorityColors = {
    low: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
    high: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 border-red-200 dark:border-red-800",
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group relative mb-3 cursor-grab rounded-xl border border-border/50
        bg-card p-4 backdrop-blur-sm transition-all duration-300
        ${isHovered ? "shadow-lg shadow-primary/5 scale-[1.02] -translate-y-1 border-primary/20" : "shadow-sm"}
        hover:border-primary/30 active:cursor-grabbing active:scale-100
      `}
      draggable="true"
      data-card-id={id}
    >
      {/* Drag Handle Indicator */}
      <div
        className={`
        absolute -left-2 top-1/2 -translate-y-1/2 transition-all duration-300
        ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}
      `}
      >
        <GripVertical className="h-5 w-5 text-muted-foreground/50" />
      </div>

      {/* Priority Badge - Floating */}
      <div className="absolute -right-2 -top-2">
        <span
          className={`
            inline-flex items-center rounded-full px-2.5 py-1 
            text-xs font-semibold shadow-md border transition-all duration-300
            ${priorityColors[priority]}
            ${isHovered ? "scale-110" : "scale-100"}
          `}
        >
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </span>
      </div>

      {/* Title */}
      <h3 className="mb-2 line-clamp-2 font-semibold text-card-foreground pr-12 leading-snug">
        {title}
      </h3>

      {/* Description Preview */}
      <p className="mb-4 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>

      {/* Metadata */}
      <div className="flex flex-wrap items-center gap-3 text-xs">
        {/* Due Date */}
        {dueDate && (
          <div className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
            <Calendar className="h-3.5 w-3.5" />
            <span className="font-medium">{dueDate}</span>
          </div>
        )}

        {/* Assignee Avatar */}
        {assignee && (
          <div className="ml-auto flex items-center gap-1.5 group/assignee">
            <User className="h-3.5 w-3.5 text-muted-foreground group-hover/assignee:text-foreground transition-colors" />
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10 text-xs font-bold text-primary ring-2 ring-background shadow-sm transition-transform group-hover/assignee:scale-110">
              {assignee.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
      </div>

      {/* Hover Glow Effect */}
      <div className={`
        absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent 
        opacity-0 transition-opacity duration-300 pointer-events-none
        ${isHovered ? "opacity-100" : ""}
      `} />
    </div>
  )
}

// export const Card = ({ id, title, description, priority = "medium", dueDate, assignee }) => {
//   const [isHovered, setIsHovered] = useState(false)

//   const priorityColors = {
//     low: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
//     medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
//     high: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
//   }

//   return (
//     <div
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       className={`
//         group relative mb-3 cursor-grab rounded-lg border border-border 
//         bg-card p-4 shadow-sm transition-all duration-200
//         ${isHovered ? "shadow-md" : ""}
//         hover:border-primary/30 active:cursor-grabbing
//       `}
//       draggable="true"
//       data-card-id={id}
//     >
//       {/* Title */}
//       <h3 className="mb-2 line-clamp-2 font-medium text-card-foreground">{title}</h3>

//       {/* Description Preview */}
//       <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{description}</p>

//       {/* Metadata */}
//       <div className="flex flex-wrap items-center gap-2">
//         {/* Priority Badge */}
//         <span
//           className={`
//             inline-flex items-center rounded-full px-2 py-1 
//             text-xs font-semibold transition-opacity
//             ${priorityColors[priority]}
//             ${isHovered ? "opacity-100" : "opacity-75"}
//           `}
//         >
//           {priority.charAt(0).toUpperCase() + priority.slice(1)}
//         </span>

//         {/* Due Date */}
//         {dueDate && <span className="text-xs text-muted-foreground">{dueDate}</span>}

//         {/* Assignee Placeholder */}
//         {assignee && (
//           <div className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
//             {assignee.charAt(0).toUpperCase()}
//           </div>
//         )}
//       </div>

//       {/* Drag Handle Indicator */}
//       <div
//         className={`
//         absolute right-3 top-3 transition-opacity duration-200
//         ${isHovered ? "opacity-100" : "opacity-0"}
//       `}
//       >
//         <div className="flex flex-col gap-1">
//           <div className="h-1 w-4 rounded-full bg-muted-foreground" />
//           <div className="h-1 w-4 rounded-full bg-muted-foreground" />
//           <div className="h-1 w-4 rounded-full bg-muted-foreground" />
//         </div>
//       </div>
//     </div>
//   )
// }
