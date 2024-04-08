const {Schema,model} = require('mongoose')

const BannerSchema = new Schema({
    heading: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const Banner = model('banner', BannerSchema)

module.exports = Banner;