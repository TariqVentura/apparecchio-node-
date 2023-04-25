const mongoose = require('mongoose')

let orderDetailsSchema = new mongoose.Schema(
    {
        product: {
            type: String,
            require: true
        },
        price: {
            type: Number,
            require: true
        },
        amount: {
            type: Number,
            require: true
        },
        total: {
            type: Number,
            require: true
        },
        order: {
            type:String,
            require: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)