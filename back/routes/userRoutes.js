const express = require('express');
const userController = require('../controllers/userController');

module.exports = (io) => {
  const router = express.Router();

  router.post('/register', (req, res) => userController.registerUser(req, res, io));
  router.post('/login', userController.loginUser);
  router.patch("/:id/subscribe", userController.subscribeUser);

  return router;
};
