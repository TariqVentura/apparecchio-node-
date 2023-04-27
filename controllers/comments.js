const comments = require('../models/comments')

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