const express = require('express');
const router = express.Router();
const customersCtrl = require('../../controllers/api/customers');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// GET /api/customers
router.get('/:wsurl', ensureLoggedIn, customersCtrl.index)
router.get('/:wsurl/:id', ensureLoggedIn, customersCtrl.show)
router.get('/:wsurl/no-ref/:id', ensureLoggedIn, customersCtrl.getNotAssociated)
// POST /api/customers
router.post('/:wsurl/create', ensureLoggedIn, customersCtrl.create)
// PUT /api/customers
router.put('/:wsurl/:id', ensureLoggedIn, customersCtrl.update)
router.put('/:wsurl/assoc/:id', ensureLoggedIn, customersCtrl.associateBroker)
router.put('/:wsurl/associate-with/:id', ensureLoggedIn, customersCtrl.associateWithBroker)
router.put('/:wsurl/remove/:id', ensureLoggedIn, customersCtrl.removeBroker)
router.put('/:wsurl/remove-from/:id', ensureLoggedIn, customersCtrl.removeFromBroker)
// DELETE /api/customers
router.delete('/:wsurl/:id/delete', ensureLoggedIn, customersCtrl.delete)


module.exports = router;
