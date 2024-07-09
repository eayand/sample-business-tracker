const PlanB = require('../../models/planB')
const Customer = require('../../models/customer')

module.exports = {
    create,
    createWithUser,
    index,
    update,
    delete: deletePlan,
}

async function create(req, res) {
    try {
        const plan = await PlanB.create(req.body)
        res.json(plan)
    } catch {
        res.status(400).json('Could not create plan.')
    }
}

async function createWithUser(customer) {
    const data = {
        name: 'HFSA (example plan)',
        amount: 550,
        system: 'Legacy',
        autoRenew: true,
        customer: customer,
    }
    const planB = await PlanB.create(data)
    return planB
}

async function index(req, res) {
    const plans = await PlanB.find({customer: req.params.customerId })
    res.json(plans)
}

async function update(req, res) {
    const plan = await PlanB.findById(req.params.id)
    try {
        plan.name = req.body.name,
        plan.expert = req.body.expert,
        plan.amount = parseInt(req.body.amount),
        plan.system = req.body.system,
        plan.autoRenew = req.body.autoRenew,
        await plan.save()
        res.json(plan)
    } catch(error) {
        console.log(error)
        res.status(400).json('Could not update plan.')
    }
}

async function deletePlan(req, res) {
    const plan = await PlanB.findById(req.params.id)
    try {
        await plan.deleteOne()
        res.json('Deleted')
    } catch {
        res.status(400).json('Could not delete plan.')
    }
}