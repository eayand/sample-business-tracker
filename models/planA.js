const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planASchema = new Schema({
    name: {
        type: String, 
        trim: true,
        required: true,
    },
    amount: Number,
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


module.exports = mongoose.model('PlanA', planASchema);