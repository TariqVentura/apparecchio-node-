var categories = require('../models/categories')
const axios = require('axios')

exports.createCategorie = (req, res) => {
    //validar campos vacios
    if (!req.body.categorie || !req.body.image) {
        axios.get('http://localhost:80/api/categories')
            .then(function (response) {
                res.render('categorias', { categories: response.data, mensaje: "No se permiten campos vacios", confirmation: true, icon: "error" })
            })
            .catch(err => {
                res.send(err)
            })
    }
    else {
        const newCategorie = new categories({
            categorie: req.body.categorie,
            image: req.body.image,
            status: req.body.status
        })

        //guardar los datos en la base
        newCategorie
            .save(newCategorie)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: `Error al insertar los datos` })
                } else {
                    axios.get('http://localhost:80/api/categories')
                        .then(function (response) {
                            res.render('categorias', { categories: response.data, mensaje: "Categoria Creada", confirmation: true, icon: "success" })
                        })
                        .catch(err => {
                            res.send(err)
                        })
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Ocurrio un error mientras se ejecutaba el proceso"
                })
            })
    }
    //crear categoria

}

exports.findCategorie = (req, res) => {
    //obtener un solo registro por medio del id
    if (req.query.id) {
        const id = req.query.id
        categories.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "No se pudo encontrar a esa categoria" })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Ocurrio un error al intentar ejecutar el proceso" })
            })
    } else {
        //obetener todos los registros
        categories.find()
            .then(categorie => {
                res.send(categorie)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Ocurrio un error al tratar de obtener la informacion" })
            })
    }

}

exports.updateCategorie = (req, res) => {
    //validar campos vacios
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "No se puede actualizar si todos los campos estan vacios" })
    }

    const id = req.body.id
    categories.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Categoria no encontrada` })
            } else {
                axios.get('http://localhost:80/api/categories')
                    .then(function (response) {
                        res.render('categorias', { categories: response.data, mensaje: "Categoria Actualizada", confirmation: true, icon: "success" })
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

exports.deleteCategorie = (req, res) => {
    const id = req.query.id
    categories.findByIdAndDelete(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `No se puede eliminar esta categoria, es posible que no exista` })
            } else {
                axios.get('http://localhost:80/api/categories')
                    .then(function (response) {
                        res.render('categorias', { categories: response.data, mensaje: "Categoria Eliminada", confirmation: true, icon: "success" })
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

exports.searchCategories = async (req, res) => {
    const key = req.params.key
    categories.find(
        {
            "$or": [
                { categorie: { $regex: key } }
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