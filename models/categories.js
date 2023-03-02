const mongoose  = require('mongoose')

const categoriesSchema = new mongoose.Schema(
    {
        categorie: {
            type: String
        },
        status: {
            type: Boolean
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model("categories", categoriesSchema)