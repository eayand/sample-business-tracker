const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const Workspace = require('../../models/workspace')
const workspaces = require('../../controllers/api/workspaces')
const Customer = require('../../models/customer')
const bcrypt = require('bcrypt');

module.exports = {
    create,
    createViaAdmin,
    login,
    checkToken,
    index,
    indexNotInThisWorkspace,
    indexNotThisCustomersAM,
    indexAll,
    addWorkspace,
    removeWorkspace
}

async function create(req, res) {
    try {
        const user = await User.create(req.body)
        const token = createJWT(user)
        const workspace = await workspaces.createWithUser(user)
        user.workspace.push(workspace)
        await user.save()
        res.json(token)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function createViaAdmin(req, res) {
    try {
        console.log('create via admin')
        req.body.createdBy = req.user._id
        const user = await User.create(req.body)
        console.log(user)
        res.json(user)
    } catch {
        res.status(400).json('Could not create user.')
    }
}

async function login(req, res) {
    try {
        const user = await User.findOne({email: req.body.email})
        if (!user) throw new Error()
        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) throw new Error()
        const token = createJWT(user)
        res.json(token)
    } catch (err) {
        res.status(400).json(err)
    }
}

function checkToken(req, res) {
    console.log('req.user', req.user)
    res.json(req.exp)
}

async function index(req, res) {
    try {
        const users = await User.find({workspace: req.params.workspace}).sort('lastName').exec()
        res.json(users)
    } catch {
        res.status(400).json('Could not find users.')
    }
}

async function indexNotInThisWorkspace(req, res) {
    const id = req.params.workspace
    try {
        const users = await User.find( { workspace: { $ne: id }  } )
        res.json(users)
    } catch {
        res.status(400).json('Could not find users.')
    }
}

async function indexNotThisCustomersAM(req, res) {
    try {
        const customer = await Customer.findById(req.params.id)
        const users = await User.find({workspace: customer.workspace, _id: {$nin: customer.accountManager}}).sort('lastName')
        res.json(users)
    } catch {
        res.status(400).json('Could not retrieve potential account managers.')
    }
}

async function indexAll(req, res) {
    try {
        const user = await User.findById(req.user.id)
        if (user.workspace.length > 0) {
            const users = await User.find( { workspace: { $in: user.workspace } } ).populate('workspace').exec()
            const userSet = new Set()
            users.forEach((user) => userSet.add(user))
            const adminPageUsers = Array.from(userSet)
            res.json(adminPageUsers)     
        } else {
            res.json(user)
        }
    } catch {
        res.status(400).json('Could not find all users for your workspaces.')
    }
}

// async function index(req, res) {
//     const user = await User.findById(req.user._id)
//     const workspaces = await Workspace.find( { _id: { $in: user.workspace }} ).sort('createdAt').exec();
//     res.json(workspaces);
// }

async function addWorkspace(req, res) {
    const user = await User.findById(req.body.userId)
    const newWorkspace = await Workspace.findById(req.body.id)
    user.workspace.push(newWorkspace)
    try {
        await user.save()
        res.json(user)
    } catch {
        res.status(400).json('Could not add to workspace.')
    }
}

async function removeWorkspace(req, res) {
    const user = await User.findById(req.body.userId)
    const workspace = await Workspace.findById(req.params.id)
    const workspaceRef = user.workspace.indexOf(workspace._id)
    try {
        user.workspace.splice(workspaceRef, 1)
        await user.save()
        res.json(user)
    } catch {
        res.status(400).json('Could not remove from workspace.')
    }
}


//   HELPERS
function createJWT(user) {
    return jwt.sign(
        // data payload
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    );
}
