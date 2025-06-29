const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len:[3, 10]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{ //estas validaciones son gracias a sequelize
                isEmail: true
            }

        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 20]
                
            }
        }
    });

    User.beforeCreate(async (user) => {
        const salt = await bcrypt.genSalt(10); // Genera un salt para el hash, un salt es un valor aleatorio que se añade a la contraseña antes de hashearla para aumentar la seguridad
        user.password = await bcrypt.hash(user.password, salt); // Hashea la contraseña antes de guardarla
    });

    return User; // Devuelve el modelo User para que pueda ser utilizado en la aplicación

}