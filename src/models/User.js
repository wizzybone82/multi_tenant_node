const { DataTypes } = require('sequelize');
const superAdminDb = require('../config/db');

const User = superAdminDb.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    role: { type: DataTypes.ENUM('superadmin','tenant'), defaultValue: 'tenant' }
}, {
    tableName: 'users'
});

module.exports = User;
