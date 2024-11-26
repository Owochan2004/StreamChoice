const express = require('express');
const router = express.Router();
const availabilityController = require('../controllers/availabilityController');

router.post('/', availabilityController.addAvailability);
router.get('/content/:id_contenido', availabilityController.getPlatformsByContent);
router.get('/platform/:id_plataforma', availabilityController.getContentByPlatform);
router.delete('/', availabilityController.removeAvailability);

module.exports = router;
