/**
 * Se llama a la dependencia de mongoose
 */
const mongoose = require('mongoose')

/**
 * se crea una variable que fuciona como un modelo de coleccion de mongo
 * Se definen los documentos que almacenara y su tipo
 */
let productsSchema = new mongoose.Schema(
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

/**
 * se crea un objeto de tipo modelo de mongo con el que se creara la coleccion dentro del servidor de atlas
 */
const products = mongoose.model('products', productsSchema)

/**
 * Se exporta para que pueda acceder a el
 */
module.exports = products