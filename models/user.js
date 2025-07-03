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
            validate:{ 
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
        const salt = await bcrypt.genSalt(10); 
        user.password = await bcrypt.hash(user.password, salt); 
    });

    return User; 
}