const axios = require('axios')

exports.categorias = (req, res) => {
    axios.get('http://localhost:80/api/categories')
    .then(function(response){
        res.render('index', { categories : response.data })
    })
    .catch(err => {
        res.send(err)
    })
}

exports.marcas = (req, res) => {
    res.render('marcas')
}

exports.productos = (req, res) => {
    res.render('productos')
}