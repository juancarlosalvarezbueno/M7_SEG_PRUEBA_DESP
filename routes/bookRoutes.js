const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const validate = require('../middlewares/validate');
const bookSchema = require('../validations/bookSchema');
const auth = require('../middlewares/auth'); // Importamos el middleware de autenticación, lo que hace es que las rutas de libros estarán protegidas y solo accesibles para usuarios autenticados

router.get('/', bookController.getAllBooks);
router.post('/',auth, validate(bookSchema), bookController.createBook);
router.put('/:id',auth, validate(bookSchema), bookController.updateBook );
router.delete('/:id',auth, bookController.deleteBook);

module.exports = router;

// Exportamos el router para que pueda ser utilizado en el archivo principal de la aplicación