const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require("../config/db");

const registerUser = async (req, res, io) => {
  const { nombre, email, contraseña, es_premium } = req.body;

  if (!nombre || !email || !contraseña || typeof es_premium === "undefined") {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const [result] = await db.execute(
      `INSERT INTO Usuarios (nombre, email, contraseña, es_premium) 
      VALUES (?, ?, ?, ?)`,
      [nombre, email, hashedPassword, es_premium]
    );

    // ✅ Emitimos evento WebSocket
    if (io) {
      io.emit('nuevo_usuario', { nombre, email });
    }

    res.status(201).json({ message: "Usuario registrado con éxito", userId: result.insertId });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

const loginUser = async (req, res, io) => { // <-- Añadir io como parámetro
  const { email, contraseña } = req.body;

  if (!email || !contraseña) {
    return res.status(400).json({ message: "Correo y contraseña son obligatorios" });
  }

  try {
    const [rows] = await db.execute("SELECT * FROM Usuarios WHERE email = ? LIMIT 1", [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const usuario = rows[0];
    const isPasswordValid = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // ✅ Emitir evento WebSocket para login
    if (io) {
      io.emit('nuevo_login', { nombre: usuario.nombre, email: usuario.email });
    }

    const token = jwt.sign(
      { id: usuario.id_usuario, email: usuario.email, es_premium: usuario.es_premium },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: "Login exitoso",
      token,
      user: {
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        email: usuario.email,
        es_premium: usuario.es_premium,
      },
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Acceso denegado. Token no proporcionado." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error al verificar el token:", error);
    res.status(403).json({ message: "Token inválido o expirado." });
  }
};

const upgradeToPremium = async (req, res) => {
  const userId = req.user.id;

  try {
    const [result] = await db.execute(
      "UPDATE Usuarios SET es_premium = 1 WHERE id_usuario = ?",
      [userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Cuenta actualizada a premium con éxito" });
  } catch (error) {
    console.error("Error al actualizar a premium:", error);
    res.status(500).json({ message: "Error al actualizar a premium" });
  }
};

const subscribeUser = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.execute(
      "UPDATE Usuarios SET es_premium = 1 WHERE id_usuario = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Suscripción actualizada con éxito" });
  } catch (error) {
    console.error("Error al actualizar la suscripción del usuario:", error);
    res.status(500).json({ message: "Error al actualizar la suscripción" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyToken,
  upgradeToPremium,
  subscribeUser,
};
