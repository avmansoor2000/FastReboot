const {Schema,model} = require('mongoose')

const AudioSchema = new Schema({
    audio_path :{
        type: String,
        required: true
    },
    heading:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }

})

const Audio = model('audio',AudioSchema)
module.exports = Audio