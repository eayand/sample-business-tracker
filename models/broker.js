const mongoose = require('mongoose');
const Customer = require('./customer')
const Schema = mongoose.Schema;

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
        maxLength: 100,
        lowercase: true,
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
    if (this.phone) {
        const area = this.phone.slice(0, 3)
        const three = this.phone.slice(3, 6)
        const four = this.phone.slice(6)
        return `+1 (${area}) ${three}-${four}`
    } else {return}
})

module.exports = mongoose.model('Broker', brokerSchema);