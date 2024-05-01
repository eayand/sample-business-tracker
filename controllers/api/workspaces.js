const Workspace = require('../../models/workspace')
const User = require('../../models/user')

module.exports = {
    create,
    index, 
    show
}

async function create(req, res) {
    req.body.createdBy = req.user._id
    try {
        const workspace = await Workspace.create(req.body)
        res.json(workspace)
    } catch {
        res.status(400).json('Could not create workspace.')
    }
}

async function index(req, res) {
    const workspaces = await Workspace.find({'createdBy': req.user._id }).sort('name').exec();
    res.json(workspaces);
  }

async function show(req, res) {
    const workspace = await Workspace.findById(req.params.id)
    res.json(workspace)
}