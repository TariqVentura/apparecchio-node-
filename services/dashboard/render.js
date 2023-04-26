const axios = require('axios')

exports.categorias = (req, res) => {
    axios.get('http://localhost:80/api/categories')
        .then(function (response) {
            res.render('categorias', { categories: response.data })
        })
        .catch(err => {
            res.send(err)
        })
}

exports.searchCategory = (req, res) => {
    axios.get('http://localhost:80/api/categories' + '/' + req.params.key)
        .then(function (response) {
            res.render('categorias', { categories: response.data })
        })
        .catch(err => {
            res.send(err)
        })
}

exports.marcas = (req, res) => {
    axios.get('http://localhost:80/api/brands')
        .then(function (response) {
            res.render('marcas', { branches: response.data })
        })
        .catch(err => {
            res.send(err)
        })
}

exports.searchBrand = (req, res) => {
    axios.get('http://localhost:80/api/brands' + '/' + req.params.key)
        .then(function (response) {
            res.render('marcas', { branches: response.data })
        })
        .catch(err => {
            res.send(err)
        })
}

exports.productos = (req, res) => {
    axios.get('http://localhost:80/api/products')
        .then(function (response) {
            axios.get('http://localhost:80/api/categories')
                .then(function (categorie) {
                    axios.get('http://localhost:80/api/brands')
                        .then(function (brand) {
                            res.render('productos', { products: response.data, categories: categorie.data, brands: brand.data })
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

exports.searchProducts = (req, res) => {
    axios.get('http://localhost:80/api/products' + '/' + req.params.key)
        .then(function (response) {
            axios.get('http://localhost:80/api/categories')
                .then(function (categorie) {
                    axios.get('http://localhost:80/api/brands')
                        .then(function (brand) {
                            res.render('productos', { products: response.data, categories: categorie.data, brands: brand.data })
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

exports.login = (req, res) => {
    res.render('login')
}

exports.usuarios = (req, res) => {
    axios.get('http://localhost:80/api/users')
        .then(function (response) {
            res.render('usuarios', { users: response.data })
        })
        .catch(err => {
            res.send(err)
        })
}

exports.searchUsers = (req, res) => {
    axios.get('http://localhost:80/api/users' + '/' + req.params.key)
        .then(function (response) {
            res.render('usuarios', { users: response.data })
        })
        .catch(err => {
            res.send(err)
        })
}

exports.clientes = (req, res) => {
    axios.get('http://localhost/api/clients')
        .then(function (response) {
            console.log(response.data)
            res.render('clientes', { clients: response.data })
        })
        .catch(err => {
            res.send(err)
        })
}

exports.searchClientes = (req, res) => {
    axios.get('http://localhost/api/clients' + '/' + req.params.key)
        .then(function (response) {
            console.log(response.data)
            res.render('clientes', { clients: response.data })
        })
        .catch(err => {
            res.send(err)
        })
}

exports.pedidos = (req, res) => {
    res.render('pedidos')
}

exports.updateBrands = (req, res) => {
    axios.get('http://localhost:80/api/brands', { params: { id: req.query.id } })
        .then(function (branchData) {
            res.render('_update', { information: branchData.data, variable: 'marca', route: 'brands', input: "brand" })
        })
        .catch(err => {
            res.send(err)
        })
}

exports.updateCategories = (req, res) => {
    axios.get('http://localhost:80/api/categories', { params: { id: req.query.id } })
        .then(function (categorieData) {
            res.render('_updateCategories', { information: categorieData.data, variable: 'categoria', route: 'categories', input: "categorie" })
        })
        .catch(err => {
            res.send(err)
        })
}

exports.updateUsers = (req, res) => {
    axios.get('http://localhost:80/api/users', { params: { id: req.query.id } })
        .then(function (userData) {
            console.log(userData.data)
            res.render('_updateUsers', { information: userData.data, route: 'users' })
        })
        .catch(err => {
            res.send(err)
        })
}

exports.updateProducts = (req, res) => {
    axios.get('http://localhost:80/api/products', { params: { id: req.query.id } })
        .then(function (productData) {
            axios.get('http://localhost:80/api/categories')
                .then(function (categorie) {
                    axios.get('http://localhost:80/api/brands')
                        .then(function (brand) {
                            res.render('_updateProducts', { information: productData.data, categories: categorie.data, brands: brand.data })
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

exports.updateClients = (req, res) => {
    axios.get('http://localhost/api/clients', { params: { id: req.query.id } })
        .then(function (response) {
            console.log(response.data)
            res.render('_updateClients', { clients: response.data })
        })
        .catch(err => {
            res.send(err)
        })
}

exports.historial = (req, res) => {
    axios.get('http://localhost/api/records' + '/' + req.params.key)
        .then(function (response) {
            res.render('historial', { historial: response.data, producto: req.params.key })
        })
        .catch(err => {
            res.send(err)
        })
}

exports.pedidos = (req, res) => {
    axios.get('http://localhost/api/orders')
        .then(function (response) {
            res.render('pedidos', { pedidos: response.data })
        })
        .catch(err => {
            res.send(err)
        })
}

exports.searchOrders = (req, res) => {
    axios.get('http://localhost/api/orders' + '/' + req.params.key)
        .then(function (response) {
            res.render('pedidos', { pedidos: response.data })
        })
        .catch(err => {
            res.send(err)
        })
}

exports.detallesPedidos = (req, res) => {
    axios.get('http://localhost/api/details' + '/' + req.params.key)
        .then(function (response) {
            res.render('detallesPedidos', { detalles: response.data })
        })
        .catch(err => {
            res.send(err)
        })
}

exports.confirmacion = (req,res)=> {
    res.render('confirmacion')
}

exports.principal = (req , res) => {
    res.render('principal')
}