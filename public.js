//llamando las dependencias
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connection = require('./config/mongo')
const layouts = require('express-ejs-layouts')
const path = require('path')
const http = require('http')

const public = express()
public.use(cors())

const server = http.createServer(public)

//se define el motor de plantillas en este caso ejs
public.set('view engine', 'ejs')
public.set('views', __dirname + '/views/public')


//se define que se use el puerto de las variables de entorno y de no encontrarlo usar el puerto 3001
public.set('port', process.env.PUBLIC_PORT || 3001)

//se crea la ruta para usar los archivos del css, js e imagenes para la pagina
public.use(express.static(__dirname + '/resources'))
public.use(express.static(__dirname + '/controllers'))

public.use(express.urlencoded({extended: false}))
public.use(express(JSON))
public.use(layouts)

//Middleware
public.use('/', require('./router'))
public.use(express.static(path.join(__dirname, 'public')))

//se utiliza el metodo get para renderisar las paginas
public.get('/', (req, res) => {
    res.render('index')
})

public.get('/cuenta', (req, res) => {
    res.render('cuenta')
})

public.get('/carrito', (req, res) => {
    res.render('carrito')
})

public.get('/producto', (req, res) => {
    res.render('producto')
})

public.get('/layout', (req, res) => {
    res.render('layout')
})

server.listen(public.get('port'), ()=>{
    console.log(process.env.PUBLIC_PORT)
})

connection()