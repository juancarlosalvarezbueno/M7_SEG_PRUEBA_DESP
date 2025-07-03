const {Book, User} = require('../models'); 

exports.getAllBooks = async (req, res) => {
    const books = await Book.findAll({include: User});
    res.status(200).json(books);
};

exports.createBook = async (req, res) => {

        const book = await Book.create({
            ...req.body,
            userId: req.userId
        });

        res.status(201).json(book);
};

exports.updateBook = async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
        return res.status(404).json({message: 'Libro no encontrado'}); 
    }
    if (book.userId !== req.userId) {
        return res.status(403).json({message: 'No tienes permiso para actualizar este libro'}); 
    }
    await book.update(req.body); 
    res.status(200).json(book); 
};

exports.deleteBook = async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
        return res.status(404).json({message: 'Libro no encontrado'}); 
    }
    if (book.userId !== req.userId) {
        return res.status(403).json({message: 'No tienes permiso para eliminar este libro'}); 
    }
    await book.destroy(); 
    res.status(200).json({message: 'Libro eliminado correctamente'});    

};