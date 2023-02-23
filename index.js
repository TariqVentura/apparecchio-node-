//llamando las dependencias
const express = require('express')
const layouts = require('express-ejs-layouts')
const path = require('path')
const http = require('http')

const app = express()
const server = http.createServer(app)

//se define el motor de plantillas en este caso ejs
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views/public')

//se define que se use el puerto de las variables de entorno y de no encontrarlo usar el puerto 3001
app.set('port', process.env.PORT || 3001)

app.use(express.static(__dirname + '/resources'))
app.use(express.static(__dirname + '/controllers'))
app.use(express.urlencoded({extended: false}))
app.use(express(JSON))
app.use(layouts)

//Middleware
app.use('/', require('./router'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('index')
})

server.listen(app.get('port'), ()=>{
    console.log('funciona')
})