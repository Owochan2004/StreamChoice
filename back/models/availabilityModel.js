const db = require('../config/db');

// Asociar contenido con plataforma
const addAvailability = async (id_contenido, id_plataforma, fecha_disponibilidad) => {
    const query = `
        INSERT INTO Disponibilidad (id_contenido, id_plataforma, fecha_disponibilidad) 
        VALUES (?, ?, ?)
    `;
    const [result] = await db.execute(query, [id_contenido, id_plataforma, fecha_disponibilidad]);
    return result.insertId;
};

// Obtener plataformas para un contenido, incluyendo el logo
const getPlatformsByContent = async (id_contenido) => {
    const query = `
        SELECT p.id_plataforma, p.nombre, p.precio, p.calidad, p.url, p.logo_url, d.fecha_disponibilidad 
        FROM Plataformas p
        INNER JOIN Disponibilidad d ON p.id_plataforma = d.id_plataforma
        WHERE d.id_contenido = ?
    `;
    const [rows] = await db.execute(query, [id_contenido]);
    return rows;
};

// Obtener contenido disponible en una plataforma, incluyendo la imagen
const getContentByPlatform = async (id_plataforma) => {
    const query = `
        SELECT c.id_contenido, c.titulo, c.tipo, c.duracion, c.descripcion, c.fecha_estreno, c.genero, c.imagen_url, d.fecha_disponibilidad 
        FROM Contenido c
        INNER JOIN Disponibilidad d ON c.id_contenido = d.id_contenido
        WHERE d.id_plataforma = ?
    `;
    const [rows] = await db.execute(query, [id_plataforma]);
    return rows;
};

// Eliminar relación entre contenido y plataforma
const removeAvailability = async (id_contenido, id_plataforma) => {
    const query = `
        DELETE FROM Disponibilidad 
        WHERE id_contenido = ? AND id_plataforma = ?
    `;
    const [result] = await db.execute(query, [id_contenido, id_plataforma]);
    return result.affectedRows;
};

module.exports = {
    addAvailability,
    getPlatformsByContent,
    getContentByPlatform,
    removeAvailability,
};
