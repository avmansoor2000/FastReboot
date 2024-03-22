const {Schema,model} = require('mongoose')

const BannerSchema = new Schema({
    heading: String,
    description: String
})

const Banner = model('banner', BannerSchema)

module.exports = Banner;