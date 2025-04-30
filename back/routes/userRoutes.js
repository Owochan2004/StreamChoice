const express = require('express');
const userController = require('../controllers/userController');

module.exports = (io) => {
  const router = express.Router();

  router.post('/register', (req, res) => userController.registerUser(req, res, io));
  router.post('/login', (req, res) => userController.loginUser(req, res, io)); // <-- Añadir io  
  return router;
};
