const { DataTypes } = require('sequelize');
const superAdminDb = require('../config/db');

const Subscription = superAdminDb.define('Subscription', {
    tenant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tenants',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    plan_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('active','expired','cancelled'),
        defaultValue: 'active'
    }
}, {
    tableName: 'subscriptions',
    timestamps: true,
    underscored: true
});

module.exports = Subscription;
