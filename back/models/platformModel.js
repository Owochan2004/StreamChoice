const db = require('../config/db');

// Crear una plataforma con logo
const createPlatform = async (nombre, precio, calidad, url, logo_url) => {
    const query = `
        INSERT INTO Plataformas (nombre, precio, calidad, url, logo_url) 
        VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute(query, [nombre, precio, calidad, url, logo_url]);
    return result.insertId;
};

// Obtener todas las plataformas
const getPlatforms = async () => {
    const query = `SELECT * FROM Plataformas`;
    const [rows] = await db.execute(query);
    return rows;
};

// Actualizar una plataforma con logo
const updatePlatform = async (id, nombre, precio, calidad, url, logo_url) => {
    const query = `
        UPDATE Plataformas 
        SET nombre = ?, precio = ?, calidad = ?, url = ?, logo_url = ? 
        WHERE id_plataforma = ?
    `;
    const [result] = await db.execute(query, [nombre, precio, calidad, url, logo_url, id]);
    return result.affectedRows;
};

// Eliminar una plataforma
const deletePlatform = async (id) => {
    const query = `DELETE FROM Plataformas WHERE id_plataforma = ?`;
    const [result] = await db.execute(query, [id]);
    return result.affectedRows;
};

module.exports = {
    createPlatform,
    getPlatforms,
    updatePlatform,
    deletePlatform,
};
