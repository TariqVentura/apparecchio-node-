const express = require('express')
const router = express.Router()
const services = require('./services/public/render')
const controllerBrands = require('./controllers/brands')
const controllerCategories = require('./controllers/categories')
const controllerCLients = require('./controllers/clients')
const controllerProducts = require('./controllers/products')
const controllerOrders = require('./controllers/orders')
const controllerComments = require('./controllers/comments')

router.get('/', services.index)

router.get('/carrito', services.carrito)

router.get('/cuenta', services.cuenta)

router.get('/producto/:key', services.producto)

router.get('/productos/:key', services.productos)

router.get('/api/comments/:key', controllerComments.findComments )

router.get('/carrito/:key/:status', services.orderDeatils)

//API marcas
router.get('/api/brands', controllerBrands.findBrand)

//API categorias
router.get('/api/categories', controllerCategories.findCategorie)

//API clients
router.post('/login/api/clients', controllerCLients.logClient)
router.get('/login/api/clients', controllerCLients.logOutClient)
router.post('/api/clients', controllerCLients.createClient)

//API ordenes
router.post('/api/orders', controllerOrders.createOrder)
router.get('/api/orders/:key', controllerOrders.getOrders)
router.post('/api/finishOrder', controllerOrders.finishOrder)

//API detalles
router.post('/api/details', controllerOrders.createDetail)
router.get('/api/details/:key', controllerOrders.getDetails)
router.get('/api/deleteDetail/:key', controllerOrders.deleteDetail)

//API productos 
router.get('/api/products/:key', controllerProducts.searchProducts)

router.get('/api/products', controllerProducts.findProduct)

//API comentarios
router.post('/api/comments', controllerComments.createComment)


module.exports = router