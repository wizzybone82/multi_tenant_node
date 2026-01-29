const { DataTypes } = require('sequelize');
const superAdminDb = require('../config/db');

const Tenant = superAdminDb.define('Tenant', {
    name: { type: DataTypes.STRING, allowNull: false },
    db_name: { type: DataTypes.STRING, allowNull: false },
    db_user: { type: DataTypes.STRING, allowNull: false },
    db_password: { type: DataTypes.STRING, allowNull: false },
    db_host: { type: DataTypes.STRING, defaultValue: 'localhost' },
    status: { type: DataTypes.ENUM('active','inactive'), defaultValue: 'active' }
}, { 
    tableName: 'tenants', 
    timestamps: true, 
    underscored: true // <- this tells Sequelize to use created_at, updated_at
});

module.exports = Tenant;
