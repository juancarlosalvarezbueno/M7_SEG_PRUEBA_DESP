const jwt = require('jsonwebtoken'); 
const  SECRET  = process.env.JWT_SECRET; 

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization; 
    console.log('Header:', req.headers.authorization);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token no proporcionado o formato incorrecto' }); 
    }

    const token = authHeader.split(' ')[1]; 
    try {
        const payload = jwt.verify(token, SECRET);
        req.userId = payload.id; 
        next(); 
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido o expirado' }); 
    }
};
