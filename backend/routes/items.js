const express = require('express');
const router = express.Router();
const itemService = require('../services/itemService');

// GET /api/items?search=keyword
router.get('/', async (req, res) => {
  const startTime = Date.now();
  const searchTerm = (req.query.search || '').trim();
  console.log(`📡 Backend: Received GET /api/items${searchTerm ? `?search=${searchTerm}` : ''}`);

  try {
    const results = await itemService.getAllItems(searchTerm);
    const duration = Date.now() - startTime;
    console.log(`✅ Backend: Sending ${results.length} items (Took ${duration}ms)`);
    res.json(results);
  } catch (error) {
    console.error('❌ Backend: Error fetching items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/items
router.post('/', async (req, res) => {
  console.log('📡 Backend: Received POST /api/items');
  try {
    const savedItem = await itemService.createItem(req.body);
    console.log(`✅ Backend: Created new item with ID: ${savedItem.id}`);
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('❌ Backend: Error creating item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/items/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`📡 Backend: Received PUT /api/items/${id}`);
  try {
    const updatedItem = await itemService.updateItem(id, req.body);
    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    console.log(`✅ Backend: Updated item ID: ${id}`);
    res.json(updatedItem);
  } catch (error) {
    console.error('❌ Backend: Error updating item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/items/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`📡 Backend: Received DELETE /api/items/${id}`);
  try {
    const deletedItem = await itemService.deleteItem(id);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    console.log(`✅ Backend: Deleted item ID: ${id}`);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('❌ Backend: Error deleting item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
