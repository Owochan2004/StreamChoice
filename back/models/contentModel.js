const db = require('../config/db');

// Crear contenido con imagen
const createContent = async (titulo, tipo, duracion, descripcion, fecha_estreno, genero, imagen_url) => {
    const query = `
        INSERT INTO Contenido (titulo, tipo, duracion, descripcion, fecha_estreno, genero, imagen_url) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute(query, [titulo, tipo, duracion, descripcion, fecha_estreno, genero, imagen_url]);
    return result.insertId;
};

// Obtener todo el contenido
const getAllContent = async () => {
    const query = `SELECT * FROM Contenido`;
    const [rows] = await db.execute(query);
    return rows;
};

// Actualizar contenido con imagen
const updateContent = async (id, titulo, tipo, duracion, descripcion, fecha_estreno, genero, imagen_url) => {
    const query = `
        UPDATE Contenido 
        SET titulo = ?, tipo = ?, duracion = ?, descripcion = ?, fecha_estreno = ?, genero = ?, imagen_url = ? 
        WHERE id_contenido = ?
    `;
    const [result] = await db.execute(query, [titulo, tipo, duracion, descripcion, fecha_estreno, genero, imagen_url, id]);
    return result.affectedRows;
};

// Eliminar contenido
const deleteContent = async (id) => {
    const query = `DELETE FROM Contenido WHERE id_contenido = ?`;
    const [result] = await db.execute(query, [id]);
    return result.affectedRows;
};

module.exports = {
    createContent,
    getAllContent,
    updateContent,
    deleteContent,
};