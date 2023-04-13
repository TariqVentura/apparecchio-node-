const md5 = require('md5')
const services = require('../services/dashboard/render')
var users = require('../models/users')

exports.createUser = (req, res) => {
    //validar campos vacios
    if (!req.body) {
        res.status(400).send({ message: "No se pueden dejar campos vacios" })
        return
    }

    //crear usuario
    const newUser = new users({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        identity_card: req.body.identity_card,
        user: req.body.user,
        password: md5(req.body.password),
        status: req.body.status
    })

    //guardar datos en la base
    newUser
        .save(newUser)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrio un error al intentar ingresar el usuario"
            })
        })
}

exports.findOneUser = (req, res) => {
    const username = req.body.user
    users.findOne({user:username})
        .then(user => {
            if (!user) {
                
            }else{
                if (user.password != md5(req.body.password)) {
                    res.status(400).send({ message: 'contraseña incorrecta' })
                }else{
                    res.redirect('/')
                }               
            }      
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Ocurrio un error al tratar de obtener la informacion" })
        })
}