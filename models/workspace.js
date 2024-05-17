const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workspaceSchema = new Schema({
    name: {
        type: String, 
        trim: true,
        maxLength: [50, '50 characters max'],
        required: true,
    },
    customURL: {
        type: String,
        trim: true,
        maxLength: 50,
        lowercase: true,
        match: [/^[A-Za-z0-9]*$/, 'letters and numbers only'],
    },
    description: {
        type: String, 
        trim: true,
        maxLength: 100,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
},
{
    timestamps: true,
});
    
module.exports = mongoose.model('Workspace', workspaceSchema);

