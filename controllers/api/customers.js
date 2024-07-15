const mongoose = require('mongoose');
const Customer = require('../../models/customer')
const Broker = require('../../models/broker')
const Workspace = require('../../models/workspace')

module.exports = {
    create,
    createWithUser,
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
        const workspace = await Workspace.find({ 'customURL': req.params.wsurl })
        req.body.workspace = workspace[0]._id
        const customer = await Customer.create(req.body)
        res.json(customer)
    } catch (err) {
        res.status(400).json('Could not create customer.')
    }
}

async function createWithUser(workspace) {
    const data = {
        name: 'Pizzazz Pizza Parlor (example customer)',
        website: 'pizzazz.ppp',
        phone: '1231231234',
        tax: '123456789',
        address: '456 Ocean Blvd, San Diego, CA 92999',
        joinedDay: 1,
        joinedMonth: 1,
        joinedYear: 2024,
        renewal: 'January',
        commission1: 2.75,
        commission2: 5,
        workspace: workspace,
    }
    const customer = await Customer.create(data)
    return customer
}

async function index(req, res) {
    const ITEMS_PER_PAGE = 10
    const page = req.query.page || 1
    try {
        const workspace = await Workspace.findOne({ 'customURL': req.params.wsurl })
        const query = { 'workspace': workspace }
        const skip = (page - 1) * ITEMS_PER_PAGE
        const total = await Customer.find(query)
        const count = total.length
        const customers = await Customer.find(query).sort('name').skip(skip).limit(ITEMS_PER_PAGE).populate('accountManager')
        const pageCount = Math.ceil(count / ITEMS_PER_PAGE)
        console.log('=======================CUSTOMERS', customers)
        res.json({
            pagination: {
                count,
                pageCount
            },
            customers
        })
    } catch (error) {
        console.error(error)
        res.status(400).json('Could not retrieve customers.')
    }

}

async function show(req, res) {
    try {
        const customer = await Customer.findById(req.params.id).populate('broker').populate('accountManager')
        res.json(customer)
    } catch {
        res.status(400).json('Could not retrieve customer.')
    }
}

async function getNotAssociated(req, res) {
    try {
        const id = req.params.id
        const broker = await Broker.findById(id)
        const customers = await Customer.find({ broker: { $ne: id }, workspace: broker.workspace })
        res.json(customers)
    } catch {
        res.status(400).json('Could not retrieve potential customers.')
    }
}

async function update(req, res) {
    const customer = await Customer.findById(req.params.id).populate('broker')
    try {
        for (const field in req.body) {
            if (req.body[field] === '') {
                req.body[field] = null
            }
            customer[field] = req.body[field]
        }
        console.log('Req Body AM: ', req.body.accountManager)
        console.log('Customer AM: ', customer.accountManager)
        await customer.save()
        await customer.populate('accountManager')
        // console.log(customer)
        res.json(customer)
    } catch {
        res.status(400).json('Could not update customer.')
    }
}
// console.log('========', customer[field], '++++', req.body[field])
// if (req.body.accountManager === '') {
//     customer.accountManager = null
//     await customer.save()
//     res.json(customer)
// } else {
//     await customer.save()
//     await customer.populate('accountManager')
//     res.json(customer)
// }

async function associateBroker(req, res) {
    const customer = await Customer.findById(req.params.id)
    const broker = await Broker.findById(req.body.broker)
    try {
        customer.broker.push(broker)
        await customer.save()
        await customer.populate('broker')
        res.json(customer)
    } catch {
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
    } catch {
        res.status(400).json('Could not add customer to broker.')
    }
}

async function removeBroker(req, res) {
    const customer = await Customer.findById(req.params.id).populate('broker')
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