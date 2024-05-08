const express = require('express');
const router = express.Router();
const planACtrl = require('../../controllers/api/plan-a');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/:customerId', ensureLoggedIn, planACtrl.index)

router.post('/create', ensureLoggedIn, planACtrl.create)

router.put('/update/:id', ensureLoggedIn, planACtrl.update)

router.delete('/delete/:id', ensureLoggedIn, planACtrl.delete)

module.exports = router