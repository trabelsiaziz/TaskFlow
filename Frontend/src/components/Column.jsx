import { useState } from "react"
import { Card } from "./Card"
import { Plus } from "lucide-react"


export const Column = ({ id, title, cards, color = "gray" }) => {
  const [isAddingCard, setIsAddingCard] = useState(false)
  const [cardCount, setCardCount] = useState(cards.length)

  const colorStyles = {
    blue: "bg-blue-500 shadow-blue-500/50",
    purple: "bg-purple-500 shadow-purple-500/50",
    green: "bg-green-500 shadow-green-500/50",
    red: "bg-red-500 shadow-red-500/50",
    gray: "bg-gray-500 shadow-gray-500/50",
  }

  return (
    <div className="flex w-80 flex-shrink-0 flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Column Header */}
      <div className="flex items-center justify-between rounded-xl bg-card/50 backdrop-blur-sm p-4 border border-border/50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className={`h-3 w-3 rounded-full shadow-lg ${colorStyles[color]}`} />
          <h2 className="font-bold text-foreground text-lg">{title}</h2>
          <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-muted/80 px-2.5 text-xs font-bold text-muted-foreground shadow-sm">
            {cardCount}
          </span>
        </div>
      </div>

      {/* Cards Container */}
      <div className="flex-1 space-y-2 rounded-xl bg-muted/20 backdrop-blur-sm p-4 min-h-96 border border-border/30 shadow-inner">
        {cards.map((card, index) => (
          <div
            key={card.id}
            style={{ animationDelay: `${index * 50}ms` }}
            className="animate-in fade-in slide-in-from-left-4 duration-300"
          >
            <Card {...card} />
          </div>
        ))}

        {/* Empty State */}
        {cards.length === 0 && (
          <div className="flex h-32 items-center justify-center rounded-xl border-2 border-dashed border-border/50 bg-muted/10 backdrop-blur-sm">
            <p className="text-sm text-muted-foreground font-medium">No cards yet</p>
          </div>
        )}
      </div>

      {/* Add Card Button */}
      <button
        onClick={() => setIsAddingCard(!isAddingCard)}
        className={`
          flex items-center justify-center gap-2 rounded-xl 
          border-2 border-dashed border-border/50 px-4 py-3
          font-semibold text-muted-foreground transition-all duration-300
          hover:border-primary/50 hover:bg-primary/5 hover:text-foreground
          hover:shadow-md hover:scale-105 active:scale-100
          ${isAddingCard ? "border-primary/50 bg-primary/5" : ""}
        `}
      >
        <Plus className={`h-4 w-4 transition-transform duration-300 ${isAddingCard ? "rotate-45" : ""}`} />
        Add card
      </button>

      {/* Add Card Input */}
      {isAddingCard && (
        <div className="space-y-3 rounded-xl bg-card border border-border/50 p-4 shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-300">
          <input
            type="text"
            placeholder="Enter card title..."
            className={`
              w-full rounded-lg border border-border/50 bg-background 
              px-4 py-2.5 text-sm placeholder-muted-foreground 
              outline-none transition-all duration-200
              focus:border-primary focus:ring-2 focus:ring-primary/20 focus:shadow-md
            `}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Escape") setIsAddingCard(false)
            }}
          />
          <div className="flex gap-2">
            <button
              onClick={() => setIsAddingCard(false)}
              className={`
                flex-1 rounded-lg border border-border/50 bg-muted
                px-4 py-2 text-sm font-semibold text-muted-foreground
                transition-all duration-200 hover:bg-muted/80 hover:shadow-sm
              `}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setCardCount(cardCount + 1)
                setIsAddingCard(false)
              }}
              className={`
                flex-1 rounded-lg bg-gradient-to-r from-primary to-primary/90
                px-4 py-2 text-sm font-semibold text-primary-foreground
                transition-all duration-200 hover:shadow-lg hover:scale-105
                active:scale-100
              `}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  )
}


// export const Column = ({ id, title, cards, color = "gray" }) => {
//   const [isAddingCard, setIsAddingCard] = useState(false)
//   const [cardCount, setCardCount] = useState(cards.length)

//   const colorDots = {
//     blue: "bg-blue-500",
//     purple: "bg-purple-500",
//     green: "bg-green-500",
//     red: "bg-red-500",
//     gray: "bg-gray-500",
//   }

//   return (
//     <div className="flex w-80 flex-shrink-0 flex-col gap-3">
//       {/* Column Header */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <div className={`h-3 w-3 rounded-full ${colorDots[color]}`} />
//           <h2 className="font-semibold text-foreground">{title}</h2>
//           <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-muted px-2 text-xs font-medium text-muted-foreground">
//             {cardCount}
//           </span>
//         </div>
//       </div>

//       {/* Cards Container */}
//       <div className="flex-1 space-y-2 rounded-lg bg-muted/30 p-3 min-h-96">
//         {cards.map((card) => (
//           <Card key={card.id} {...card} />
//         ))}

//         {/* Empty State */}
//         {cards.length === 0 && (
//           <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-border">
//             <p className="text-sm text-muted-foreground">No cards yet</p>
//           </div>
//         )}
//       </div>

//       {/* Add Card Button */}
//       <button
//         onClick={() => setIsAddingCard(!isAddingCard)}
//         className={`
//           flex items-center justify-center gap-2 rounded-lg 
//           border-2 border-dashed border-border px-3 py-2
//           font-medium text-muted-foreground transition-all duration-200
//           hover:border-primary/50 hover:bg-muted/50 hover:text-foreground
//         `}
//       >
//         <Plus className="h-4 w-4" />
//         Add card
//       </button>

//       {/* Add Card Input */}
//       {isAddingCard && (
//         <div className="space-y-2 rounded-lg bg-muted/50 p-3">
//           <input
//             type="text"
//             placeholder="Enter card title..."
//             className={`
//               w-full rounded-md border border-border bg-background 
//               px-3 py-2 text-sm placeholder-muted-foreground 
//               outline-none transition-colors
//               focus:border-primary focus:ring-1 focus:ring-primary
//             `}
//             autoFocus
//             onKeyDown={(e) => {
//               if (e.key === "Escape") setIsAddingCard(false)
//             }}
//           />
//           <div className="flex gap-2">
//             <button
//               onClick={() => setIsAddingCard(false)}
//               className={`
//                 flex-1 rounded-md border border-border bg-muted
//                 px-3 py-1 text-sm font-medium text-muted-foreground
//                 transition-colors hover:bg-muted/80
//               `}
//             >
//               Cancel
//             </button>
//             <button
//               onClick={() => {
//                 setCardCount(cardCount + 1)
//                 setIsAddingCard(false)
//               }}
//               className={`
//                 flex-1 rounded-md bg-primary px-3 py-1 
//                 text-sm font-medium text-primary-foreground
//                 transition-colors hover:bg-primary/90
//               `}
//             >
//               Add
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }
