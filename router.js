const express = require('express')
const router = express.Router()
const services = require('./services/dashboard/render')
const controllerCategories = require('./controllers/categories')
const controllerBrands = require('./controllers/brands')
const controllerUsers = require('./controllers/users')
const controllerProducts = require('./controllers/products')
const controllerClients = require('./controllers/clients')

router.get('/', services.login)

router.get('/categorias', services.categorias)

router.get('/marcas', services.marcas)

router.get('/productos', services.productos)

router.get('/login', services.login)

router.get('/usuarios', services.usuarios)

router.get('/clientes', services.clientes)

router.get('/pedidos', services.pedidos)

router.get('/_update/brands', services.updateBrands)

router.get('/_updateCategories/categories', services.updateCategories)

router.get('/_updateUsers/users', services.updateUsers)

router.get('/_updatePorducts/products', services.updateProducts)

router.get('/clientes', services.clientes)

router.get('/_updateClients/clients', services.updateClients)



//API categorias
router.post('/api/categories', controllerCategories.createCategorie)

router.get('/api/categories', controllerCategories.findCategorie)

router.post('/api/categories/update', controllerCategories.updateCategorie)

router.get('/api/categories/delete', controllerCategories.deleteCategorie)

router.get('/api/categories/search/:key', controllerCategories.searchCategories)

//API marcas
 router.post('/api/brands', controllerBrands.craeteBrand)

 router.get('/api/brands', controllerBrands.findBrand)

 router.post('/api/brands/update', controllerBrands.updateBrand)

 router.get('/api/brands/delete', controllerBrands.deleteBrand)

 //API usuarios
 router.post('/api/users', controllerUsers.createUser)
 
 router.post('/login/api/users/', controllerUsers.findOneUser)

 router.get('/api/users', controllerUsers.findUsers)

router.post('/api/users/update', controllerUsers.updateUsers)

 router.get('/api/users/delete', controllerUsers.deleteUser)

//API productos
router.post('/api/products', controllerProducts.createProduct)

router.get('/api/products', controllerProducts.findProduct)

router.post('/api/products/update', controllerProducts.updateProduct)

router.get('/api/products/delete', controllerProducts.deleteProduct)

//API clientes
router.post('/api/clients', controllerClients.createClient)

router.get('/api/clients', controllerClients.findClient)

router.post('/api/clients/update', controllerClients.updateClient)

router.get('/api/clients/delete', controllerClients.deleteClient)


module.exports = router;