const express = require('express')
const router = express.Router()
const services = require('./services/public/render')
const controllerBrands = require('./controllers/brands')
const controllerCLients = require('./controllers/clients')
const controllerProducts = require('./controllers/products')

router.get('/', services.index)

router.get('/carrito', services.carrito)

router.get('/cuenta', services.cuenta)

router.get('/producto', services.producto)

router.get('/productos/:key', services.productos)

//API marcas
router.get('/api/brands', controllerBrands.findBrand)

//API clients
router.post('/login/api/clients', controllerCLients.logClient)

//API productos 
router.get('/api/products/:key', controllerProducts.searchProducts)

module.exports = router