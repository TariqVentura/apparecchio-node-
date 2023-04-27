const mongoose = require('mongoose')

let commentsSchena = new mongoose.Schema(
    {
        comment: {
            type: String,
            require: true
        },
        review: {
            type: Number,
            require: true
        },
        product: {
            type: String,
            require: true
        },
        client: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const comments = mongoose.model('comments', commentsSchena)

module.exports = comments