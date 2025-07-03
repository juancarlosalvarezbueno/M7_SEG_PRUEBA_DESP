const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const validate = require('../middlewares/validate');
const { registerSchema, loginSchema } = require('../validations/userSchema');


router.post('/register', validate(registerSchema), userController.register);

router.post('/login', validate(loginSchema), userController.login);

module.exports = router;