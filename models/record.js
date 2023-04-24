const mongoose = require('mongoose')

let recordSchemna = new mongoose.Schema(
    {
        product: {
            type: String,
            require: true
        },
        stock: {
            type: Number,
            require: true
        },
        operation: {
            type: String
        },
        date: {
            type: Date,
            require: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const record = mongoose.model('record', recordSchemna)

module.exports = record