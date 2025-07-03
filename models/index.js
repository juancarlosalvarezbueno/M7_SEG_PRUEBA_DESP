const sequelize = require('../config/database');
const { Sequelize, DataTypes } = require('sequelize');

const db = {};

db.sequelize = sequelize; 
db.Sequelize = Sequelize; 

db.User = require('./user')(sequelize, DataTypes); 
db.Book = require('./book')(sequelize, DataTypes); 


db.User.hasMany(db.Book, { foreignKey: 'userId' });
db.Book.belongsTo(db.User, { foreignKey: 'userId' }); 

module.exports = db; 




