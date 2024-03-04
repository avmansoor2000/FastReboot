const {Schema,model} = require('mongoose')

const VideoSchema = new Schema({
    video_path: String,
    heading: String,
    description: String
})

const Video = model('video',VideoSchema)

module.exports = Video;