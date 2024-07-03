const mongoose = require('mongoose')
const Schema = mongoose.Schema
const universal = require('./universal')
const bad = universal.bad
const months = universal.months

const customerSchema = new Schema({
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
    joinedDay: {
        type: Number,
        max: 31,
        min: 1,
    },
    joinedMonth: {
        type: Number,
        max: 12,
        min: 1,
    },
    joinedYear: {
        type: Number,
        max: 2050,
        min: 1970,
    },
    renewal: {
        type: String,
        enum: ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    },
    commission1: {
        type: Number,
        max: 100,
    },
    commission2: {
        type: Number,
        max: 100,
    },
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
    },
},
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        }
    })

customerSchema.virtual('fPhone').get(function () {
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

customerSchema.virtual('fTax').get(function () {
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

customerSchema.virtual('fJoined').get(function () {
    const day = this.joinedDay || '??'
    const month = this.joinedMonth || '??'
    const year = this.joinedYear || '????'
    return `${month} / ${day} / ${year}`
})

customerSchema.virtual('fCommission1').get(function () {
    if (this.commission1) {
        const number = this.commission1.toFixed(2)
        return `$${number}`
    } else { return }
})

customerSchema.virtual('fCommission2').get(function () {
    if (this.commission2) {
        const number = this.commission2.toFixed(2)
        return `$${number}`
    } else { return }
})

module.exports = mongoose.model('Customer', customerSchema);