const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 6

const userSchema = new Schema({
    firstName: {
        type: String, 
        trim: true,
        minLength: 1,
        maxLength: 100,
        required: true,
    },
    lastName: {
        type: String, 
        trim: true,
        minLength: 1,
        maxLength: 100,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        minLength: 1,
        maxLength: 100,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 100,
        required: true
    }, 
    workspace: [{
        type: Schema.Types.ObjectId, 
        ref: 'Workspace'
    }],
    role: {
        type: String,
        enum: ['admin', 'employee', 'broker', 'readonly-employee', 'readonly-broker'], 
        default: 'readonly-employee',
        required: true,
    },
},
{
    timestamps: true,
    // Even though it's hashed - don't serialize the password
    toJSON: {
        transform: function(doc, ret) {
        delete ret.password;
        return ret;
        },
        virtuals: true
    }
});


userSchema.virtual('name').get(function () {
    return this.firstName.concat(' ', this.lastName)
})

userSchema.virtual('initials').get(function () {
    return this.firstName.charAt().concat('', this.lastName.charAt())
})

userSchema.virtual('fCreatedAt').get(function () {
    const date = new Date(this.createdAt)
    return date.toLocaleString()
})

userSchema.pre('save', async function(next) {
    // 'this' is the user doc
    if (!this.isModified('password')) return next();
    // update the password with the computed hash
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    return next();
});



module.exports = mongoose.model('User', userSchema);