const platformModel = require('../models/platformModel');

// Crear plataforma
const createPlatform = async (req, res) => {
    const { nombre, precio, calidad, url, logo_url } = req.body;

    if (!nombre || !precio || !calidad || !url || !logo_url) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios, incluido el logo' });
    }

    try {
        const platformId = await platformModel.createPlatform(nombre, precio, calidad, url, logo_url);
        res.status(201).json({ message: 'Plataforma creada con éxito', platformId });
    } catch (error) {
        console.error('Error al crear la plataforma:', error);
        res.status(500).json({ message: 'Error al crear la plataforma' });
    }
};

// Obtener todas las plataformas
const getPlatforms = async (req, res) => {
    try {
        const platforms = await platformModel.getPlatforms();
        res.status(200).json(platforms);
    } catch (error) {
        console.error('Error al obtener las plataformas:', error);
        res.status(500).json({ message: 'Error al obtener las plataformas' });
    }
};

// Actualizar plataforma
const updatePlatform = async (req, res) => {
    const { id } = req.params;
    const { nombre, precio, calidad, url, logo_url } = req.body;

    if (!nombre || !precio || !calidad || !url || !logo_url) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios, incluido el logo' });
    }

    try {
        const affectedRows = await platformModel.updatePlatform(id, nombre, precio, calidad, url, logo_url);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Plataforma no encontrada' });
        }
        res.status(200).json({ message: 'Plataforma actualizada con éxito' });
    } catch (error) {
        console.error('Error al actualizar la plataforma:', error);
        res.status(500).json({ message: 'Error al actualizar la plataforma' });
    }
};

// Eliminar una plataforma
const deletePlatform = async (req, res) => {
    const { id } = req.params;

    try {
        const affectedRows = await platformModel.deletePlatform(id);
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Plataforma no encontrada' });
        }
        res.status(200).json({ message: 'Plataforma eliminada con éxito' });
    } catch (error) {
        console.error('Error al eliminar la plataforma:', error);
        res.status(500).json({ message: 'Error al eliminar la plataforma' });
    }
};

module.exports = {
    createPlatform,
    getPlatforms,
    updatePlatform,
    deletePlatform,
};
