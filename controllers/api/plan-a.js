const PlanA = require('../../models/planA')
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
        const plan = await PlanA.create(req.body)
        res.json(plan)
    } catch {
        res.status(400).json('Could not create plan.')
    }
}

async function createWithUser(customer, workspace) {
    const data = {
        name: 'Kaiser HMO (example plan)',
        amount: 3000,
        system: 'Legacy',
        benefitCategories: ['medical'],
        reminders: ['email', 'paper'],
        customer: customer,
        workspace: workspace,
    }
    const planA = await PlanA.create(data)
    return planA
}

async function index(req, res) {
    const plans = await PlanA.find({customer: req.params.customerId }).populate('expert', 'firstName lastName')
    res.json(plans)
}

async function update(req, res) {
    const planA = await PlanA.findById(req.params.id)
    try {
        for (const field in req.body) {
            if (req.body[field] === '') {
                req.body[field] = null
            }
            planA[field] = req.body[field]
        }
        await planA.save()
        await planA.populate('expert', 'firstName lastName')
        res.json(planA)
    } catch {
        res.status(400).json('Could not update plan.')
    }
}

async function deletePlan(req, res) {
    const plan = await PlanA.findById(req.params.id)
    try {
        await plan.deleteOne()
        res.json('Deleted')
    } catch {
        res.status(400).json('Could not delete plan.')
    }
}