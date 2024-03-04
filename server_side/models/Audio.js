const {Schema,model} = require('mongoose')

const AudioSchema = new Schema({
    audio_path : String,
    heading: String,
    description: String

})

const Audio = model('audio',AudioSchema)
module.exports = Audio