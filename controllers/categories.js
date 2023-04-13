var categories = require('../models/categories')

exports.createCategorie = (req, res) => {
    //validar campos vacios
    if (!req.body) {
        res.status(400).send({ message: "El contenido no puede estar vacio" })
        return
    }

    //crear categoria
    const newCategorie = new categories({
        categorie: req.body.categorie,
        image: req.body.image,
        status: req.body.status
    })

    //guardar los datos en la base
    newCategorie
        .save(newCategorie)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrio un error mientras se ejecutaba el proceso"
            })
        })
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
    if(!req.body){
        return res
            .status(400)
            .send({ message : "No se puede actualizar si todos los campos estan vacios"})
    }

    const id = req.params.id
    categories.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Categoria no encontrada`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Ocurrio un error al intentar actualizar la informacion"})
        })
}

exports.deleteCategorie = (req, res) => {
    const id = req.params.id
    categories.findByIdAndDelete(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `No se puede eliminar esta categoria, es posible que no exista` })
            } else {
                res.send({ message: "Se elimino a la categoria exitosamente" })
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al intentar eliminar la informacion" })
        })
}
