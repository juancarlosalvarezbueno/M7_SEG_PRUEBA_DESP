const Joi = require('joi');

const bookSchema = Joi.object({
    title: Joi
        .string()
        .min(3)
        .required(),
    description: Joi
        .string()
        .allow('',null),
    publishedDate: Joi
        .date()
        .iso()
        .required()
        .max('now'), // Validación para que la fecha no sea futura
    
});


module.exports = bookSchema;

// Exportamos el esquema para que pueda ser utilizado en las rutas
// y así validar los datos de entrada al crear o actualizar un libro.   
