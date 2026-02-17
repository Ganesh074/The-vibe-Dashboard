const Item = require('../models/Item');

/**
 * Service to handle item-related database logic.
 */
class ItemService {
  async getAllItems(searchTerm = '') {
    const query = searchTerm ? {
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
      ],
    } : {};
    
    return await Item.find(query).sort({ createdAt: -1 });
  }

  async createItem(data) {
    const lastItem = await Item.findOne().sort({ id: -1 });
    const newId = lastItem ? lastItem.id + 1 : 1;
    
    const newItem = new Item({
      id: newId,
      ...data
    });
    
    return await newItem.save();
  }

  async updateItem(id, data) {
    return await Item.findOneAndUpdate(
      { id: parseInt(id) },
      data,
      { new: true }
    );
  }

  async deleteItem(id) {
    return await Item.findOneAndDelete({ id: parseInt(id) });
  }
}

module.exports = new ItemService();
