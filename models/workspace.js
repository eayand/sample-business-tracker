const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workspaceSchema = new Schema({
    name: {
        type: String, 
        trim: true,
        required: true,
    },
    description: {
        type: String, 
        trim: true,
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

