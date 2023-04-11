const mongoose  = require('mongoose')

var categoriesSchema = new mongoose.Schema(
    {
        categorie: {
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

const categories = mongoose.model('categories', categoriesSchema)

module.exports = categories