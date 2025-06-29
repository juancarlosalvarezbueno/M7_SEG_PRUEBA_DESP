const {User} = require('../models'); // Importa el modelo User desde los modelos para interactuar con la base de datos
const bcrypt = require('bcrypt'); // Importa bcrypt para el manejo de contraseñas
const jwt = require('jsonwebtoken'); // Importa jsonwebtoken para la generación de tokens JWT
const { message } = require('../validations/bookSchema');
const SECRET = process.env.JWT_SECRET; // Obtiene el secreto para firmar los tokens JWT desde las variables de entorno

exports.register = async (req,res) => {
    try {
        const {username, email, password} = req.body; // Desestructura los datos del cuerpo de la solicitud

        const existing = await User.findOne({where: {email}}); // Busca un usuario existente por email

        if (existing) {
            return res.status(400).json({message: 'El email intruducido ya existe'}); // Si el email ya existe, devuelve un error 400
        }

        const newUser = await User.create({ username, email, password}); // Crea un nuevo usuario con los datos proporcionados y los hashea automáticamente gracias al hook `beforeCreate` definido en el modelo User
        res.status(201).json({ // Devuelve una respuesta 201 con los datos del nuevo usuario
            id: newUser.id,
            username: newUser.username,
            email: newUser.email
        });
            

    } catch (error) {
        console.error('Error al registrar el usuario:', error); // Registra el error en la consola

    }
};
 // este archivo es el controlador de usuarios, maneja la lógica de negocio relacionada con los usuarios, como el registro, inicio de sesión, etc.
// Se encarga de interactuar con el modelo User para realizar operaciones CRUD sobre la tabla de usuarios en la base de datos.

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body; // Desestructura los datos del cuerpo de la solicitud

    const user = await User.findOne({where:{email}}) // Busca un usuario por email
        if (!user) {
            return res.status(404).json({message: 'UCredenciales invalidas'}); // Si no se encuentra el usuario, devuelve un error 404
        }
        const isValidPassword = await bcrypt.compare(password, user.password); // Compara la contraseña proporcionada con la almacenada en la base de datos
        if (!isValidPassword) {
            return res.status(401).json({message: 'Credenciales invalidas'}); // Si la contraseña es incorrecta, devuelve un error 401
        }
        const token = jwt.sign({id: user.id}, SECRET, {expiresIn: '1h'}); // Genera un token JWT con el id del usuario y lo firma con el secreto

        res.status(200).json({
            message: 'Inicio de sesión exitoso', // Devuelve un mensaje de éxito
            token, // Incluye el token en la respuesta
            id: user.id,
            username: user.username,
            email: user.email
        }); // Si las credenciales son válidas, devuelve una respuesta 200 con los datos del usuario
    } catch (error) {
        res.status(500).json({message: 'Error al iniciar sesión'}); // Si ocurre un error, devuelve un error 500
    }
};
