const mongoose = require('mongoose')

var usersSchema = new mongoose.Schema(
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

const users = mongoose.model('users', usersSchema)

module.exports = users