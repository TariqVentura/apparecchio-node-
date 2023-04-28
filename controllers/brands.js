/**
 * Se declaran las constantes para mandar a llamar al controlador y las dependencias de node
 */
const brands = require('../models/brands')
const axios = require('axios')

/**
 * Por medio de la depencia de axios se obtiene la informacion de las API utilizando el metodo GET y se renderizan las paginas con la informacion obetnida
 * Haciendo uso ddel metodo SAVE de mongoose se guardan los datos en el servidor de Atlas
 */
exports.craeteBrand = (req, res) => {
    //validar campos vacios
    if (!req.body.brand || !req.body.image) {
        axios.get('http://localhost:80/api/brands')
            .then(function (response) {
                res.render('marcas', { branches: response.data, mensaje: "No se permiten campos vacios", confirmation: true, icon: 'error' })
            })
            .catch(err => {
                res.send(err)
            })
    } else {
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
                    axios.get('http://localhost:80/api/brands')
                        .then(function (response) {
                            res.render('marcas', { branches: response.data, mensaje: "Marca Ingresada", confirmation: true, icon: 'success' })
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
    //crear marca

}

/**
 * Utilizamos un IF para confirmar si en la URL existen parametros
 * Si existen parametros, capturamos este  parametro y lo utilizamos para con el metodo findById de mongoose hacer una busqueda en la base de datos utilizando el ID
 * De no existir parametros se utilizar el metodo find de mongoose para obtener todos los registros de la coleccion
 */
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

/** 
 * Se valida que no existan campos vacios
 * Mediante el metodo findByIdAndUpdate actualizamos el documento haciendo uso del ID que se manda como parametro en la URL
*/
exports.updateBrand = (req, res) => {
    //validar campos vacios
    if (!req.body.brand || !req.body.image) {
        axios.get('http://localhost:80/api/brands')
            .then(function (response) {
                res.render('marcas', { branches: response.data, mensaje: "No se permiten campos vacios", confirmation: true, icon: 'error' })
            })
            .catch(err => {
                res.send(err)
            })
    } else {
        const id = req.body.id;
        brands.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: `Marca no encontrada` })
                } else {
                    axios.get('http://localhost:80/api/brands')
                        .then(function (response) {
                            res.render('marcas', { branches: response.data, mensaje: "Actualizacion Completada", confirmation: true, icon: "success" })
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
 * Se valida que no existan campos vacios
 * Mediante el metodo findByIdAndDelete eliminamos el documento haciendo uso del ID que se manda como parametro en la URL
*/
exports.deleteBrand = (req, res) => {
    const id = req.query.id
    brands.findByIdAndDelete(id, req.body, { useFindAndModify: false })
        .then(data => {
            axios.get('http://localhost:80/api/brands')
                .then(function (response) {
                    res.render('marcas', { branches: response.data, mensaje: "Marca eliminada", confirmation: true, icon: "success" })
                })
                .catch(err => {
                    res.send(err)
                })
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