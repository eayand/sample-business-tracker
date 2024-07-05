const express = require('express')
const router = express.Router()
const usersCtrl = require('../../controllers/api/users')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

// All routes in here begin with /api/users

// GET api/users/check-token
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken)

router.get('/admin-page', usersCtrl.indexAll)
router.get('/:workspace', usersCtrl.index)
router.get('/index-not-in-this-workspace/:workspace', usersCtrl.indexNotInThisWorkspace)
router.get('/:wsurl/index-not-this-customers-am/:id', ensureLoggedIn, usersCtrl.indexNotThisCustomersAM)

// POST /api/users
router.post('/', usersCtrl.create)
router.post('/login', usersCtrl.login)
router.post('/add-workspace', usersCtrl.addWorkspace)
router.post('/remove-workspace/:id', usersCtrl.removeWorkspace)

module.exports = router