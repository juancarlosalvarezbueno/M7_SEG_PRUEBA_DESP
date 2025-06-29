require('dotenv').config();

const app = require('./app'); // Importa la aplicación Express

const PORT = process.env.PORT || 3000; // Define el puerto en el que se ejecutará la aplicación

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
}); // Inicia el servidor y muestra un mensaje en la consola indicando que está escuchando en el puerto especificado

// Este archivo es el punto de entrada de la aplicación. Aquí se importa la aplicación Express desde app.js y se inicia el servidor en el puerto especificado.
// La variable PORT toma el valor del entorno o, si no está definido, utiliza el puerto 3000 por defecto.
// Al iniciar el servidor, se muestra un mensaje en la consola indicando que está escuchando en el puerto correspondiente.