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
db.sequelize.sync({ force: false }) // Cambia a true para reiniciar la base de datos db.sequelize hace referencia a la conexión a la base de datos establecida en models/index.js
    .then(() => {
        console.log('Conexión a la base de datos establecida correctamente');
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
    });

    module.exports = app; // Exporta la aplicación para que pueda ser utilizada en otros archivos, como en el archivo de inicio del servidor (server.js) o en los tests.