const bcrypt = require('bcrypt')
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
                status: true
            })

            //guardar datos en la base
            newUser
                .save(newUser)
                .then(data => {
                    if (!data) {
                        res.status(404).send({ message: `Ocurrio un error al intentar subir los datos` })
                    } else {
                        res.redirect('/usuarios')
                    }
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
                bcrypt.compare(req.body.password, user.password, function (err, result) {
                    if (result) {
                        res.redirect('/categorias')
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

exports.findUsers = (req, res) => {
    if (req.query.id) {
        const id = req.query.id
        users.findById(id)
        .then(user => {
            if (!user) {
                res.status(404).send({ message: "No se pudo encontrar a este usuario" })
            }else{
                res.send(user)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al intentar ejecutar el proceso" })
        })
    } else {
        users.find()
            .then(user => {
                res.send(user)
                console.log(user)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Ocurrio un error al tratar de obtener la informacion" })
            })
    }
}

exports.updateUsers = (req, res) => {
    //validar campos vacios
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "No se puede actualizar si todos los campos estan vacios" })
    }

    const id = req.body.id
    users.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `usuario no encontrado` })
            } else {
                res.redirect('/usuarios')
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al intentar actualizar la informacion" })
        })
}

exports.deleteUser = (req, res) => {
    const id = req.query.id
    users.findByIdAndDelete(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `No se puede eliminar este usuario, es posible que no exista` })
            } else {
                res.redirect('/usuarios')
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al intentar eliminar la informacion" })
        })
}