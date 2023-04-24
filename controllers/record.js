const record = require('../models/record')
const fecha = new Date()
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const products = require('../models/products')

exports.createRecord = (req, res) => {
    //validar campos vacios
    if (!req.body) {
        res.status(400).send({ message: "No se pueden dejar campos vacios" })
        return
    }

    const newRecord = new record({
        product: req.body.product,
        stock: req.body.stock,
        operation: req.body.operation,
        date: fecha.getFullYear() + "-" + month[fecha.getMonth()] + "-" + fecha.getDate()
    })

    //guardar datos en la base
    newRecord
        .save(newRecord)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Ocurrio un error al intentar subir los datos` })
            } else {
                const id = req.body.id
                const value = { stock: Number(req.body.prevStock) + Number(req.body.stock) } 
                products.findByIdAndUpdate(id, value, { useFindAndModify: false })
                    .then(data => {
                        if (!data) {
                            res.status(404).send({ message: "No se encontro el producto" })
                        } else {
                            res.redirect('/productos')
                        }
                    })
                    .catch(err => {
                        res.status(500).send({ message: "Ocurrio un error al intentar actualizar" })
                    })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrio un error al intentar ingresar el usuario"
            })
        })
}

exports.findRecord = (req, res) => {
    const key = req.params.key
    record.find(
        {
            "$or": [
                { product: { $regex: key } }
            ]
        }
    )
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Sin datos` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.send(err)
        })
}