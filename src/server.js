const express = require('express');
const app = express();
const UserController = require('./src/app/controllers/UserController');

// Middleware pour le traitement des données POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Instanciation du contrôleur et du référentiel
const userController = new UserController();

// Routes
app.post('/users', userController.createUser);
app.get('/users', userController.getUsers);
app.delete('/users/:id', userController.deleteUser);

// Démarrage du serveur
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
