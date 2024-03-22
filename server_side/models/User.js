const {Schema,model} = require('mongoose');

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    phone_no: Number,
    payment: Number,
    duration: Number,
    mentor: String,
    startDate: { type: Date, default: Date.now }, 
    accessExpiresAt: Date,
    daysRemaining: { type: Number, default: 30 },
    status: { type: String, default: 'progressing' }
});

const User = model('user', userSchema);

module.exports = User;
