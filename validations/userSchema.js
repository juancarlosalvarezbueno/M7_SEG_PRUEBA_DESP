const Joi =  require('joi');

const registerSchema = Joi.object({
    username : Joi
        .string()
        .min(3)
        .max(10)
        .required(),
    emaii : Joi
        .string()
        .email()
        .required(),
    password: Joi
        .string()
        .min(6)
        .max(20)
        .required()
});

const loginSchema = Joi.object({
    email: Joi
        .string()
        .email()
        .required(),
    password: Joi
        .string()
        .required()
});

module.exports = {
    registerSchema,
    loginSchema
};