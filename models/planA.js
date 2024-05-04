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
        enum: ['Legacy', 'Millenium']
    },
    benefitCategories: {
        enum: ['commuter', 'fitness', 'leisure', 'medical']
    },
    reminders: {
        enum: ['email', 'paper', 'none']
    },
    expert: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    customer: {
        type: Schema.Types.ObjectId, 
        ref: 'Customer'
    }
},
{
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});

  
  module.exports = mongoose.model('PlanA', planASchema);