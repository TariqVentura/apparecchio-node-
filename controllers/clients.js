const bcrypt = require('bcrypt')
let clients = require('../models/clients')

exports.createClient = (req, res) => {
     //validar campos vacios
     if (!req.body) {
        res.status(400).send({ message: "El contenido no puede estar vacio" })
        return
    }
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
                        res.redirect('/confirmacion')
                        console.log(req.body.name)
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

exports.updateClient = (req, res) => {
    //validar campos vacios
    if(!req.body){
        return res
            .status(400)
            .send({ message : "No se puede actualizar si todos los campos estan vacios"})
    }

    const id = req.body.id
    clients.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `cliente no encontrado`})
            }else{
                res.redirect('/actualizacion')
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Ocurrio un error al intentar actualizar la informacion"})
        })
}

exports.deleteClient = (req, res) => {
    const id = req.query.id
    clients.findByIdAndDelete(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `cliente no encontrado`})
            }else{
                res.redirect('/eliminacion')
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Ocurrio un error al intentar actualizar la informacion"})
        })
}

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