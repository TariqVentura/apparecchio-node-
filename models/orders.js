const mongoose = require('mongoose')

let ordersSchema = new mongoose.Schema(
    {
        client: {
            type: String,
            require: true
        },
        status: {
            type: ["en proceso", "finalizado", "cancelado"],
            default: "en proceso"
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const orders = mongoose.model('orders', ordersSchema)

module.exports = orders