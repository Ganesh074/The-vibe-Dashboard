const API_BASE_URL = 'http://localhost:5000'

export interface Item {
  id: number
  name: string
  description: string
  category: string
  createdAt: string
}

export type CreateItemInput = Omit<Item, 'id' | 'createdAt'>

export async function fetchItems(search?: string): Promise<Item[]> {
  const url = new URL(`${API_BASE_URL}/api/items`)
  if (search) {
    url.searchParams.append('search', search)
  }

  console.log(`🔍 Frontend: Fetching items from ${url.toString()}...`)

  try {
    const response = await fetch(url.toString(), {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      console.error('❌ Frontend: API call failed with status:', response.status)
      throw new Error('Failed to fetch items')
    }
    
    const data = await response.json()
    console.log('✅ Frontend: Successfully fetched data:', data.length, 'items found')
    return data
  } catch (error) {
    console.error('❌ Frontend: API call error:', error)
    throw error
  }
}

export async function createItem(item: CreateItemInput): Promise<Item> {
  console.log('🔍 Frontend: Creating item...', item.name)
  const response = await fetch(`${API_BASE_URL}/api/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  })
  if (!response.ok) throw new Error('Failed to create item')
  const data = await response.json()
  console.log('✅ Frontend: Item created:', data.id)
  return data
}

export async function updateItem(id: number, item: CreateItemInput): Promise<Item> {
  console.log('🔍 Frontend: Updating item...', id)
  const response = await fetch(`${API_BASE_URL}/api/items/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  })
  if (!response.ok) throw new Error('Failed to update item')
  const data = await response.json()
  console.log('✅ Frontend: Item updated:', id)
  return data
}

export async function deleteItem(id: number): Promise<void> {
  console.log('🔍 Frontend: Deleting item...', id)
  const response = await fetch(`${API_BASE_URL}/api/items/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) throw new Error('Failed to delete item')
  console.log('✅ Frontend: Item deleted:', id)
}
