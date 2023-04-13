const md5 = require('md5')
const bcrypt = require('bcrypt')
const services = require('../services/dashboard/render')
var users = require('../models/users')

exports.createUser = (req, res) => {
    //validar campos vacios
    if (!req.body) {
        res.status(400).send({ message: "No se pueden dejar campos vacios" })
        return
    }

    //encriptar contraseña
    const saltRounds = 10
    const EncryptedPassword = req.body.password

    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(EncryptedPassword, salt, function (err, hash) {
            //crear usuario
            const newUser = new users({
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                identity_card: req.body.identity_card,
                user: req.body.user,
                password: hash,
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
        })
    })



}

exports.findOneUser = (req, res) => {
    const username = req.body.user
    users.findOne({ user: username })
        .then(user => {
            if (!user) {
                res.status(500).send({ message: "Usuario inexistente" })
            } else {
                bcrypt.compare(req.body.password, user.password, function(err, result) {
                    if (result) {
                        res.redirect('/')
                    } else {
                        res.status(500).send({ message: "Contraseña incorrecta" })
                    }
                })
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Ocurrio un error al tratar de obtener la informacion" })
        })
}