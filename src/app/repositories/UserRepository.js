const db = require('../../config/database');

class UserRepository {
  async getAllUsers() {
    try {
      return await db.any('SELECT * FROM users');
    } catch (error) {
      throw new Error('Failed to retrieve users from the database.');
    }
  }

  async createUser(username, email) {
    try {
      const query = 'INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *';
      const values = [username, email];
      return await db.one(query, values);
    } catch (error) {
      throw new Error('Failed to create user in the database.');
    }
  }

  async deleteUser(id) {
    try {
      await db.none('DELETE FROM users WHERE id = $1', id);
    } catch (error) {
      throw new Error('Failed to delete user from the database.');
    }
  }
}

module.exports = UserRepository;
