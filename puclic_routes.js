const express = require('express')
const router = express.Router()
const services = require('./services/public/render')

router.get('/', services.index)

router.get('/carrito', services.carrito)

router.get('/cuenta', services.cuenta)

router.get('/producto', services.producto)

router.get('/productos', services.productos)

module.exports = router