const mongoose = require('mongoose')

const connection = async() => {
    try {
        const con = await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log(`MongoDB connected: ${con.connection.host}`)
    } catch (err) {
        console.log(err)
    }
}

module.exports = connection