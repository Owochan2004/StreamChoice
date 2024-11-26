const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const platformRoutes = require('./routes/platformRoutes');
const contentRoutes = require('./routes/contentRoutes');
const availabilityRoutes = require('./routes/availabilityRoutes');


dotenv.config();

const app = express();
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

db.getConnection()
    .then(() => console.log('Conexión exitosa con la base de datos'))
    .catch(err => console.error('Error al conectar con la base de datos:', err));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
