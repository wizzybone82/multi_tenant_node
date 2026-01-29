const { Sequelize } = require('sequelize');
require('dotenv').config();

const superAdminDb = new Sequelize(
    process.env.SUPERADMIN_DB_NAME,
    process.env.SUPERADMIN_DB_USER,
    process.env.SUPERADMIN_DB_PASSWORD,
    {
        host: process.env.SUPERADMIN_DB_HOST,
        dialect: 'mysql',
        logging: false
    }
);

module.exports = superAdminDb;
