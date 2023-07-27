/**
 * Se declaran las constantes para mandar a llamar al controlador y las dependencias de node
 */
const record = require('../models/record')
const fecha = new Date()
const month = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
const products = require('../models/products')
const axios = require('axios')

/**
 * Por medio de la depencia de axios se obtiene la informacion de las API utilizando el metodo GET y se renderizan las paginas con la informacion obetnida
 * Haciendo uso ddel metodo SAVE de mongoose se guardan los datos en el servidor de Atlas
 */
exports.createRecord = (req, res) => {
    //validar campos vacios
    if (!req.body.stock) {
        axios.get('http://localhost:80/api/products')
            .then(function (response) {
                axios.get('http://localhost:80/api/categories')
                    .then(function (categorie) {
                        axios.get('http://localhost:80/api/brands')
                            .then(function (brand) {
                                res.render('productos', { products: response.data, categories: categorie.data, brands: brand.data, mensaje: "No se permiten campos vacios", confirmation: true, icon: 'error' })
                            })
                            .catch(err => {
                                res.send(err)
                            })
                    })
                    .catch(err => {
                        res.send(err)
                    })
            })
            .catch(err => {
                res.send(err)
            })
    } else {
        const newRecord = new record({
            product: req.body.product,
            stock: req.body.stock,
            operation: req.body.operation,
            date: fecha.toISOString()
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
                                axios.get('http://localhost:80/api/products')
                                    .then(function (response) {
                                        axios.get('http://localhost:80/api/categories')
                                            .then(function (categorie) {
                                                axios.get('http://localhost:80/api/brands')
                                                    .then(function (brand) {
                                                        res.render('productos', { products: response.data, categories: categorie.data, brands: brand.data, mensaje: "Se agrego la cantidad exitosamente", confirmation: true, icon: 'success' })
                                                    })
                                                    .catch(err => {
                                                        res.send(err)
                                                    })
                                            })
                                            .catch(err => {
                                                res.send(err)
                                            })
                                    })
                                    .catch(err => {
                                        res.send(err)
                                    })
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
}

/**  
 * obtenemos el parametro de la URL (key) y lo utilizamos para hacer una 
 * busqueda en la collecion donde se busca una coincidencia entre los 
 * datos que tienen los campos que se especifica y el parametro que se envia
*/
exports.findRecord = (req, res) => {
    if (req.params.key) {
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
    } else {
        record.find()
            .then(data => {
                if (data) {
                    res.send(data)
                } else {
                    res.send('error')
                }
            })
            .catch(err => {
                res.send(err)
            })
    }
}
