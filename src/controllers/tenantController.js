const { getTenantConnection, ensureTenantFolder } = require('../tenants/tenantManager');
const mysql = require('mysql2/promise');
const Tenant = require('../models/Tenant');
const { DataTypes } = require('sequelize');

async function createTenant(req, res) {
    const { name, dbName, dbUser, dbPassword, dbHost } = req.body;

    if (!name || !dbName || !dbUser || !dbPassword) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const host = dbHost || 'localhost';

    try {
        // 1️⃣ Connect to MySQL server (without DB) to create DB
        const connection = await mysql.createConnection({
            host,
            user: dbUser,
            password: dbPassword
        });

        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
        console.log(`Database ${dbName} created or already exists`);

        // 2️⃣ Store tenant DB info in superadmin database
        const tenantRecord = await Tenant.create({
            name,
            db_name: dbName,
            db_user: dbUser,
            db_password: dbPassword,
            db_host: host,
            status: 'active'
        });
        console.log('Tenant saved in superadmin DB:', tenantRecord.name);

        // 3️⃣ Connect to tenant DB
        const tenantDb = getTenantConnection({
            database: dbName,
            username: dbUser,
            password: dbPassword,
            host
        });

        // 4️⃣ Create initial tenant tables
        // Pages table
        const Page = tenantDb.define('Page', {
            title: { type: DataTypes.STRING, allowNull: false },
            description: { type: DataTypes.TEXT },
            url: { type: DataTypes.STRING },
        }, { tableName: 'pages', timestamps: true, underscored: true });

        // Website Settings table
        const WebsiteSettings = tenantDb.define('WebsiteSettings', {
            header_color: { type: DataTypes.STRING },
            footer_color: { type: DataTypes.STRING },
            text_color: { type: DataTypes.STRING },
            font_family: { type: DataTypes.STRING },
        }, { tableName: 'website_settings', timestamps: true, underscored: true });

        await tenantDb.sync({ force: false }); // creates tables if not exists
        console.log('Tenant initial tables created');

        // 5️⃣ Ensure tenant content folder exists
        const folder = ensureTenantFolder(name);

        res.json({
            message: `Tenant ${name} setup successfully`,
            folder,
            tenant: tenantRecord
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create tenant', details: err.message });
    }
}

module.exports = { createTenant };
