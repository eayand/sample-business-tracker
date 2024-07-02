const mongoose = require('mongoose');
const Workspace = require('./workspace')
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
        trim: true,
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
        return `${this.phone} *!!`
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
        return `${this.tax} *!!`
    }
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

// customerSchema.virtual('fJoined').get(function () {
//     if (this.joined) {
//         const date = new Date(this.joined).toISOString()
//         return date
//     } else {return}
// })

customerSchema.virtual('fJoined').get(function () {
    const date = new Date(this.joined)
    const offset = date.getTimezoneOffset()
    const localDate = new Date(this.joined + offset * 60000)
    return localDate.toLocaleDateString()
})

module.exports = mongoose.model('Customer', customerSchema);