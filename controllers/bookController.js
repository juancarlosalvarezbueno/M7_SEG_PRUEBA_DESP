const {Book, User} = require('../models'); // Importa los modelos Book y User

exports.getAllBooks = async (req, res) => {
    const books = await Book.findAll({include: User}); // Obtiene todos los libros, incluyendo el usuario asociado a cada libro
    res.status(200).json(books); // Devuelve los libros encontrados con un estado 200
};

exports.createBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book); // Devuelve el libro creado con un estado 201
    } catch (error) {
        res.status(500).json({message: 'Error al crear el libro'}); // Devuelve un error 500 si ocurre un problema al crear el libro
    }
};

exports.updateBook = async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
        return res.status(404).json({message: 'Libro no encontrado'}); // Devuelve un error 404 si el libro no existe
    }
    await book.update(req.body); // Actualiza el libro con los datos proporcionados
    res.status(200).json(book); // Devuelve el libro actualizado con un estado 200
};

exports.deleteBook = async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
        return res.status(404).json({message: 'Libro no encontrado'}); // Devuelve un error 404 si el libro no existe
    }
    await book.destroy(); // Elimina el libro
    res.status(200).json({message: 'Libro eliminado correctamente'}); // Devuelve un mensaje de éxito con un estado 200     

};