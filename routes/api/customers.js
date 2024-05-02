const express = require('express');
const router = express.Router();
const customersCtrl = require('../../controllers/api/customers');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// GET /api/customers
router.get('/', ensureLoggedIn, customersCtrl.index)
router.get('/:id', ensureLoggedIn, customersCtrl.show)

router.post('/create', ensureLoggedIn, customersCtrl.create)

router.put('/:id', ensureLoggedIn, customersCtrl.update)


module.exports = router;
