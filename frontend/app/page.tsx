'use client'

import { useState, useEffect, useCallback } from 'react'
import SearchBar from '@/components/SearchBar'
import ItemCard from '@/components/ItemCard'
import ItemModal from '@/components/ItemModal'
import { 
  fetchItems, 
  createItem, 
  updateItem, 
  deleteItem, 
  type Item, 
  type CreateItemInput 
} from '@/lib/api'

export default function Home() {
  const [items, setItems] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Item | null>(null)

  const loadItems = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await fetchItems(searchQuery)
      setItems(data)
    } catch (err) {
      setError('Connection failed. Please ensure the backend server is running.')
      setItems([])
    } finally {
      setIsLoading(false)
    }
  }, [searchQuery])

  useEffect(() => {
    const timer = setTimeout(loadItems, 300)
    return () => clearTimeout(timer)
  }, [loadItems])

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  const handleCreateOrUpdate = async (formData: CreateItemInput) => {
    try {
      if (editingItem) {
        await updateItem(editingItem.id, formData)
      } else {
        await createItem(formData)
      }
      await loadItems()
    } catch (err) {
      alert('Failed to save item. Check console for details.')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return
    try {
      await deleteItem(id)
      await loadItems()
    } catch (err) {
      alert('Failed to delete item.')
    }
  }

  const openAddModal = () => {
    setEditingItem(null)
    setIsModalOpen(true)
  }

  const openEditModal = (item: Item) => {
    setEditingItem(item)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-slate-950/50 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <svg className="w-6 h-6 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              THE VIBE DASH BOARD
            </span>
          </div>
          <button
            onClick={openAddModal}
            className="btn-primary px-6 py-2.5 flex items-center gap-2 text-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Item
          </button>
        </div>
      </nav>

      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent mb-4">
             The Vibe Dashboard
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Manage your collection with a sleek glassmorphism interface.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>

          {/* Error State */}
          {error && (
            <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-center">
              <p>{error}</p>
            </div>
          )}

          {/* Items Grid */}
          {isLoading && items.length === 0 && !error ? (
            <div className="flex justify-center py-12">
              <div className="w-12 h-12 border-4 border-slate-600 border-t-cyan-400 rounded-full animate-spin-slow"></div>
            </div>
          ) : !isLoading && items.length === 0 && !error ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-slate-300 mb-2">
                {searchQuery ? 'No items found' : 'Dashboard is empty'}
              </h3>
              <p className="text-slate-400">
                {searchQuery ? 'Try another search term' : 'Click "New Item" to get started'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <ItemCard 
                  key={item.id} 
                  item={item} 
                  onEdit={openEditModal}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <ItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateOrUpdate}
        initialData={editingItem}
        title={editingItem ? 'Edit Item' : 'New Item'}
      />
    </div>
  )
}
