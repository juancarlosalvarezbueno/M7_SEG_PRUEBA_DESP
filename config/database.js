const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();





const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false
    }
);

module.exports = sequelize; 
// This code connects to a MySQL database using Sequelize ORM.
// It reads database configuration from environment variables defined in a .env file.
// The connection parameters include the database name, user, password, host, port, and dialect.
// The logging option is set to false to disable SQL query logging.