/**
 * Se declaran las constantes para mandar a llamar al controlador y las dependencias de node
 */
const comments = require('../models/comments')
const axios = require('axios')

/**
 * Por medio de la depencia de axios se obtiene la informacion de las API utilizando el metodo GET y se renderizan las paginas con la informacion obetnida
 * Haciendo uso ddel metodo SAVE de mongoose se guardan los datos en el servidor de Atlas
 */
exports.createComment = (req, res) => {
    if (!req.body.user || !req.body.comment || !req.body.review || !req.body.product) {
        res.send('no se permiten campos vacios')
    } else {
        const newComment = new comments({
            comment: req.body.comment,
            review: Number(req.body.review),
            client: req.body.user,
            product: req.body.product
        })

        newComment
            .save(newComment)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: `Ocurrio un error al intentar subir los datos` })
                } else {
                    axios.get('http://localhost:3000/api/brands')
                        .then(function (response) {
                            axios.get('http://localhost:3000/api/categories')
                                .then(function (categories) {
                                    axios.get('http://localhost:3000/api/products')
                                        .then(function (product) {
                                            res.render('index', { branches: response.data, categories: categories.data, products: product.data, mensaje: "Comentario creado exitosamente", confirmation: true, icon: "success", user: req.body.user })
                                        })

                                })

                        })
                        .catch(err => {
                            res.send(err)
                        })
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Ocurrio un error al intentar ingresar el comentario"
                })
            })
    }
}

/**  
 * obtenemos el parametro de la URL (key) y lo utilizamos para hacer una 
 * busqueda en la collecion donde se busca una coincidencia entre los 
 * datos que tienen los campos que se especifica y el parametro que se envia
*/
exports.findComments = (req, res) => {
    const key = req.params.key
    comments.find(
        {
            "$or": [
                { product: { $regex: key } }
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

/** 
 * Mediante el metodo findByIdAndDelete eliminamos el documento haciendo uso del ID que se manda como parametro en la URL
*/
exports.deleteComment = (req, res) => {
    const id = req.query.id
    comments.findByIdAndDelete(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: 'Producto no encontrado' })
            } else {
                res.redirect('/productos')
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al intentar eliminar la informacion" })
        })

}