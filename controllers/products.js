var products = require('../models/products')

exports.createProduct = (req, res) => {
    //validar campos vacios
    if (!req.body) {
        res.status(400).send({ message: "El contenido no puede estar vacio" })
        return
    }

    //crear marca
    const newPorduct = new products({
        product: req.body.product,
        price: req.body.price,
        description: req.body.description,
        categorie: req.body.categorie,
        brand: req.body.brand,
        user: req.body.user,
        image: req.body.image,
        status: true
    })

    //guardar los datos en la base
    newPorduct
        .save(newPorduct)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrio un error mientras se ejecutaba el proceso"
            })
        })
}

exports.findProduct = (req, res) => {
    //obtener un solo registro por medio del id
    if (req.query.id) {
        const id = req.query.id
        products.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "No se pudo encontrar a este usuario" })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Ocurrio un error al intentar ejecutar el proceso" })
            })
    } else {
        //obetener todos los registros
        products.find()
            .then(product => {
                res.send(product)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Ocurrio un error al tratar de obtener la informacion" })
            })
    }
}