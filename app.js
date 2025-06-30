const express =require('express');
const helmet = require('helmet');
const db = require('./models');

const app = express();

app.use(express.json());
app.use(helmet()); // Protege la aplicación de ataques comunes

// Rutas (más adelante)
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/books', require('./routes/bookRoutes'));

// Conexión a la base de datos


    module.exports = app; // Exporta la aplicación para que pueda ser utilizada en otros archivos, como en el archivo de inicio del servidor (server.js) o en los tests.