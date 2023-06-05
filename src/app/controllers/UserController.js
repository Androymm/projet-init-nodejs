const db = require('../../config/database');

class UserController {
  async createUser(req, res) {
    try {
      const { username, email } = req.body;
      const query = 'INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *';
      const values = [username, email];
      const user = await db.one(query, values);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await db.any('SELECT * FROM users');
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await db.none('DELETE FROM users WHERE id = $1', id);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = UserController;