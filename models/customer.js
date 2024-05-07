const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name: {
        type: String, 
        trim: true,
        required: true,
    },
    website: {
        type: String,
        trim: true,
        lowercase: true,
    },
    phone: {
        type: String,
        maxLength: 10,
        minLength: 10,
    }, 
    tax: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    joined: Date,
    renewal: {
        type: String,
        enum: ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    },
    commission1: Number,
    commission2: Number,
    accountManager: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    broker: [{
        type: Schema.Types.ObjectId,
        ref: 'Broker'
    }],
    workspace: {
        type: Schema.Types.ObjectId, 
        ref: 'Workspace',
        required: true,
    }
},
{
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});

customerSchema.virtual('formatPhone').get(function () {
    if (this.phone) {
        const area = this.phone.slice(0, 3)
        const three = this.phone.slice(3, 6)
        const four = this.phone.slice(6)
        return `+1 (${area}) ${three}-${four}`
    } else {return}
})

customerSchema.virtual('fCommission1').get(function () {
    if (this.commission1) {
    const number = this.commission1.toFixed(2)
    return `$${number}`
    } else {return}
})

customerSchema.virtual('fCommission2').get(function () {
    if (this.commission2) {
    const number = this.commission2.toFixed(2)
    return `$${number}`
    } else {return}
})

module.exports = mongoose.model('Customer', customerSchema);