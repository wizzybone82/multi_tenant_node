const Subscription = require('../models/Subscription');
const Tenant = require('../models/Tenant');
const { Op } = require('sequelize');

async function createSubscription(req, res) {
    const { tenant_id, plan_name, start_date, end_date } = req.body;

    if (!tenant_id || !plan_name || !start_date || !end_date) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Check tenant exists
        const tenant = await Tenant.findByPk(tenant_id);
        if (!tenant) {
            return res.status(404).json({ error: 'Tenant not found' });
        }

        // Create subscription
        const subscription = await Subscription.create({
            tenant_id,
            plan_name,
            start_date,
            end_date,
            status: 'active'
        });

        res.json({ message: 'Subscription created', subscription });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create subscription', details: err.message });
    }
}

module.exports = { createSubscription };
