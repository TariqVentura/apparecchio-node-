/**
 * Se declaran las constantes para mandar a llamar al controlador y las dependencias de node
 */
const bcrypt = require('bcrypt')
const clients = require('../models/clients')
const axios = require('axios')

/**
 * Por medio de la depencia de axios se obtiene la informacion de las API utilizando el metodo GET y se renderizan las paginas con la informacion obetnida
 * Haciendo uso ddel metodo SAVE de mongoose se guardan los datos en el servidor de Atlas
 * Se ocupa la dependencia bcrypt para encriptar las contraseñas mediante una funcion
 */
exports.createClient = (req, res) => {
    //validar campos vacios
    if (!req.body.name || !req.body.lastname || !req.body.email || !req.body.identity_card || !req.body.user || !req.body.password) {
        axios.get('http://localhost/api/clients')
            .then(function (response) {
                console.log(response.data)
                res.render('clientes', { clients: response.data, mensaje: "No se permiten campos vacios", confirmation: true, icon: "error" })
            })
            .catch(err => {
                res.send(err)
            })
    } else {
        //encriptar contraseña
        const saltRounds = 10
        const EncryptedPassword = req.body.password

        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(EncryptedPassword, salt, function (err, hash) {
                //crear usuario
                const newClient = new clients({
                    name: req.body.name,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    identity_card: req.body.identity_card,
                    user: req.body.user,
                    password: hash,
                    status: true
                })

                //guardar datos en la base
                newClient
                    .save(newClient)
                    .then(data => {
                        if (!data) {
                            res.status(404).send({ message: `Ocurrio un error al intentar subir los datos` })
                        } else {
                            if (req.body.public) {
                                req.session.authenticated = true
                                req.session.user = req.body.user
                                axios.get('http://localhost:3000/api/brands')
                                    .then(function (response) {
                                        axios.get('http://localhost:3000/api/categories')
                                            .then(function (categories) {
                                                res.render('index', { branches: response.data, categories: categories.data, mensaje: "Cuenta creada", confirmation: true, icon: "success", user: req.body.user })
                                            })

                                    })
                                    .catch(err => {
                                        res.send(err)
                                    })
                            } else {
                                axios.get('http://localhost/api/clients')
                                    .then(function (response) {
                                        console.log(response.data)
                                        res.render('clientes', { clients: response.data, mensaje: "Cliente Creado", confirmation: true, icon: "success" })
                                    })
                                    .catch(err => {
                                        res.send(err)
                                    })
                                console.log(req.body.name)
                            }

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
 * Utilizamos un IF para confirmar si en la URL existen parametros
 * Si existen parametros, capturamos este  parametro y lo utilizamos para con el metodo findById de mongoose hacer una busqueda en la base de datos utilizando el ID
 * De no existir parametros se utilizar el metodo find de mongoose para obtener todos los registros de la coleccion
 */
exports.findClient = (req, res) => {
    //obtener un solo registro por medio del id
    if (req.query.id) {
        const id = req.query.id
        clients.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "No se pudo encontrar a este cliente" })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Ocurrio un error al intentar ejecutar el proceso" })
            })
    } else {
        //obetener todos los registros
        clients.find()
            .then(client => {
                res.send(client)
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
exports.updateClient = (req, res) => {
    //validar campos vacios
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "No se puede actualizar si todos los campos estan vacios" })
    }

    const id = req.body.id
    clients.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `cliente no encontrado` })
            } else {
                axios.get('http://localhost/api/clients')
                    .then(function (response) {
                        console.log(response.data)
                        res.render('clientes', { clients: response.data, mensaje: "Cliente Actualizado", confirmation: true, icon: "success" })
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
 * Mediante el metodo findByIdAndDelete eliminamos el documento haciendo uso del ID que se manda como parametro en la URL
*/
exports.deleteClient = (req, res) => {
    const id = req.query.id
    clients.findByIdAndDelete(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `cliente no encontrado` })
            } else {
                axios.get('http://localhost/api/clients')
                    .then(function (response) {
                        console.log(response.data)
                        res.render('clientes', { clients: response.data, mensaje: "Cliente Elimando", confirmation: true, icon: "success" })
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
 * obtenemos el parametro de la URL (key) y lo utilizamos para hacer una 
 * busqueda en la collecion donde se busca una coincidencia entre los 
 * datos que tienen los campos que se especifica y el parametro que se envia
*/
exports.searchClients = async (req, res) => {
    const key = req.params.key
    clients.find(
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

exports.logClient = (req, res) => {
    const username = req.body.user
    clients.findOne({ user: username })
        .then(user => {
            if (!user) {
                res.status(500).send({ message: "Usuario inexistente" })
            } else {
                bcrypt.compare(req.body.password, user.password, function (err, result) {
                    if (result) {
                        if (req.session.authenticated) {
                            res.json(req.session)
                        } else {
                            req.session.authenticated = true
                            req.session.user = username
                            req.session.visitas = req.session.visitas ? ++req.session.visitas : 1
                            res.redirect('/')
                        }
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

exports.logOutClient = (req, res) => {
    req.session.destroy()
    return res.redirect('/')
}