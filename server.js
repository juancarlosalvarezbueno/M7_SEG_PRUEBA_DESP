require('dotenv').config();

const app = require('./app'); // Importa la aplicación Express
const db = require('./models');

const PORT = process.env.PORT || 3000; // Define el puerto en el que se ejecutará la aplicación

const startServer = async (retries = 5, delay = 5000) => {
  while (retries) {
    try {
        await db.sequelize.authenticate();
        await db.sequelize.sync({ alter: true });
            console.log('✅ Base de datos sincronizada correctamente');
        app.listen(PORT, () => {
            console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
        });
        break;
    }  catch (err) {
        console.error(`❌ Error al conectar (reintentos restantes: ${retries - 1})`, err.message);
        retries -= 1;
        if (!retries) process.exit(1);
        await new Promise(res => setTimeout(res, delay));
    }
  }
};

startServer();
