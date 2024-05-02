const express = require('express');
const router = express.Router();
const brokersCtrl = require('../../controllers/api/brokers');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// GET /api/brokers
router.get('/', ensureLoggedIn, brokersCtrl.index);
router.get('/:id', ensureLoggedIn, brokersCtrl.show)

router.post('/create', ensureLoggedIn, brokersCtrl.create)

router.put('/:id', ensureLoggedIn, brokersCtrl.update)

module.exports = router;
