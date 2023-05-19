const axios = require('axios')
const comments = require('../../models/comments')

exports.index = (req, res) => {
    let user
    if (req.session.user) {
        user = req.session.user
    } else {
        user = 'no user'
    }
    axios.get('http://localhost:3000/api/brands')
        .then(function (response) {
            axios.get('http://localhost:3000/api/categories')
                .then(function (categories) {
                    res.render('index', { branches: response.data, categories: categories.data, mensaje: ". ", confirmation: false, icon: " .", user: user })
                })

        })
        .catch(err => {
            res.send(err)
        })
}

exports.carrito = (req, res) => {
    if (req.session.user) {
        axios.get('http://localhost:3000/api/brands')
            .then(function (response) {
                axios.get('http://localhost:3000/api/categories')
                    .then(function (categorie) {
                        axios.get('http://localhost:3000/api/orders' + '/' + req.session.user)
                            .then(function (order) {
                                res.render('carrito', { orders: order.data, branches: response.data, categories: categorie.data, mensaje: ". ", confirmation: false, icon: " .", user: req.session.user })
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
        axios.get('http://localhost:3000/api/brands')
            .then(function (response) {
                axios.get('http://localhost:3000/api/categories')
                    .then(function (categorie) {
                        res.render('noUser', { branches: response.data, categories: categorie.data, mensaje: ". ", confirmation: false, icon: " .", user: "no user" })
                    })
                    .catch(err => {
                        res.send(err)
                    })
            })
            .catch(err => {
                res.send(err)
            })
    }
}

exports.cuenta = (req, res) => {
    res.render('cuenta')
}

exports.producto = (req, res) => {
    let user
    if (req.session.user) {
        axios.get('http://localhost:3000/api/brands')
            .then(function (response) {
                axios.get('http://localhost:3000/api/categories')
                    .then(function (categorie) {
                        axios.get('http://localhost:3000/api/products' + '/' + req.params.key)
                            .then(function (product) {
                                axios.get('http://localhost:3000/api/comments' + '/' + req.params.key)
                                    .then(function (comments) {
                                        axios.get('http://localhost:3000/api/orders' + '/' + req.session.user)
                                            .then(function (order) {
                                                res.render('producto', { orders: order.data, branches: response.data, categories: categorie.data, products: product.data, comments: comments.data, mensaje: ". ", confirmation: false, icon: " .", user: req.session.user })
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
            })
            .catch(err => {
                res.send(err)
            })
    } else {
        axios.get('http://localhost:3000/api/brands')
            .then(function (response) {
                axios.get('http://localhost:3000/api/categories')
                    .then(function (categorie) {
                        axios.get('http://localhost:3000/api/products' + '/' + req.params.key)
                            .then(function (product) {
                                axios.get('http://localhost:3000/api/comments' + '/' + req.params.key)
                                    .then(function (comments) {
                                        res.render('producto', { orders: 'null', products: product.data, branches: response.data, categories: categorie.data, comments: comments.data, mensaje: ". ", confirmation: false, icon: " .", user: "no user" })
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

}

exports.productos = (req, res) => {
    let user
    if (req.session.user) {
        user = req.session.user
    } else {
        user = 'no user'
    }
    axios.get('http://localhost:3000/api/brands')
        .then(function (response) {
            axios.get('http://localhost:3000/api/categories')
                .then(function (categorie) {
                    axios.get('http://localhost:3000/api/products' + '/' + req.params.key)
                        .then(function (product) {
                            res.render('productos', { products: product.data, branches: response.data, categories: categorie.data, mensaje: ". ", confirmation: false, icon: " .", user: user })
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

exports.orderDeatils = (req, res) => {
    axios.get('http://localhost:3000/api/brands')
        .then(function (response) {
            axios.get('http://localhost:3000/api/categories')
                .then(function (categorie) {
                    axios.get('http://localhost:3000/api/details' + '/' + req.params.key)
                        .then(function (detail) {
                            res.render('orderDetails', { details: detail.data, branches: response.data, categories: categorie.data, mensaje: ". ", confirmation: false, icon: " .", user: req.session.user })
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