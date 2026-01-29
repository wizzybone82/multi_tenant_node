const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const tenants = {}; // Store active tenant connections

function getTenantConnection(tenantDbConfig) {
    const key = tenantDbConfig.database;
    if (!tenants[key]) {
        tenants[key] = new Sequelize(
            tenantDbConfig.database,
            tenantDbConfig.username,
            tenantDbConfig.password,
            {
                host: tenantDbConfig.host,
                dialect: 'mysql',
                logging: false
            }
        );
    }
    return tenants[key];
}

// Ensure content folder exists for tenant
function ensureTenantFolder(tenantName) {
    const folderPath = path.join(process.env.TENANTS_PATH, tenantName);
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
    return folderPath;
}

module.exports = { getTenantConnection, ensureTenantFolder };
