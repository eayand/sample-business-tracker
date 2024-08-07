const express = require('express');
const router = express.Router();
const planBCtrl = require('../../controllers/api/plan-b');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/:wsurl/:customerId', ensureLoggedIn, planBCtrl.index)

router.post('/:wsurl/create', ensureLoggedIn, planBCtrl.create)

router.put('/:wsurl/update/:id', ensureLoggedIn, planBCtrl.update)

router.delete('/:wsurl/delete/:id', ensureLoggedIn, planBCtrl.delete)

module.exports = router