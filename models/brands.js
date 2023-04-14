const mongoose  = require('mongoose')

var brandsSchema = new mongoose.Schema(
    {
        brand: {
            type: String,
            require: true
        },
        image: {
            type: String,
            require: true
        },
        status: {
            type: Boolean,
            require: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const brands = mongoose.model('brands', brandsSchema)

module.exports = brands