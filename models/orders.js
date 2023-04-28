/**
 * Se llama a la dependencia de mongoose
 */
const mongoose = require('mongoose')

/**
 * se crea una variable que fuciona como un modelo de coleccion de mongo
 * Se definen los documentos que almacenara y su tipo
 */
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

/**
 * se crea un objeto de tipo modelo de mongo con el que se creara la coleccion dentro del servidor de atlas
 */
const orders = mongoose.model('orders', ordersSchema)

/**
 * Se exporta para que pueda acceder a el
 */
module.exports = orders