require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connection = require('./config/mongo')
const layouts = require('express-ejs-layouts')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const path = require('path')
const http = require('http')

const dashboard = express()
dashboard.use(cors())

const server = http.createServer(dashboard)

//se define el motor de plantillas en este caso ejs
dashboard.set('view engine', 'ejs')
dashboard.set('views', __dirname + '/views/dashboard')


//se define que se use el puerto de las variables de entorno y de no encontrarlo usar el puerto 3001
dashboard.set('port', process.env.DASHBOARD_PORT || 81)

//log request
dashboard.use(morgan('tiny'))

//conexion mongoDB
connection()

//parse request to body parser
dashboard.use(bodyparser.urlencoded({extended:true}))

//se crea la ruta para usar los archivos del css, js e imagenes para la pagina
dashboard.use(express.static(__dirname + '/resources'))
dashboard.use(express.static(__dirname + '/controllers'))

dashboard.use(express.urlencoded({extended: false}))
dashboard.use(express(JSON))
dashboard.use(layouts)

//Middleware
dashboard.use('/', require('./router'))
dashboard.use(express.static(path.join(__dirname, 'dashboard')))

dashboard.get('/', (req, res) => {
    res.render('index')
})

dashboard.get('/marcas', (req, res) => {
    res.render('marcas')
})

dashboard.get('/productos', (req, res) => {
    res.render('productos')
})

server.listen(dashboard.get('port'), ()=>{
    console.log(process.env.DASHBOARD_PORT)
})

