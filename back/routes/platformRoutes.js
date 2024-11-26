const express = require('express');
const router = express.Router();
const platformController = require('../controllers/platformController');

router.post('/', platformController.createPlatform);
router.get('/', platformController.getPlatforms);
router.put('/:id', platformController.updatePlatform);
router.delete('/:id', platformController.deletePlatform);

module.exports = router;
