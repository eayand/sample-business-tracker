const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const Workspace = require('../../models/workspace')
const bcrypt = require('bcrypt');

module.exports = {
    create,
    login,
    checkToken,
    index,
    indexAvailable,
    addWorkspace,
    removeWorkspace
}

async function create(req, res) {
    try {
      // Add the user to the database
        const user = await User.create(req.body);
      // token will be a string
        const token = createJWT(user);
      // Yes, we can use res.json to send back just a string
      // The client code needs to take this into consideration
        res.json(token);
    } catch (err) {
      // Client will check for non-2xx status code 
      // 400 = Bad Request
        res.status(400).json(err);
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

async function indexAvailable(req, res) {
    const id = req.params.workspace
    try {
        const users = await User.find( { workspace: { $ne: id }  } )
        res.json(users)
    } catch {
        res.status(400).json('Could not find users.')
    }
}

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
