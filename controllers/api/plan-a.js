const PlanA = require('../../models/planA')
const Customer = require('../../models/customer')

module.exports = {
    create,
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

async function index(req, res) {
    const plans = await PlanA.find({customer: req.params.customerId })
    res.json(plans)
}

async function update(req, res) {
    const plan = await PlanA.findById(req.params.id)
    try {
        plan.name = req.body.name
        plan.expert = req.body.expert
        plan.amount = req.body.amount
        plan.system = req.body.system
        plan.benefitCategories = req.body.benefitCategories
        plan.reminders = req.body.reminders
        await plan.save()
        res.json(plan)
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