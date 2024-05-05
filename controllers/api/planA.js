const PlanA = require('../../models/planA')
const Customer = require('../../models/customer')

module.exports = {
    create,
    getPlans,
}

async function create(req, res) {
    try {
        const planA = await PlanA.create(req.body)
        res.json(planA)
    } catch {
        res.status(400).json('Could not create plan.')
    }
}

async function getPlans(req, res) {
    const plansA = await PlanA.find({customer: req.params.id })
    res.json(plansA)
}