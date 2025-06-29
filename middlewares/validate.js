module.exports = (schema) => { // Middleware para validar datos de entrada
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {abortEarly : false}); // Valida el cuerpo de la solicitud contra el esquema proporcionado en el middleware. `abortEarly: false` permite que se acumulen todos los errores de validación en lugar de detenerse en el primero encontrado.
        // `error` contendrá los detalles de la validación si hay errores, o será `undefined` si la validación es exitosa.
        if (error) {
            return res.status(400).json({
                errors: error.details.map(detail => detail.message)
            });
        }
        next(); // Si no hay errores, continúa con la siguiente función middleware o ruta
    };
};