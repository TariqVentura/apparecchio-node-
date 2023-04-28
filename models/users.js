/**
 * Se llama a la dependencia de mongoose
 */
const mongoose = require('mongoose')

/**
 * se crea una variable que fuciona como un modelo de coleccion de mongo
 * Se definen los documentos que almacenara y su tipo
 */
let usersSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        lastname: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        identity_card: {
            type: String,
            require: true,
            unique: true
        },
        user: {
            type: String,
            require: true,
            unique: true
        },
        password: {
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
const users = mongoose.model('users', usersSchema)

/**
 * Se exporta para que pueda acceder a el
 */
module.exports = users