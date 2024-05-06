const express = require('express');
const router = express.Router();
const workspacesCtrl = require('../../controllers/api/workspaces');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// GET /api/workspaces
router.get('/', ensureLoggedIn, workspacesCtrl.index);
router.get('/user', ensureLoggedIn, workspacesCtrl.userIndex)
router.get('/:id', ensureLoggedIn, workspacesCtrl.show)
router.post('/create', ensureLoggedIn, workspacesCtrl.create)
router.put('/:id', ensureLoggedIn, workspacesCtrl.update)

module.exports = router;
