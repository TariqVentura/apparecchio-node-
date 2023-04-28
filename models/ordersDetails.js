/**
 * Se llama a la dependencia de mongoose
 */
const mongoose = require('mongoose')

/**
 * se crea una variable que fuciona como un modelo de coleccion de mongo
 * Se definen los documentos que almacenara y su tipo
 */
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

/**
 * se crea un objeto de tipo modelo de mongo con el que se creara la coleccion dentro del servidor de atlas
 */
const orderDetails = mongoose.model('orderDetails', orderDetailsSchema)

/**
 * Se exporta para que pueda acceder a el
 */
module.exports = orderDetails