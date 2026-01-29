require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const superAdminDb = require('./config/db');

const app = express();
app.use(bodyParser.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await superAdminDb.authenticate();
        console.log('Super Admin DB connected');

        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (err) {
        console.error('Unable to connect to Super Admin DB:', err);
    }
}

startServer();
