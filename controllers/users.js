/**
 * Se declaran las constantes para mandar a llamar al controlador y las dependencias de node
 */
const bcrypt = require('bcrypt')
const users = require('../models/users')
const axios = require('axios')

/**
 * Por medio de la depencia de axios se obtiene la informacion de las API utilizando el metodo GET y se renderizan las paginas con la informacion obetnida
 * Haciendo uso ddel metodo SAVE de mongoose se guardan los datos en el servidor de Atlas
 */
exports.createUser = (req, res) => {
    //validar campos vacios
    if (!req.body.name || !req.body.lastname || !req.body.email || !req.body.identity_card || !req.body.user || !req.body.password) {
        axios.get('http://localhost:80/api/users')
            .then(function (response) {
                res.render('usuarios', { users: response.data, mensaje: "No se permiten campos vacios", confirmation: true, icon: "error" })
            })
            .catch(err => {
                res.send(err)
            })
    } else {
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
                            axios.get('http://localhost:80/api/users')
                                .then(function (response) {
                                    res.render('usuarios', { users: response.data, mensaje: "Usuario Creado", confirmation: true, icon: "success" })
                                })
                                .catch(err => {
                                    res.send(err)
                                })
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
}

/**
 * Utilizamos el metodo FindOne de mongoose para encontrar al usuario ingresado y el metodo compare de bcrypt para validar la contraseña
 */
exports.findOneUser = (req, res) => {
    const username = req.body.user
    users.findOne({ user: username })
        .then(user => {
            if (!user) {
                res.status(500).send({ message: "Usuario inexistente" })
            } else {
                bcrypt.compare(req.body.password, user.password, function (err, result) {
                    if (result) {
                        res.redirect('/principal')
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

/**
 * Utilizamos un IF para confirmar si en la URL existen parametros
 * Si existen parametros, capturamos este  parametro y lo utilizamos para con el metodo findById de mongoose hacer una busqueda en la base de datos utilizando el ID
 * De no existir parametros se utilizar el metodo find de mongoose para obtener todos los registros de la coleccion
 */
exports.findUsers = (req, res) => {
    if (req.query.id) {
        const id = req.query.id
        users.findById(id)
            .then(user => {
                if (!user) {
                    res.status(404).send({ message: "No se pudo encontrar a este usuario" })
                } else {
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

/** 
 * Se valida que no existan campos vacios
 * Mediante el metodo findByIdAndUpdate actualizamos el documento haciendo uso del ID que se manda como parametro en la URL
*/
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
                axios.get('http://localhost:80/api/users')
                    .then(function (response) {
                        res.render('usuarios', { users: response.data, mensaje: "Datos Actualizados", confirmation: true, icon: "success" })
                    })
                    .catch(err => {
                        res.send(err)
                    })
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al intentar actualizar la informacion" })
        })
}

/** 
 * Se valida que no existan campos vacios
 * Mediante el metodo findByIdAndDelete eliminamos el documento haciendo uso del ID que se manda como parametro en la URL
*/
exports.deleteUser = (req, res) => {
    const id = req.query.id
    users.findByIdAndDelete(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `No se puede eliminar este usuario, es posible que no exista` })
            } else {
                axios.get('http://localhost:80/api/users')
                    .then(function (response) {
                        res.render('usuarios', { users: response.data, mensaje: "Ususario eliminado", confirmation: true, icon: "success" })
                    })
                    .catch(err => {
                        res.send(err)
                    })
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al intentar eliminar la informacion" })
        })
}

/**  
 * obtenemos el parametro de la URL (key) y lo utilizamos para hacer una 
 * busqueda en la collecion donde se busca una coincidencia entre los 
 * datos que tienen los campos que se especifica y el parametro que se envia
*/
exports.searchUsers = async (req, res) => {
    const key = req.params.key
    users.find(
        {
            "$or": [
                { name: { $regex: key } },
                { lastname: { $regex: key } },
                { email: { $regex: key } },
                { user: { $regex: key } }
            ]
        }
    )
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Sin datos` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.send(err)
        })

}