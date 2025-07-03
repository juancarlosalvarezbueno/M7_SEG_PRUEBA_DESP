const {User} = require('../models');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const { message } = require('../validations/bookSchema');
const SECRET = process.env.JWT_SECRET; 

exports.register = async (req,res) => {
    try {
        const {username, email, password} = req.body;

        const existing = await User.findOne({where: {email}}); 

        if (existing) {
            return res.status(400).json({message: 'El email intruducido ya existe'}); 
        }

        const newUser = await User.create({ username, email, password}); 
        res.status(201).json({
            id: newUser.id,
            username: newUser.username,
            email: newUser.email
        });
            

    } catch (error) {
        console.error('Error al registrar el usuario:', error); 

    }
};
 
exports.login = async (req, res) => {
    try {
        const {email, password} = req.body; 

    const user = await User.findOne({where:{email}}) 
        if (!user) {
            return res.status(404).json({message: 'UCredenciales invalidas'});
        }
        const isValidPassword = await bcrypt.compare(password, user.password); 
        if (!isValidPassword) {
            return res.status(401).json({message: 'Credenciales invalidas'}); 
        }
        const token = jwt.sign({id: user.id}, SECRET, {expiresIn: '1h'}); 

        res.status(200).json({
            message: 'Inicio de sesión exitoso', 
            token, 
            id: user.id,
            username: user.username,
            email: user.email
        }); 
    } catch (error) {
        res.status(500).json({message: 'Error al iniciar sesión'}); 
    }
};
