var brands = require('../models/brands')

exports.craeteBrand = (req, res) => {
    //validar campos vacios
    if (!req.body) {
        res.status(400).send({ message: "El contenido no puede estar vacio" })
        return
    }

    //crear marca
    const newBrand = new brands({
        brand: req.body.brand,
        image: req.body.image,
        status: req.body.status
    })

    //guardar los datos en la base
    newBrand
        .save(newBrand)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Ocurrio un error al intentar subir los datos` })
            } else {
                res.redirect('/confirmacion')
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrio un error mientras se ejecutaba el proceso"
            })
        })
}

exports.findBrand = (req, res) => {
    //obtener un solo registro por medio del id
    if (req.query.id) {
        const id = req.query.id
        brands.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "No se pudo encontrar a esta marca" })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Ocurrio un error al intentar ejecutar el proceso" })
            })
    } else {
        //obetener todos los registros
        brands.find()
            .then(brand => {
                res.send(brand)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Ocurrio un error al tratar de obtener la informacion" })
            })
    }
}

exports.updateBrand = (req, res) => {
    //validar campos vacios
    if(!req.body){
        return res
            .status(400)
            .send({ message : "No se puede actualizar si todos los campos estan vacios"})
    }

    const id = req.body.id;
    brands.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Marca no encontrada`})
            }else{
                res.redirect('/marcas')
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Ocurrio un error al intentar actualizar la informacion"})
        })
}

exports.deleteBrand = (req, res) => {
    const id = req.query.id
    brands.findByIdAndDelete(id, req.body, { useFindAndModify: false })
        .then(data => {
            res.redirect('/marcas')
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al intentar eliminar la informacion" })
        })
}

exports.searchBrands = async (req, res) => {
    const key = req.params.key
    brands.find(
        {
            "$or": [
                { brand: { $regex: key } }
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