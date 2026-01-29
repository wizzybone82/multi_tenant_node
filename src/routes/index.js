const express = require('express');
const router = express.Router();
const { createTenant } = require('../controllers/tenantController');
const { createSubscription } = require('../controllers/subscriptionController');

router.get('/', (req, res) => res.send('Multi-tenant SaaS API running'));

router.post('/create-tenant', createTenant);
router.post('/create-subscription', createSubscription);

module.exports = router;
