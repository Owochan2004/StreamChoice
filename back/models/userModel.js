const db = require('../config/db');
const bcrypt = require('bcryptjs');

const createUser = async (nombre, email, contraseña) => {
    // Asegúrate de que contraseña no sea undefined
    if (!contraseña) {
        throw new Error('La contraseña no puede estar vacía');
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10); // Aquí no debería fallar si contraseña está bien
    const query = `INSERT INTO Usuarios (nombre, email, contraseña) VALUES (?, ?, ?)`;
    const [result] = await db.execute(query, [nombre, email, hashedPassword]);
    return result.insertId;
};


// Buscar usuario por email
const findUserByEmail = async (email) => {
    const query = `SELECT * FROM Usuarios WHERE email = ?`;
    const [rows] = await db.execute(query, [email]);
    return rows[0];
};

module.exports = {
    createUser,
    findUserByEmail,
};
