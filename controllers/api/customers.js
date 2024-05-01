const Customer = require('../../models/customer')

module.exports = {
    create,
    index, 
}

async function create(req, res) {
    
}

async function index(req, res) {
    const customers = await Customer.find({'workspace': req.params.idws }).sort('name').exec();
    res.json(customers);
  }