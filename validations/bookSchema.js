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
        .max('now'),
    
});


module.exports = bookSchema;


