const mongoose = require('mongoose')
const Schema = mongoose.Schema
const universal = require('./universal')
const bad = universal.bad

const planASchema = new Schema({
    name: {
        type: String, 
        trim: true,
        maxLength: 100,
        required: true,
    },
    amount: {
        type: Number,
        max: 100000,
    },
    system: {
        type: String,
        enum: ['', 'Legacy', 'Millenium']
    },
    benefitCategories: {
        type: [String],
        enum: ['', 'commuter', 'fitness', 'leisure', 'medical']
    },
    reminders: {
        type: [String],
        enum: ['', 'email', 'paper', 'none']
    },
    expert: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    customer: {
        type: Schema.Types.ObjectId, 
        ref: 'Customer', 
        required: true,
    }
},
{
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});

planASchema.virtual('type').get(function () {
    return 'Type A'
})

planASchema.virtual('fAmount').get(function () {
    if (this.amount) {
        const number = this.amount.toFixed(2)
        return `$${number}`
    } else {return}
})

//Boolean benefitCategories ////////////////////////////////
planASchema.virtual('commuterBool').get(function () {
    return this.benefitCategories.includes('commuter')
})

planASchema.virtual('fitnessBool').get(function () {
    return this.benefitCategories.includes('fitness')
})

planASchema.virtual('leisureBool').get(function () {
    return this.benefitCategories.includes('leisure')
})

planASchema.virtual('medicalBool').get(function () {
    return this.benefitCategories.includes('medical')
})

//Boolean reminders //////////////////////////////////////
planASchema.virtual('emailBool').get(function () {
    return this.reminders.includes('email')
})

planASchema.virtual('paperBool').get(function () {
    return this.reminders.includes('paper')
})

planASchema.virtual('noneBool').get(function () {
    return this.reminders.includes('none')
})

module.exports = mongoose.model('PlanA', planASchema);