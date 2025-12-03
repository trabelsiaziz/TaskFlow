import { useState } from "react"
import { Column } from "./Column"
import { Plus } from "lucide-react"


export const Board = () => {
  const [data] = useState(initialData)

  return (
    <div className="h-full min-h-screen w-full overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/80 backdrop-blur-xl px-6 py-5 shadow-sm sticky top-0 z-10">
        <div className="mx-auto max-w-full">
          <h1 className="text-3xl font-bold text-foreground bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Project Board
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground font-medium">
            Organize your tasks and collaborate with your team
          </p>
        </div>
      </div>

      {/* Board Columns - Horizontal Scroll */}
      <div className="h-[calc(100vh-120px)] overflow-x-auto overflow-y-hidden">
        <div className="inline-flex gap-6 p-6 min-h-full">
          {data.columns.map((column, index) => (
            <div
              key={column.id}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Column
                id={column.id}
                title={column.title}
                cards={column.cards}
                color={column.color}
              />
            </div>
          ))}

          {/* Add Column Button */}
          <div className="flex w-80 flex-shrink-0 items-start pt-3 animate-in fade-in slide-in-from-right-4 duration-500">
            <button
              className={`
                w-full rounded-xl border-2 border-dashed border-border/50
                px-6 py-8 font-bold text-muted-foreground
                transition-all duration-300
                hover:border-primary/50 hover:bg-primary/5 hover:text-foreground
                hover:shadow-lg hover:scale-105 active:scale-100
                flex items-center justify-center gap-2
              `}
            >
              <Plus className="h-5 w-5" />
              Add Column
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


// export const Board = ({ initialData }) => {
//   const [data] = useState(initialData)

//   return (
//     <div className="h-full min-h-screen w-full overflow-hidden bg-background">
//       {/* Header */}
//       <div className="border-b border-border bg-card px-6 py-4 shadow-sm">
//         <div className="mx-auto max-w-full">
//           <h1 className="text-2xl font-bold text-foreground">Project Board</h1>
//           <p className="mt-1 text-sm text-muted-foreground">Organize your tasks and collaborate with your team</p>
//         </div>
//       </div>

//       {/* Board Columns - Horizontal Scroll */}
//       <div className="h-[calc(100vh-120px)] overflow-x-auto overflow-y-hidden">
//         <div className="inline-flex gap-6 p-6">
//           {data.columns.map((column) => (
//             <Column key={column.id} id={column.id} title={column.title} cards={column.cards} color={column.color} />
//           ))}

//           {/* Add Column Button */}
//           <div className="flex w-80 flex-shrink-0 items-start pt-3">
//             <button
//               className={`
//                 w-full rounded-lg border-2 border-dashed border-border
//                 px-4 py-3 font-medium text-muted-foreground
//                 transition-all duration-200
//                 hover:border-primary/50 hover:bg-muted/50 hover:text-foreground
//               `}
//             >
//               + Add Column
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

