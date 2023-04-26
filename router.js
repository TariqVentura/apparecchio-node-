const express = require('express')
const router = express.Router()
const services = require('./services/dashboard/render')
const controllerCategories = require('./controllers/categories')
const controllerBrands = require('./controllers/brands')
const controllerUsers = require('./controllers/users')
const controllerProducts = require('./controllers/products')
const controllerClients = require('./controllers/clients')
const controllerRecords = require('./controllers/record')
const controllerOrders = require('./controllers/orders')

router.get('/', services.login)

router.get('/categorias', services.categorias)

router.get('/categorias/:key', services.searchCategory)

router.get('/marcas', services.marcas)

router.get('/marcas/:key', services.searchBrand)

router.get('/productos', services.productos)

router.get('/productos/:key', services.searchProducts)

router.get('/login', services.login)

router.get('/usuarios', services.usuarios)

router.get('/usuarios/:key', services.searchUsers)

router.get('/clientes', services.clientes)

router.get('/clientes/:key', services.searchClientes)

router.get('/pedidos', services.pedidos)

router.get('/_update/brands', services.updateBrands)

router.get('/_updateCategories/categories', services.updateCategories)

router.get('/_updateUsers/users', services.updateUsers)

router.get('/_updatePorducts/products', services.updateProducts)

router.get('/clientes', services.clientes)

router.get('/_updateClients/clients', services.updateClients)

router.get('/historial/:key', services.historial)

router.get('/pedidos', services.pedidos)

router.get('/pedidos/:key', services.searchOrders)

router.get('/detallesPedidos/:key', services.detallesPedidos)


//API categorias
router.post('/api/categories', controllerCategories.createCategorie)

router.get('/api/categories', controllerCategories.findCategorie)

router.post('/api/categories/update', controllerCategories.updateCategorie)

router.get('/api/categories/delete', controllerCategories.deleteCategorie)

router.get('/api/categories/:key', controllerCategories.searchCategories)

//API marcas
router.post('/api/brands', controllerBrands.craeteBrand)

router.get('/api/brands', controllerBrands.findBrand)

router.post('/api/brands/update', controllerBrands.updateBrand)

router.get('/api/brands/delete', controllerBrands.deleteBrand)

router.get('/api/brands/:key', controllerBrands.searchBrands)

//API usuarios
router.post('/api/users', controllerUsers.createUser)

router.post('/login/api/users/', controllerUsers.findOneUser)

router.get('/api/users', controllerUsers.findUsers)

router.post('/api/users/update', controllerUsers.updateUsers)

router.get('/api/users/delete', controllerUsers.deleteUser)

router.get('/api/users/:key', controllerUsers.searchUsers)

//API productos
router.post('/api/products', controllerProducts.createProduct)

router.get('/api/products', controllerProducts.findProduct)

router.post('/api/products/update', controllerProducts.updateProduct)

router.get('/api/products/delete', controllerProducts.deleteProduct)

router.get('/api/products/:key', controllerProducts.searchProducts)

//API clientes
router.post('/api/clients', controllerClients.createClient)

router.get('/api/clients', controllerClients.findClient)

router.post('/api/clients/update', controllerClients.updateClient)

router.get('/api/clients/delete', controllerClients.deleteClient)

router.get('/api/clients/:key', controllerClients.searchClients)

//API records
router.post('/api/records/', controllerRecords.createRecord)

router.get('/api/records/:key', controllerRecords.findRecord)

//API orders
router.post('/api/orders/', controllerOrders.createOrder)

router.get('/api/orders/', controllerOrders.getOrders)

router.get('/api/orders/:key', controllerOrders.getOrders)

router.get('/api/details/:key', controllerOrders.getDetails)

router.get('/api/ordersUpdate/update', controllerOrders.finishOrder)

router.post('/api/details', controllerOrders.createDetail)

module.exports = router;