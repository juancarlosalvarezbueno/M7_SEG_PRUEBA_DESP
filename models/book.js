module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3] // Título debe tener al menos 3 caracteres
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true // Descripción es opcional
        },
        publishedDate: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true, // Fecha debe ser una fecha válida
                // la fecha no puede ser futura
                isBefore: new Date().toISOString().split('T')[0] // Validación para que la fecha no sea futura
            }
        },
    });
    return Book; // Devuelve el modelo Book para que pueda ser utilizado en la aplicación
};