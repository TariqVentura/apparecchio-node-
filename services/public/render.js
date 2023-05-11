const axios = require('axios')

exports.index = (req, res) => {
    axios.get('http://localhost:80/api/brands')
        .then(function (response) {
            res.render('index', { branches: response.data})
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
    res.render('productos')
}