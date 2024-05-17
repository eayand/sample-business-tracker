const Workspace = require('../../models/workspace')
const User = require('../../models/user')

module.exports = {
    create,
    index, 
    userIndex,
    show, 
    update,
}

async function create(req, res) {
    req.body.createdBy = req.user._id
    try {
        const workspace = await Workspace.create(req.body)
        const user = await User.findById(req.user._id)
        user.workspace.push(workspace)
        await user.save()
        res.json(workspace)
    } catch {
        res.status(400).json('Could not create workspace. Please check: (1) Custom URL contains only letters and numbers. (2) Name and URL are 50 characters max; description is 100 characters max.')
    }
}

async function index(req, res) {
    const user = await User.findById(req.user._id)
    const workspaces = await Workspace.find( { _id: { $in: user.workspace }} ).sort('createdAt').exec();
    res.json(workspaces);
}

async function userIndex(req, res) {
    const workspaces = await Workspace.find({'_id': req.user.workspace }).sort('name').exec();
    res.json(workspaces);
}

async function show(req, res) {
    const workspace = await Workspace.findById(req.params.id)
    res.json(workspace)
}

async function update(req, res) {
    const workspace = await Workspace.findById(req.params.id)
    try {
        workspace.name = req.body.name
        workspace.customURL = req.body.customURL
        workspace.description = req.body.description
        await workspace.save()
        res.json(workspace)
    } catch {
        res.status(400).json('Could not update workspace.')
    }
}