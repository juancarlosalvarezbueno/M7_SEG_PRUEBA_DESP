const sequelize = require('../config/database');
const { Sequelize, DataTypes } = require('sequelize');

const db = {};

db.sequelize = sequelize; // Esto se hace para que sequelize sea accesible desde los modelos
db.Sequelize = Sequelize; // Esto se hace para que Sequelize sea accesible desde los modelos

db.User = require('./user')(sequelize, DataTypes); // Importa el modelo User y lo inicializa con sequelize y Datatypes para que pueda ser utilizado en la aplicación y asi poder realizar operaciones CRUD sobre la tabla de usuarios en la base de datos.
db.Book = require('./book')(sequelize, DataTypes); // Importa el modelo Book y lo inicializa con sequelize y Datatypes para que pueda ser utilizado en la aplicación y asi poder realizar operaciones CRUD sobre la tabla de libros en la base de datos.

// Relacionar los modelos
db.User.hasMany(db.Book, { foreignKey: 'userId' }); // Un usuario puede tener muchos libros
db.Book.belongsTo(db.User, { foreignKey: 'userId' }); // Un libro pertenece a un usuario

module.exports = db; // Exporta el objeto db que contiene los modelos y la conexión a la base de datos para que puedan ser utilizados en otras partes de la aplicación.
// Esto permite que los modelos se importen fácilmente en otros archivos de la aplicación, facilitando la organización y el mantenimiento del código.
// Además, la relación entre los modelos permite realizar consultas más complejas y obtener datos relacionados de manera eficiente.


