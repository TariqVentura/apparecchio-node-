let clients = require('../models/clients')

exports.createClient = (req, res) => {
     //validar campos vacios
     if (!req.body) {
        res.status(400).send({ message: "El contenido no puede estar vacio" })
        return
    }

    //crear categoria
    const newClient = new clients({
        categorie: req.body.categorie,
        image: req.body.image,
        status: req.body.status
    })

    //guardar los datos en la base
    newClient
        .save(newClient)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Error al insertar los datos`})
            }else{
                res.redirect('/clientes')
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrio un error mientras se ejecutaba el proceso"
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
                res.redirect('/clientes')
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Ocurrio un error al intentar actualizar la informacion"})
        })
}

exports.deleteClient = (req, res) => {
    const id = req.body.id
    clients.findByIdAndDelete(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `cliente no encontrado`})
            }else{
                res.redirect('/clientes')
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Ocurrio un error al intentar actualizar la informacion"})
        })
}