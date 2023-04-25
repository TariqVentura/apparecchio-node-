const mongoose = require('mongoose')

let ordersSchema = new mongoose.Schema(
    {
        client: {
            type: String,
            require: true
        },
        date: {
            type: Date,
            require: true
        },
        status: {
            type: ["en proceso", "finalizado", "cancelado"]
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const orders = mongoose.model('orders', ordersSchema)

module.exports = orders