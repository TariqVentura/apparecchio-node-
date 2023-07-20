/**
 * Se declaran las constantes de las dependencias de node y de los controladores
 * 
 */
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
const controllerComments = require('./controllers/comments')

/**
 * Se ocupa el metodo get para que al momento de que se envie a 
 * la direccion con una '/' ocupe el service para renderizar 
 * la informacion
 */
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

router.get('/confirmacion', services.confirmacion)

router.get('/actualizacion', services.actualizacion)

router.get('/eliminacion', services.eliminacion)

router.get('/principal', services.principal)

router.get('/comentarios/:key', services.comentarios)

/**
 * Se crean las API de cada CRUD donde se ocupan el metodo POST y GET dependiendo de lo que necesite
 * El metodo POST se ocupara mayormente para crear registros mientras que el metodo GET se ocupara 
 * Para obetener informacion u ocupar la API sin necesitamos un proceso que no renderize informacion
*/

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

router.get('/count/products', controllerProducts.countProduct)

router.get('/count/categorie', controllerProducts.countCategorie)

//API clientes
router.post('/api/clients', controllerClients.createClient)

router.get('/api/clients', controllerClients.findClient)

router.post('/api/clients/update', controllerClients.updateClient)

router.get('/api/clients/delete', controllerClients.deleteClient)

router.get('/api/clients/:key', controllerClients.searchClients)

router.get('/count/clients', controllerClients.countClient)

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

router.get('/factura/:id', controllerOrders.getBill)

//API comentarios
router.post('/api/comments', controllerComments.createComment)

router.get('/api/comments/:key', controllerComments.findComments)

router.get('/api/delete/comments', controllerComments.deleteComment)

/**
 * Exportamos el router para que puedo ser accesido por el servidor
 */
module.exports = router;