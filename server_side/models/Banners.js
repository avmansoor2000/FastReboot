const {Schema,model} = require('mongoose')

const BannerSchema = new Schema({
    img_path: String,
    heading: String,
    description: String
})

const Banner = model('banner', BannerSchema)

module.exports = Banner;