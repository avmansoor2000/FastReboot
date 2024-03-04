const {Schema,model} = require('mongoose')

const MentorSchema = new Schema({
    name: String,
    specialization: String,
    phone_no: Number
})

const Mentor =  model('mentor',MentorSchema)
module.exports = Mentor;