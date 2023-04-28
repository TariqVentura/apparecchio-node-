/**
 * Se declaran las constantes para mandar a llamar al controlador y las dependencias de node
 */
const categories = require('../models/categories')
const axios = require('axios')

/**
 * Por medio de la depencia de axios se obtiene la informacion de las API utilizando el metodo GET y se renderizan las paginas con la informacion obetnida
 * Haciendo uso ddel metodo SAVE de mongoose se guardan los datos en el servidor de Atlas
 */
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

/**
 * Utilizamos un IF para confirmar si en la URL existen parametros
 * Si existen parametros, capturamos este  parametro y lo utilizamos para con el metodo findById de mongoose hacer una busqueda en la base de datos utilizando el ID
 * De no existir parametros se utilizar el metodo find de mongoose para obtener todos los registros de la coleccion
 */
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

/** 
 * Se valida que no existan campos vacios
 * Mediante el metodo findByIdAndUpdate actualizamos el documento haciendo uso del ID que se manda como parametro en la URL
*/
exports.updateCategorie = (req, res) => {
    //validar campos vacios
    if (!req.body.categorie || !req.body.image) {
        axios.get('http://localhost:80/api/categories')
            .then(function (response) {
                res.render('categorias', { categories: response.data, mensaje: "No se permiten campos vacios", confirmation: true, icon: "error" })
            })
            .catch(err => {
                res.send(err)
            })
    } else {
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
}

/** 
 * Mediante el metodo findByIdAndDelete eliminamos el documento haciendo uso del ID que se manda como parametro en la URL
*/
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

/**  
 * obtenemos el parametro de la URL (key) y lo utilizamos para hacer una 
 * busqueda en la collecion donde se busca una coincidencia entre los 
 * datos que tienen los campos que se especifica y el parametro que se envia
*/
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