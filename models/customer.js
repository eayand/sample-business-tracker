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
        enum: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
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

  
  module.exports = mongoose.model('Customer', customerSchema);