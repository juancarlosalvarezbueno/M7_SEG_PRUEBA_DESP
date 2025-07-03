module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3] 
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true 
        },
        publishedDate: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true, 
                
                isBefore: new Date().toISOString().split('T')[0] 
            }
        },
    });
    return Book; 
};