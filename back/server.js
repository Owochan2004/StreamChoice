const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http'); // 👈 importante
const socketIo = require('socket.io'); // 👈 importante

const db = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const platformRoutes = require('./routes/platformRoutes');
const contentRoutes = require('./routes/contentRoutes');
const availabilityRoutes = require('./routes/availabilityRoutes');

dotenv.config();

const app = express();
const server = http.createServer(app); // 👈 ahora usamos esto
const io = socketIo(server, {
  cors: {
    origin: "*", // o especifica tu frontend
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bienvenido a StreamChoice Backend');
});

app.use('/api/users', userRoutes);
app.use('/api/platforms', platformRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/availability', availabilityRoutes);

// Conexion a base de datos
db.getConnection()
  .then(() => console.log('Conexión exitosa con la base de datos'))
  .catch(err => console.error('Error al conectar con la base de datos:', err));

// Manejo de conexiones WebSocket
io.on("connection", (socket) => {
  console.log("Cliente WebSocket conectado");

  socket.emit("bienvenida", "¡Conectado al WebSocket!");

  // Ejemplo: enviar notificación
  setInterval(() => {
    console.log("Enviando notificación al cliente...");
    socket.emit("notificacion", "¡Nueva película disponible en Netflix!");
  }, 20000); // Cada 60 segundos

  socket.on("disconnect", () => {
    console.log("Cliente WebSocket desconectado");
  });
});

// 👇 cambia app.listen por server.listen
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
