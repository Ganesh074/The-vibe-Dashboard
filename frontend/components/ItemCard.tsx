'use client'

import type { Item } from '@/lib/api'

interface ItemCardProps {
  item: Item
  onEdit: (item: Item) => void
  onDelete: (id: number) => void
}

export default function ItemCard({ item, onEdit, onDelete }: ItemCardProps) {
  return (
    <div className="glass-hover p-6 group animate-fade-in relative flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="text-sm font-medium text-cyan-300 mb-2">
            {item.category}
          </div>
          <h3 className="text-lg font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
            {item.name}
          </h3>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={() => onEdit(item)}
            className="p-1.5 hover:bg-cyan-500/20 rounded border border-cyan-500/30 text-cyan-300 transition-colors"
            title="Edit Item"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="p-1.5 hover:bg-red-500/20 rounded border border-red-500/30 text-red-400 transition-colors"
            title="Delete Item"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <p className="text-sm text-slate-300 mb-4 leading-relaxed line-clamp-3">
        {item.description}
      </p>

      <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
        <span className="text-xs text-slate-400">
          {new Date(item.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
        <span className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-slate-300">
          ID: {item.id}
        </span>
      </div>
    </div>
  )
}
