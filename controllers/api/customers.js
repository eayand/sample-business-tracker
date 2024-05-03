const Customer = require('../../models/customer')

module.exports = {
    create,
    index, 
    show,
    update,
    delete: deleteCustomer,
}

async function create(req, res) {
    try {
        const customer = await Customer.create(req.body)
        res.json(customer)
    } catch {
        res.status(400).json('Could not create customer.')
    }
}

async function index(req, res) {
    const customers = await Customer.find({'workspace': req.user.workspace[0]}).sort('name').exec()
    res.json(customers)
}

async function show(req, res) {
    const customer = await Customer.findById(req.params.id).populate('broker')
    res.json(customer)
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
        customer.broker = customer.broker.push(req.body.broker)
        customer.save()
        res.json(customer)
    } catch {
        res.status(400).json('Could not update customer.')
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