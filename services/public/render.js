const axios = require('axios')
const comments = require('../../models/comments')

exports.index = (req, res) => {
    console.log(req.session)
    axios.get('http://localhost:3000/api/brands')
        .then(function (response) {
            res.render('index', { branches: response.data, categories: response.data, mensaje: ". ", confirmation: false, icon: " ." })
        })
        .catch(err => {
            res.send(err)
        })
}

exports.carritoNoUser = (req, res) => {
    axios.get('http://localhost:3000/api/brands')
        .then(function (response) {
            axios.get('http://localhost:3000/api/categories')
                .then(function (categorie) {
                    res.render('noUser', { branches: response.data, categories: categorie.data, mensaje: ". ", confirmation: false, icon: " ." })
                })
                .catch(err => {
                    res.send(err)
                })
        })
        .catch(err => {
            res.send(err)
        })
}

exports.carrito = (req, res) => {
    axios.get('http://localhost:3000/api/brands')
        .then(function (response) {
            axios.get('http://localhost:3000/api/categories')
                .then(function (categorie) {
                    axios.get('http://localhost:3000/api/orders')
                        .then(function (order) {
                            res.render('carrito', { orders: order.data, branches: response.data, categories: categorie.data, mensaje: ". ", confirmation: false, icon: " ." })
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

exports.cuenta = (req, res) => {
    res.render('cuenta')
}

exports.producto = (req, res) => {
    axios.get('http://localhost:3000/api/brands')
        .then(function (response) {
            axios.get('http://localhost:3000/api/categories')
                .then(function (categorie) {
                    axios.get('http://localhost:3000/api/products' + '/' + req.params.key)
                        .then(function (product) {
                            axios.get('http://localhost:3000/api/comments' + '/' + req.params.key)
                            .then(function(comments){
                                res.render('producto', { products: product.data, branches: response.data, categories: categorie.data, comments: comments.data, mensaje: ". ", confirmation: false, icon: " ." })
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
        })
        .catch(err => {
            res.send(err)
        })
}

exports.productos = (req, res) => {
    axios.get('http://localhost:3000/api/brands')
        .then(function (response) {
            axios.get('http://localhost:3000/api/categories')
                .then(function (categorie) {
                    axios.get('http://localhost:3000/api/products' + '/' + req.params.key)
                        .then(function (product) {
                            res.render('productos', { products: product.data, branches: response.data, categories: categorie.data, mensaje: ". ", confirmation: false, icon: " ." })
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