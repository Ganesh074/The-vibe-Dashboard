const express = require('express');
const router = express.Router();
const itemService = require('../services/itemService');

// Get all items
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    const items = await itemService.getAllItems(search);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new item
router.post('/', async (req, res) => {
  try {
    const newItem = await itemService.createItem(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update item
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await itemService.updateItem(req.params.id, req.body);
    if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete item
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await itemService.deleteItem(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
