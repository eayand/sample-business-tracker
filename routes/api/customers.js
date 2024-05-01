const express = require('express');
const router = express.Router();
const customersCtrl = require('../../controllers/api/customers');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// GET /api/customers
router.get('/', ensureLoggedIn, customersCtrl.index);

module.exports = router;
