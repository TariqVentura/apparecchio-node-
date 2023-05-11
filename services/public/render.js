const axios = require('axios')

exports.index = (req, res) => {
    axios.get('http://localhost:3000/api/brands')
        .then(function (response) {
            res.render('index', { branches: response.data })
        })
        .catch(err => {
            res.send(err)
        })
}

exports.carrito = (req, res) => {
    res.render('carrito')
}

exports.cuenta = (req, res) => {
    res.render('cuenta')
}

exports.producto = (req, res) => {
    res.render('producto')
}

exports.productos = (req, res) => {
    axios.get('http://localhost:3000/api/brands')
        .then(function (response) {
            axios.get('http://localhost:3000/api/products' + '/' + req.params.key)
                .then(function (product) {
                    res.render('productos', { products: product.data, branches: response.data})
                })
                .catch(err => {
                    res.send(err)
                })
        })
        .catch(err => {
            res.send(err)
        })
}