const Customer = require('../../models/customer')

module.exports = {
    create,
    index, 
    show,
}

async function create(req, res) {
    try {
        const customer = await Customer.create(req.body)
        res.json(customer)
    } catch {

    }
}

async function index(req, res) {
    const customers = await Customer.find({'workspace': req.user.workspace[0]}).sort('name').exec();
    res.json(customers);
}


async function show(req, res) {
    const customer = await Customer.findById(req.params.id);
    res.json(customer);
}