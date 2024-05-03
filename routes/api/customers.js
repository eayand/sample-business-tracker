const express = require('express');
const router = express.Router();
const customersCtrl = require('../../controllers/api/customers');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// GET /api/customers
router.get('/', ensureLoggedIn, customersCtrl.index)
router.get('/:id', ensureLoggedIn, customersCtrl.show)

router.post('/create', ensureLoggedIn, customersCtrl.create)

router.put('/:id', ensureLoggedIn, customersCtrl.update)
router.put('/assoc/:id', ensureLoggedIn, customersCtrl.associateBroker)
router.put('/remove/:id', ensureLoggedIn, customersCtrl.removeBroker)

router.delete('/:id/delete', ensureLoggedIn, customersCtrl.delete)


module.exports = router;
