/**
 * Se llama a la dependencia de mongoose
 */
const mongoose = require('mongoose')

/**
 * se crea una variable que fuciona como un modelo de coleccion de mongo
 * Se definen los documentos que almacenara y su tipo
 */
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
            type: String,
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
const record = mongoose.model('record', recordSchemna)

/**
 * Se exporta para que pueda acceder a el
 */
module.exports = record