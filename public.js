//llamando las dependencias
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connection = require('./config/mongo')
const layouts = require('express-ejs-layouts')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const path = require('path')
const http = require('http')

const public = express()
public.use(cors())

const server = http.createServer(public)

//se define el motor de plantillas en este caso ejs
public.set('view engine', 'ejs')
public.set('views', __dirname + '/views/public')

public.set('port', process.env.PUBLIC_PORT || 3001)

public.use(morgan('tiny'))

connection()

public.use(bodyparser.urlencoded({extended:true}))

public.use(express.static(__dirname + '/controllers'))
public.use(express.static(__dirname + '/resources'))

public.use(express.urlencoded({extended: true}))
public.use(express(JSON))
public.use(layouts)

public.use('/', require('./puclic_routes'))
public.use(express.static(path.join(__dirname, 'public')))

server.listen(public.get('port'), ()=>{
    console.log(process.env.PUBLIC_PORT)
})