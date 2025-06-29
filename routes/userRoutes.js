const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const validate = require('../middlewares/validate');
const { registerSchema, loginSchema } = require('../validations/userSchema');

// Ruta para registrar un nuevo usuario
router.post('/register', validate(registerSchema), userController.register);
// Ruta para iniciar sesión
router.post('/login', validate(loginSchema), userController.login);

module.exports = router;