const {Schema,model} = require('mongoose')

const VideoSchema = new Schema({
    video_path: {
        type: String,
        required: true
    },
    heading: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
})

const Video = model('video',VideoSchema)

module.exports = Video;