const {Schema,model} = require('mongoose')

const MentorSchema = new Schema({
    name: String,
    specialization: String,
    phone_no: Number,
    email: String
})

const Mentor =  model('mentor',MentorSchema)
module.exports = Mentor;