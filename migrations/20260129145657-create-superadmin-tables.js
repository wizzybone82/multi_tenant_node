'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // USERS TABLE
    await queryInterface.createTable('users', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
      role: { type: Sequelize.ENUM('superadmin', 'tenant'), defaultValue: 'tenant' },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
    });

    // TENANTS TABLE
    await queryInterface.createTable('tenants', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      db_name: { type: Sequelize.STRING, allowNull: false },
      db_user: { type: Sequelize.STRING, allowNull: false },
      db_password: { type: Sequelize.STRING, allowNull: false },
      db_host: { type: Sequelize.STRING, defaultValue: 'localhost' },
      status: { type: Sequelize.ENUM('active','inactive'), defaultValue: 'active' },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
    });

    // SUBSCRIPTIONS TABLE
    await queryInterface.createTable('subscriptions', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      tenant_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'tenants', key: 'id' }, onDelete: 'CASCADE' },
      plan_name: { type: Sequelize.STRING, allowNull: false },
      start_date: { type: Sequelize.DATE, allowNull: false },
      end_date: { type: Sequelize.DATE, allowNull: false },
      status: { type: Sequelize.ENUM('active','expired','cancelled'), defaultValue: 'active' },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') }
    });

    // ACTIVITY LOGS TABLE
    await queryInterface.createTable('activity_logs', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
      action: { type: Sequelize.STRING, allowNull: false },
      ip_address: { type: Sequelize.STRING },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('activity_logs');
    await queryInterface.dropTable('subscriptions');
    await queryInterface.dropTable('tenants');
    await queryInterface.dropTable('users');
  }
};
