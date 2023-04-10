const express = require('express')
const router = express.Router()
const controllerCategories = require('./controllers/categories')
const controllerBrands = require('./controllers/brands')

router.get('/', (req, res) => {
    res.render('index')
})

//API categorias
router.post('/api/categories', controllerCategories.createCategorie)

router.get('/api/categories', controllerCategories.findCategorie)

router.put('/api/categories/:id', controllerCategories.updateCategorie)

router.delete('/api/categories/:id', controllerCategories.deleteCategorie)

//API marcas
 router.post('/api/brands', controllerBrands.craeteBrand)

 router.get('/api/brands', controllerBrands.findBrand)

 router.put('/api/brands/:id', controllerBrands.updateBrand)

 router.delete('/api/brands/:id', controllerBrands.deleteBrand)

module.exports = router;