const mongoose = require('mongoose');
const Broker = require('../../models/broker')
const Customer = require('../../models/customer')

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
        const broker = await Broker.create(req.body)
        res.json(broker)
    } catch {
        res.status(400).json('Could not create broker.')
    }
}

async function index(req, res) {
    const brokers = await Broker.find({'workspace': req.user.workspace[0]}).sort('name').exec();
    res.json(brokers);
}

async function show(req, res) {
    const broker = await Broker.findById(req.params.id);
    res.json(broker);
}

async function getNotAssociated(req, res) {
    const customer = await Customer.findById(req.params.id)
    const brokers = await Broker.find({ workspace: customer.workspace, _id: {$nin: customer.broker}}).sort('name')
    res.json(brokers)
}

async function update(req, res) {
    const broker = await Broker.findById(req.params.id)
    try {
        broker.name = req.body.name
        broker.website = req.body.website
        broker.phone = req.body.phone
        broker.tax = req.body.tax
        broker.address = req.body.address
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
    const customers = await Customer.find({broker: new mongoose.Types.ObjectId(req.params.id)})
    res.json(customers)
}