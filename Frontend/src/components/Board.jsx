"use client"

import { useState } from "react"
import { Column } from "./Column"

export const Board = ({ initialData }) => {
  const [data] = useState(initialData)

  return (
    <div className="h-full min-h-screen w-full overflow-hidden bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4 shadow-sm">
        <div className="mx-auto max-w-full">
          <h1 className="text-2xl font-bold text-foreground">Project Board</h1>
          <p className="mt-1 text-sm text-muted-foreground">Organize your tasks and collaborate with your team</p>
        </div>
      </div>

      {/* Board Columns - Horizontal Scroll */}
      <div className="h-[calc(100vh-120px)] overflow-x-auto overflow-y-hidden">
        <div className="inline-flex gap-6 p-6">
          {data.columns.map((column) => (
            <Column key={column.id} id={column.id} title={column.title} cards={column.cards} color={column.color} />
          ))}

          {/* Add Column Button */}
          <div className="flex w-80 flex-shrink-0 items-start pt-3">
            <button
              className={`
                w-full rounded-lg border-2 border-dashed border-border
                px-4 py-3 font-medium text-muted-foreground
                transition-all duration-200
                hover:border-primary/50 hover:bg-muted/50 hover:text-foreground
              `}
            >
              + Add Column
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
