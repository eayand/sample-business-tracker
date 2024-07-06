const mongoose = require('mongoose')
const Schema = mongoose.Schema
const universal = require('./universal')
const bad = universal.bad
const Customer = require('./customer')


const brokerSchema = new Schema({
    name: {
        type: String, 
        trim: true,
        maxLength: 100,
        required: true,
    },
    website: {
        type: String,
        trim: true,
        lowercase: true,
        maxLength: 100,
    },
    phone: {
        type: String,
        trim: true,
        maxLength: 15,
    }, 
    tax: {
        type: String,
        trim: true,
        maxLength: 9,
    },
    address: {
        type: String,
        trim: true,
        maxLength: 100,
    },
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

brokerSchema.pre('deleteOne', {document: true, query: false}, async function() {
    const brokerId = this._id
    try {
        await Customer.updateMany(
            {broker: brokerId},
            { $pull: {broker: brokerId} },
        )
    } catch {
        console.log('Could not update customers before deleting broker.')
    }
})

brokerSchema.virtual('fPhone').get(function () {
    if (!this.phone) {
        return
    } else if (this.phone.length === 10) {
        const area = this.phone.slice(0, 3)
        const three = this.phone.slice(3, 6)
        const four = this.phone.slice(6)
        return `+1 (${area}) ${three}-${four}`

    } else { 
        return `${this.phone} ${bad}`
    }
})

brokerSchema.virtual('fTax').get(function () {
    if (!this.tax) {
        return
    } else if (this.tax.length === 9) {
        const two = this.tax.slice(0, 2)
        const seven = this.tax.slice(2)
        return `${two}-${seven}`
    } else { 
        return `${this.tax} ${bad}`
    }
})

module.exports = mongoose.model('Broker', brokerSchema);