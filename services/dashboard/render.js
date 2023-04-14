const axios = require('axios')
 
exports.categorias = (req, res) => {
    axios.get('http://localhost:80/api/categories')
    .then(function(response){
        res.render('categorias', { categories : response.data })
    })
    .catch(err => {
        res.send(err)
    })
}

exports.marcas = (req, res) => {
    axios.get('http://localhost:80/api/brands')
    .then(function(response){
        res.render('marcas', { branches : response.data } )
    })    
    .catch(err => {
        res.send(err)
    })
}

exports.productos = (req, res) => {
    res.render('productos')
}

exports.login = (req,res) => {
    res.render('login')
}

exports.usuarios = (req, res) => {
    axios.get('http://localhost:80/api/users')
    .then(function(response){
        res.render('usuarios', { users : response.data })
    })
    .catch(err => {
        res.send(err)
    })
}

exports.clientes = (req, res) => {
    res.render('clientes')
}

exports.pedidos = (req, res) => {
    res.render('pedidos')
}