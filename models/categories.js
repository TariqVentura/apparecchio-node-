/**
 * Se llama a la dependencia de mongoose
 */
const mongoose  = require('mongoose')

/**
 * se crea una variable que fuciona como un modelo de coleccion de mongo
 * Se definen los documentos que almacenara y su tipo
 */
let categoriesSchema = new mongoose.Schema(
    {
        categorie: {
            type: String,
            require: true
        },
        image: {
            type: String,
            require: true
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
const categories = mongoose.model('categories', categoriesSchema)

/**
 * Se exporta para que pueda acceder a el
 */
module.exports = categories