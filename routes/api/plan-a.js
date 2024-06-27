const express = require('express');
const router = express.Router();
const planACtrl = require('../../controllers/api/plan-a');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/:wsurl/:customerId', ensureLoggedIn, planACtrl.index)

router.post('/:wsurl/create', ensureLoggedIn, planACtrl.create)

router.put('/:wsurl/update/:id', ensureLoggedIn, planACtrl.update)

router.delete('/:wsurl/delete/:id', ensureLoggedIn, planACtrl.delete)

module.exports = router