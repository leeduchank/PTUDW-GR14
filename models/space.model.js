import db from '../ultis/db.js';

export default {
  async findAll() {
    try {
      const spaces = await db('space');
      return spaces;
    } catch (error) {
      // Handle the error appropriately (e.g., log it or throw a custom error)
      console.error('Error in findAll:', error);
      throw error;
    }
  },
};