const availabilityModel = require('../models/availabilityModel');

// Asociar contenido con plataforma
const addAvailability = async (req, res) => {
    const { id_contenido, id_plataforma, fecha_disponibilidad } = req.body;

    if (!id_contenido || !id_plataforma || !fecha_disponibilidad) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const availabilityId = await availabilityModel.addAvailability(id_contenido, id_plataforma, fecha_disponibilidad);
        res.status(201).json({ message: 'Disponibilidad añadida con éxito', availabilityId });
    } catch (error) {
        console.error('Error al asociar contenido con plataforma:', error);
        res.status(500).json({ message: 'Error al asociar contenido con plataforma' });
    }
};

// Obtener plataformas para un contenido
const getPlatformsByContent = async (req, res) => {
    const { id_contenido } = req.params;

    try {
        const platforms = await availabilityModel.getPlatformsByContent(id_contenido);
        res.status(200).json(platforms);
    } catch (error) {
        console.error('Error al obtener plataformas para el contenido:', error);
        res.status(500).json({ message: 'Error al obtener plataformas' });
    }
};

// Obtener contenido disponible en una plataforma
const getContentByPlatform = async (req, res) => {
    const { id_plataforma } = req.params;

    try {
        const content = await availabilityModel.getContentByPlatform(id_plataforma);
        res.status(200).json(content);
    } catch (error) {
        console.error('Error al obtener contenido para la plataforma:', error);
        res.status(500).json({ message: 'Error al obtener contenido' });
    }
};

// Eliminar relación entre contenido y plataforma
const removeAvailability = async (req, res) => {
    const { id_contenido, id_plataforma } = req.body;

    if (!id_contenido || !id_plataforma) {
        return res.status(400).json({ message: 'Se requieren id_contenido y id_plataforma' });
    }

    try {
        const affectedRows = await availabilityModel.removeAvailability(id_contenido, id_plataforma);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Relación no encontrada' });
        }
        res.status(200).json({ message: 'Relación eliminada con éxito' });
    } catch (error) {
        console.error('Error al eliminar relación:', error);
        res.status(500).json({ message: 'Error al eliminar relación' });
    }
};

module.exports = {
    addAvailability,
    getPlatformsByContent,
    getContentByPlatform,
    removeAvailability,
};
