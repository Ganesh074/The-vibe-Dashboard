'use client'

import { useState, useEffect } from 'react'
import { type Item, type CreateItemInput } from '@/lib/api'

interface ItemModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (item: CreateItemInput) => Promise<void>
  initialData?: Item | null
  title: string
}

export default function ItemModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  title,
}: ItemModalProps) {
  const [formData, setFormData] = useState<CreateItemInput>({
    name: '',
    description: '',
    category: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        category: initialData.category,
      })
    } else {
      setFormData({ name: '', description: '', category: '' })
    }
  }, [initialData, isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await onSave(formData)
      onClose()
    } catch (error) {
      console.error('Failed to save item:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="glass-hover w-full max-w-md p-8 bg-slate-900 border border-white/10 shadow-2xl animate-fade-in">
        <h2 className="text-2xl font-bold text-slate-100 mb-6">{title}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">
              Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-slate-100 outline-none focus:border-cyan-400/50 transition-colors"
              placeholder="Enter item name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">
              Category
            </label>
            <input
              type="text"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-slate-100 outline-none focus:border-cyan-400/50 transition-colors"
              placeholder="e.g. Lighting, Audio"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">
              Description
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-slate-100 outline-none focus:border-cyan-400/50 transition-colors min-h-[100px] resize-none"
              placeholder="Enter item description"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg border border-white/10 text-slate-300 hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
