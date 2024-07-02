const express = require('express');
const router = express.Router();
const brokersCtrl = require('../../controllers/api/brokers');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// GET /api/brokers
router.get('/:wsurl', ensureLoggedIn, brokersCtrl.index)
router.get('/:wsurl/:id', ensureLoggedIn, brokersCtrl.show)
router.get('/:wsurl/no-ref/:id', ensureLoggedIn, brokersCtrl.getNotAssociated)
router.get('/:wsurl/customers/:id', ensureLoggedIn, brokersCtrl.getCustomers)
// POST /api/brokers
router.post('/:wsurl/create', ensureLoggedIn, brokersCtrl.create)
// PUT /api/brokers
router.put('/:wsurl/:id', ensureLoggedIn, brokersCtrl.update)
// DELETE /api/brokers
router.delete('/:wsurl/:id/delete', ensureLoggedIn, brokersCtrl.delete)

module.exports = router;
