const mongoose = require('mongoose')

var productsSchema = new mongoose.Schema(
    {
        product: {
            type: String,
            require: true
        },
        price: {
            type: Number,
            require: true
        },
        description: {
            type: String,
            require: true
        },
        categorie: {
            type: String,
            require: true
        },
        brand: {
            type: String,
            require: true
        },
        user: {
            type: String,
            require: true
        },
        image:{
            type: String,
            require: true
        },
        stock:{
            type: Number
        },
        review:{
            type: Number
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

const products = mongoose.model('products', productsSchema)

module.exports = products