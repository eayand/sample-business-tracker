const mongoose = require('mongoose');
const Customer = require('./customer')
const Schema = mongoose.Schema;

const brokerSchema = new Schema({
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

// brokerSchema.pre('deleteOne', function(next) {
//     this.model('Customer').update(
//         {},
//         { '$pull': {'broker': this._id} }, 
//         {'multi': true},
//         next
//     )
// })
// Put this back in when formatting is determined.

brokerSchema.virtual('formatPhone').get(function () {
    if (this.phone) {
        const area = this.phone.slice(0, 3)
        const three = this.phone.slice(3, 6)
        const four = this.phone.slice(6)
        return `+1 (${area}) ${three}-${four}`
    } else {return}
})

module.exports = mongoose.model('Broker', brokerSchema);