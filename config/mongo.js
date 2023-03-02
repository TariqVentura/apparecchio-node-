const mongoose = require('mongoose')

const connection = () => {
    DB_URI = process.env.DB_URI
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

module.exports = connection