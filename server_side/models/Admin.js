const {Schema,model} = require('mongoose');

const adminSchema = new Schema({
    email: String,
    password: String
});

const Admin = model('admin', adminSchema);

module.exports = Admin;
