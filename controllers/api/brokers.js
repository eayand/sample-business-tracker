const Broker = require('../../models/broker')

module.exports = {
    create,
    index, 
    show,
}

async function create(req, res) {
    try {
        const broker = await Broker.create(req.body)
        res.json(broker)
    } catch {
        res.status(400).json('Could not save broker.')
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