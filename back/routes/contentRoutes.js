const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

router.post('/', contentController.createContent);
router.get('/', contentController.getAllContent);
router.put('/:id', contentController.updateContent);
router.delete('/:id', contentController.deleteContent);
// Endpoint para buscar contenido
router.get("/search", contentController.searchContent);

module.exports = router;
