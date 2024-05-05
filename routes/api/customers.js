const express = require('express');
const router = express.Router();
const customersCtrl = require('../../controllers/api/customers');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// GET /api/customers
router.get('/', ensureLoggedIn, customersCtrl.index)
router.get('/:id', ensureLoggedIn, customersCtrl.show)
router.get('/no-ref/:id', ensureLoggedIn, customersCtrl.getNotAssociated)

router.post('/create', ensureLoggedIn, customersCtrl.create)

router.put('/:id', ensureLoggedIn, customersCtrl.update)
router.put('/assoc/:id', ensureLoggedIn, customersCtrl.associateBroker)
router.put('/associate-with/:id', ensureLoggedIn, customersCtrl.associateWithBroker)
router.put('/remove/:id', ensureLoggedIn, customersCtrl.removeBroker)
router.put('/remove-from/:id', ensureLoggedIn, customersCtrl.removeFromBroker)

router.delete('/:id/delete', ensureLoggedIn, customersCtrl.delete)


module.exports = router;
