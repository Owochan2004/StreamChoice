const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');

const db = require('./config/db');
const platformRoutes = require('./routes/platformRoutes');
const contentRoutes = require('./routes/contentRoutes');
const availabilityRoutes = require('./routes/availabilityRoutes');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Rutas
const userRoutes = require('./routes/userRoutes')(io); // Inyectamos `io` para usarlo dentro del router si es necesario

app.use('/api/users', userRoutes);
app.use('/api/platforms', platformRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/availability', availabilityRoutes);

app.get('/', (req, res) => {
  res.send('Bienvenido a StreamChoice Backend');
});

// Conexión a base de datos
db.getConnection()
  .then(() => console.log('Conexión exitosa con la base de datos'))
  .catch(err => console.error('Error al conectar con la base de datos:', err));

// WebSocket
io.on("connection", (socket) => {
  console.log("Cliente WebSocket conectado");

  socket.emit("bienvenida", "¡Conectado al WebSocket!");

  // Enviar notificación periódica
  const interval = setInterval(() => {
    console.log("Enviando notificación al cliente...");
    socket.emit("notificacion", "¡Nueva película disponible en Netflix!");
  }, 25000);

  socket.on("new-comment", (data) => {
    console.log("Nuevo comentario recibido:", data);
    io.emit("new-comment", data); // Reenvía el evento a todos los clientes conectados
  });

  socket.on("disconnect", () => {
    console.log("Cliente WebSocket desconectado");
    clearInterval(interval); // Limpia el intervalo al desconectar
  });
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
