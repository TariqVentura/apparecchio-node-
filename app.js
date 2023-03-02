//llamando las dependencias
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connection = require('./config/mongo')
const layouts = require('express-ejs-layouts')
const path = require('path')
const http = require('http')

const app = express()
app.use(cors())

const server = http.createServer(app)

//se define el motor de plantillas en este caso ejs
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views/public')

//se define que se use el puerto de las variables de entorno y de no encontrarlo usar el puerto 3001
app.set('port', process.env.PORT || 3001)

//se crea la ruta para usar los archivos del css, js e imagenes para la pagina
app.use(express.static(__dirname + '/resources'))
app.use(express.static(__dirname + '/controllers'))

app.use(express.urlencoded({extended: false}))
app.use(express(JSON))
app.use(layouts)

//Middleware
app.use('/', require('./router'))
app.use(express.static(path.join(__dirname, 'public')))

//se utiliza el metodo get para renderisar las paginas
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/cuenta', (req, res) => {
    res.render('cuenta')
})

app.get('/carrito', (req, res) => {
    res.render('carrito')
})

app.get('/producto', (req, res) => {
    res.render('producto')
})

app.get('/productos', (req, res) => {
    res.render('productos')
})

server.listen(app.get('port'), ()=>{
    console.log(process.env.PORT)
})

connection()