var products = require('../models/products')
const axios = require('axios')

exports.createProduct = (req, res) => {
    //validar campos vacios
    if (!req.body.product || !req.body.price || !req.body.description ) {
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
        //crear marca
        const newPorduct = new products({
            product: req.body.product,
            price: req.body.price,
            description: req.body.description,
            categorie: req.body.categorie,
            brand: req.body.brand,
            user: req.body.user,
            stock: req.body.stock,
            image: req.body.image,
            status: true
        })

        //guardar los datos en la base
        newPorduct
            .save(newPorduct)
            .then(data => {
                if (data) {
                    axios.get('http://localhost:80/api/products')
                        .then(function (response) {
                            axios.get('http://localhost:80/api/categories')
                                .then(function (categorie) {
                                    axios.get('http://localhost:80/api/brands')
                                        .then(function (brand) {
                                            res.render('productos', { products: response.data, categories: categorie.data, brands: brand.data, mensaje: "Producto Ingresado", confirmation: true, icon: 'success' })
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
}

exports.findProduct = (req, res) => {
    //obtener un solo registro por medio del id
    if (req.query.id) {
        const id = req.query.id
        products.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "No se pudo encontrar a este usuario" })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Ocurrio un error al intentar ejecutar el proceso" })
            })
    } else {
        //obetener todos los registros
        products.find()
            .then(product => {
                res.send(product)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Ocurrio un error al tratar de obtener la informacion" })
            })
    }
}

exports.updateProduct = (req, res) => {
    const id = req.body.id
    products.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
                                        res.render('productos', { products: response.data, categories: categorie.data, brands: brand.data, mensaje: "Producto Actualizado", confirmation: true, icon: 'success' })
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

exports.deleteProduct = (req, res) => {
    const id = req.query.id
    products.findByIdAndDelete(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: 'Producto no encontrado' })
            } else {
                axios.get('http://localhost:80/api/products')
                    .then(function (response) {
                        axios.get('http://localhost:80/api/categories')
                            .then(function (categorie) {
                                axios.get('http://localhost:80/api/brands')
                                    .then(function (brand) {
                                        res.render('productos', { products: response.data, categories: categorie.data, brands: brand.data, mensaje: "Producto Eliminado", confirmation: true, icon: 'success' })
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
            res.status(500).send({ message: "Ocurrio un error al intentar eliminar la informacion" })
        })

}

exports.searchProducts = async (req, res) => {
    const key = req.params.key
    products.find(
        {
            "$or": [
                { product: { $regex: key } },
                { categorie: { $regex: key } },
                { brand: { $regex: key } }
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