/**
 * Se declaran las constantes para mandar a llamar al controlador y las dependencias de node
 */
const comments = require('../models/comments')

/**
 * Por medio de la depencia de axios se obtiene la informacion de las API utilizando el metodo GET y se renderizan las paginas con la informacion obetnida
 * Haciendo uso ddel metodo SAVE de mongoose se guardan los datos en el servidor de Atlas
 */
exports.createComment = (req, res) => {
    const newComment = new comments({
        comment: req.body.comment,
        review: req.body.review,
        product: req.body.product,
        client: req.body.user
    })

    newComment
        .save(newComment)
        .then(data => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).send({ message: `Ocurrio un error al intentar subir los datos` })
            }
        })
        .catch(err => {
            res.send(err)
        })
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