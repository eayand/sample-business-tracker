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

async function createWithUser(customer, workspace) {
    const data = {
        name: 'HFSA (example plan)',
        amount: 550,
        system: 'Legacy',
        autoRenew: true,
        customer: customer,
        workspace: workspace,
    }
    const planB = await PlanB.create(data)
    return planB
}

async function index(req, res) {
    const plans = await PlanB.find({customer: req.params.customerId }).populate('expert', 'firstName lastName')
    res.json(plans)
}

async function update(req, res) {
    const planB = await PlanB.findById(req.params.id)
    try {
        for (const field in req.body) {
            if (req.body[field] === '') {
                req.body[field] = null
            }
            planB[field] = req.body[field]
        }
        await planB.save()
        await planB.populate('expert', 'firstName lastName')
        console.log('=======================', planB)
        res.json(planB)
    } catch {
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