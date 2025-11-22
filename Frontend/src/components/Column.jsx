"use client"

import { useState } from "react"
import { Card } from "./Card"
import { Plus } from "lucide-react"

export const Column = ({ id, title, cards, color = "gray" }) => {
  const [isAddingCard, setIsAddingCard] = useState(false)
  const [cardCount, setCardCount] = useState(cards.length)

  const colorDots = {
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    green: "bg-green-500",
    red: "bg-red-500",
    gray: "bg-gray-500",
  }

  return (
    <div className="flex w-80 flex-shrink-0 flex-col gap-3">
      {/* Column Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full ${colorDots[color]}`} />
          <h2 className="font-semibold text-foreground">{title}</h2>
          <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-muted px-2 text-xs font-medium text-muted-foreground">
            {cardCount}
          </span>
        </div>
      </div>

      {/* Cards Container */}
      <div className="flex-1 space-y-2 rounded-lg bg-muted/30 p-3 min-h-96">
        {cards.map((card) => (
          <Card key={card.id} {...card} />
        ))}

        {/* Empty State */}
        {cards.length === 0 && (
          <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-border">
            <p className="text-sm text-muted-foreground">No cards yet</p>
          </div>
        )}
      </div>

      {/* Add Card Button */}
      <button
        onClick={() => setIsAddingCard(!isAddingCard)}
        className={`
          flex items-center justify-center gap-2 rounded-lg 
          border-2 border-dashed border-border px-3 py-2
          font-medium text-muted-foreground transition-all duration-200
          hover:border-primary/50 hover:bg-muted/50 hover:text-foreground
        `}
      >
        <Plus className="h-4 w-4" />
        Add card
      </button>

      {/* Add Card Input */}
      {isAddingCard && (
        <div className="space-y-2 rounded-lg bg-muted/50 p-3">
          <input
            type="text"
            placeholder="Enter card title..."
            className={`
              w-full rounded-md border border-border bg-background 
              px-3 py-2 text-sm placeholder-muted-foreground 
              outline-none transition-colors
              focus:border-primary focus:ring-1 focus:ring-primary
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
                flex-1 rounded-md border border-border bg-muted
                px-3 py-1 text-sm font-medium text-muted-foreground
                transition-colors hover:bg-muted/80
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
                flex-1 rounded-md bg-primary px-3 py-1 
                text-sm font-medium text-primary-foreground
                transition-colors hover:bg-primary/90
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
