const mongoose = require('mongoose');
const Customer = require('../../models/customer')
const Broker = require('../../models/broker')
const Workspace = require('../../models/workspace')

module.exports = {
    create,
    index, 
    show,
    getNotAssociated,
    update,
    associateBroker,
    associateWithBroker,
    removeBroker,
    removeFromBroker,
    delete: deleteCustomer,
}

async function create(req, res) {
    try {
        const workspace = await Workspace.find({'customURL': req.params.wsurl})
        req.body.workspace = workspace[0]._id
        const customer = await Customer.create(req.body)
        res.json(customer)
    } catch(err) {
        res.status(400).json('Could not create customer.')
    }
}

async function index(req, res) {
    console.log('=========================', req.params.wsurl)
    const workspace = await Workspace.findOne({'customURL': req.params.wsurl})
    const customers = await Customer.find({'workspace': workspace}).sort('name').exec()
    res.json(customers)
}

async function show(req, res) {
    const customer = await Customer.findById(req.params.id).populate('broker')
    res.json(customer)
}

async function getNotAssociated(req, res) {
    const id = req.params.id
    const broker = await Broker.findById(id)
    const customers = await Customer.find( { broker: { $ne: id }, workspace: broker.workspace  } )
    res.json(customers)
}

async function update(req, res) {
    const customer = await Customer.findById(req.params.id)
    try {
        customer.website = req.body.website
        customer.phone = req.body.phone
        customer.tax = req.body.tax
        customer.address = req.body.address
        customer.joined = req.body.joined
        customer.renewal  = req.body.renewal
        customer.commission1 = req.body.commission1
        customer.commission2 = req.body.commission2
        customer.accountManager = req.body.accountManager
        await customer.save()
        res.json(customer)
    } catch {
        res.status(400).json('Could not update customer.')
    }
}

async function associateBroker(req, res) {
    const customer = await Customer.findById(req.params.id)
    const broker = await Broker.findById(req.body.broker)
    try {
        customer.broker.push(broker)
        await customer.save()
        await customer.populate('broker')
        res.json(customer)
    } catch(error) {
        console.log(error)
        res.status(400).json('Could not add broker to customer.')
    }
}

async function associateWithBroker(req, res) {
    const customer = await Customer.findById(req.body.customer)
    const broker = await Broker.findById(req.params.id)
    try {
        customer.broker.push(broker)
        await customer.save()
        res.json(customer)
    } catch(error) {
        console.log(error)
        res.status(400).json('Could not add customer to broker.')
    }
}

async function removeBroker(req, res) {
    const customer = await Customer.findById(req.params.id)
    const brokerRef = customer.broker.indexOf(req.body._id)
    try {
        customer.broker.splice(brokerRef, 1)
        await customer.save()
        res.json(customer)
    } catch {
        res.status(400).json('Could not remove broker from customer.')
    }
}

async function removeFromBroker(req, res) {
    const customer = await Customer.findById(req.body._id)
    const brokerRef = customer.broker.indexOf(req.params.id)
    try {
        customer.broker.splice(brokerRef, 1)
        await customer.save()
        res.json(customer)
    } catch {
        res.status(400).json('Could not remove customer from broker.')
    }
}

async function deleteCustomer(req, res) {
    const customer = await Customer.findById(req.params.id)
    try {
        await customer.deleteOne()
        res.json('Deleted')
    } catch {
        res.status(400).json('Could not delete customer.')
    }
}