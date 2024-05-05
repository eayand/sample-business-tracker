const express = require('express');
const router = express.Router();
const planACtrl = require('../../controllers/api/planA');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/:id', ensureLoggedIn, planACtrl.getPlans)

router.post('/:id/create', ensureLoggedIn, planACtrl.create)

router.put('/update/:id', ensureLoggedIn, planACtrl.update)

router.delete('/delete/:id', ensureLoggedIn, planACtrl.delete)

module.exports = router