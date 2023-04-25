const orders = require('../models/orders')
const orderDetails = require('../models/ordersDetails')

exports.createOrder = (req, res) => {
    //validar campos vacios
    if (!req.body) {
        res.status(400).send({ message: "El contenido no puede estar vacio" })
        return
    }

    const newOrder = new orders({
        client: req.body.user,
    })

    newOrder
        .save(newOrder)
        .then(data => {
            if (data) {
                const newDetail = new orderDetails({
                    product: req.body.product,
                    price: req.body.price,
                    amount: req.body.amount,
                    total: Number(req.body.price) * Number(req.body.amount),
                    order: data._id
                })

                newDetail
                    .save(newDetail)
                    .then(detail => {
                        if (detail) {
                            res.send(detail)
                        } else {
                            res.status(500).semd({
                                message: "Error al guardar los datos"
                            })
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Ocurrio un error mientras se ejecutaba el proceso"
                        })
                    })
            } else {
                res.status(500).semd({
                    message: "Error al guardar los datos"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrio un error mientras se ejecutaba el proceso"
            })
        })
}