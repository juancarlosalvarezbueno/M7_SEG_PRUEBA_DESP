const jwt = require('jsonwebtoken'); // Importa jsonwebtoken para la verificación de tokens JWT
const { SECRET } = process.env; // Importa el secreto desde las variables de entorno

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization; // Obtiene el encabezado de autorización de la solicitud

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token no proporcionado o formato incorrecto' }); // Si no hay token o el formato es incorrecto, devuelve un error 401
    }

    const token = authHeader.split(' ')[1]; // Extrae el token del encabezado

    try {
        const payload = jwt.verufy(token, SECRET);
        req.userId = payload.id; // Almacena el ID del usuario en la solicitud para que esté disponible en las siguientes funciones middleware o rutas
        next(); // Llama a la siguiente función middleware o ruta
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido o expirado' }); // Si el token es inválido o ha expirado, devuelve un error 403
    }
};
// Este middleware se encarga de verificar la validez del token JWT proporcionado en el encabezado de autorización de la solicitud.
// Si el token es válido, extrae el ID del usuario del payload y lo almacena en la solicitud para que esté disponible en las siguientes funciones middleware o rutas.
// Si el token no es proporcionado, tiene un formato incorrecto, es inválido o ha expirado, devuelve un error correspondiente. 
// Esto asegura que solo los usuarios autenticados puedan acceder a las rutas protegidas de la aplicación.