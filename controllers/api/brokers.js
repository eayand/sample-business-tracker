const Broker = require('../../models/broker')

module.exports = {
    create,
    index, 
    show,
    update,
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

async function update(req, res) {
    const broker = await Broker.findById(req.params.id)
    try {
        broker.website = req.body.website
        broker.phone = req.body.phone
        broker.tax = req.body.tax
        broker.address = req.body.address
        broker.save()
        res.json(customer)
    } catch {
        res.status(400).json('Could not update broker.')
    }
}