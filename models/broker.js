const mongoose = require('mongoose');
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
  

// brokerSchema.virtual('phoneNumber').get(function () {
//     const numeric = this.phone.replace(/\D/g,'')
//     const phoneNumber = numeric
//     return phoneNumber
// })

  
  module.exports = mongoose.model('Broker', brokerSchema);