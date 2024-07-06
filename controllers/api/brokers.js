const mongoose = require('mongoose');
const Broker = require('../../models/broker')
const Customer = require('../../models/customer')
const Workspace = require('../../models/workspace')

module.exports = {
    create,
    index, 
    getNotAssociated,
    show,
    update,
    delete: deleteBroker,
    getCustomers,
}

async function create(req, res) {
    try {
        const workspace = await Workspace.find({'customURL': req.params.wsurl})
        req.body.workspace = workspace[0]._id
        const broker = await Broker.create(req.body)
        res.json(broker)
    } catch {
        res.status(400).json('Could not create broker.')
    }
}

async function index(req, res) {
    const ITEMS_PER_PAGE = 10
    const page = req.query.page || 1
    try {
        const workspace = await Workspace.findOne({'customURL': req.params.wsurl})
        const query = { 'workspace': workspace }
        const skip = (page - 1) * ITEMS_PER_PAGE
        const total = await Broker.find(query)
        const count = total.length
        const brokers = await Broker.find(query).sort('name').skip(skip).limit(ITEMS_PER_PAGE)
        const pageCount = Math.ceil(count / ITEMS_PER_PAGE)
        res.json({
            pagination: {
                count,
                pageCount
            },
            brokers
        })
    } catch (error) {
        console.error(error)
        res.status(400).json('Could not retrieve brokers.')
    }
}

async function show(req, res) {
    try {
        const broker = await Broker.findById(req.params.id);
        res.json(broker);
    } catch {
        res.status(400).json('Could not retrieve broker.')
    }
}

async function getNotAssociated(req, res) {
    try {
        const customer = await Customer.findById(req.params.id)
        const brokers = await Broker.find({ workspace: customer.workspace, _id: {$nin: customer.broker}}).sort('name')
        res.json(brokers)
    } catch {
        res.status(400).json('Could not retrieve potential brokers.')
    }
}

async function update(req, res) {
    const broker = await Broker.findById(req.params.id)
    try {
        for (const field in req.body) {
            broker[field] = req.body[field]
        }
        await broker.save()
        res.json(broker)
    } catch {
        res.status(400).json('Could not update broker.')
    }
}

async function deleteBroker(req, res) {
    const broker = await Broker.findById(req.params.id)
    try {
        await broker.deleteOne()
        res.json('Deleted')
    } catch {
        res.status(400).json('Could not delete broker.')
    }
}

async function getCustomers(req, res) {
    try {
        const customers = await Customer.find({broker: new mongoose.Types.ObjectId(req.params.id)})
        res.json(customers)
    } catch {
        res.status(400).json('Could not retrieve this customers for this broker.')
    }
    }