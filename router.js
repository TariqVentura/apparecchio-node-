const express = require('express')
const router = express.Router()
const services = require('./services/dashboard/render')
const controllerCategories = require('./controllers/categories')
const controllerBrands = require('./controllers/brands')
const controllerUsers = require('./controllers/users')

router.get('/', services.login)

router.get('/categorias', services.categorias)

router.get('/marcas', services.marcas)

router.get('/productos', services.productos)

router.get('/login', services.login)

router.get('/usuarios', services.usuarios)

router.get('/clientes', services.clientes)

router.get('/pedidos', services.pedidos)


//API categorias
router.post('/api/categories', controllerCategories.createCategorie)

router.get('/api/categories', controllerCategories.findCategorie)

router.put('/api/categories/:id', controllerCategories.updateCategorie)

router.delete('/api/categories/:id', controllerCategories.deleteCategorie)

//API marcas
 router.post('/api/brands', controllerBrands.craeteBrand)

 router.get('/api/brands', controllerBrands.findBrand)

 router.post('/api/brands/update', controllerBrands.updateBrand)

 router.post('/api/brands/delete', controllerBrands.deleteBrand)

 //API usuarios
 router.post('/api/users', controllerUsers.createUser)
 
 router.post('/login/api/users/', controllerUsers.findOneUser)

 

//  router.put('/api/users/:id', controllerBrands.updateBrand)

//  router.delete('/api/users/:id', controllerBrands.deleteBrand)

module.exports = router;