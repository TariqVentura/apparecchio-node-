/**
 * Se declaran las constantes para mandar a llamar al controlador y las dependencias de node
 */
const products = require('../models/products')
const axios = require('axios')

/**
 * Por medio de la depencia de axios se obtiene la informacion de las API utilizando el metodo GET y se renderizan las paginas con la informacion obetnida
 * Haciendo uso ddel metodo SAVE de mongoose se guardan los datos en el servidor de Atlas
 */
exports.createProduct = (req, res) => {
    //validar campos vacios
    if (!req.body.product || !req.body.price || !req.body.description) {
        axios.get('http://localhost:80/api/products')
            .then(function (response) {
                axios.get('http://localhost:80/api/categories')
                    .then(function (categorie) {
                        axios.get('http://localhost:80/api/brands')
                            .then(function (brand) {
                                res.render('productos', { products: response.data, categories: categorie.data, brands: brand.data, mensaje: "No se permiten campos vacios", confirmation: true, icon: 'error' })
                            })
                            .catch(err => {
                                res.send(err)
                            })
                    })
                    .catch(err => {
                        res.send(err)
                    })
            })
            .catch(err => {
                res.send(err)
            })
    } else {
        //crear marca
        const newPorduct = new products({
            product: req.body.product,
            price: req.body.price,
            description: req.body.description,
            categorie: req.body.categorie,
            brand: req.body.brand,
            user: req.body.user,
            stock: req.body.stock,
            image: req.body.image,
            status: true
        })

        //guardar los datos en la base
        newPorduct
            .save(newPorduct)
            .then(data => {
                if (data) {
                    axios.get('http://localhost:80/api/products')
                        .then(function (response) {
                            axios.get('http://localhost:80/api/categories')
                                .then(function (categorie) {
                                    axios.get('http://localhost:80/api/brands')
                                        .then(function (brand) {
                                            res.render('productos', { products: response.data, categories: categorie.data, brands: brand.data, mensaje: "Producto Ingresado", confirmation: true, icon: 'success' })
                                        })
                                        .catch(err => {
                                            res.send(err)
                                        })
                                })
                                .catch(err => {
                                    res.send(err)
                                })
                        })
                        .catch(err => {
                            res.send(err)
                        })
                } else {
                    res.status(500).semd({
                        message: "Error al guardar los datos"
                    })
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Ocurrio un error mientras se ejecutaba el proceso"
                })
            })
    }
}

/**
 * Utilizamos un IF para confirmar si en la URL existen parametros
 * Si existen parametros, capturamos este  parametro y lo utilizamos para con el metodo findById de mongoose hacer una busqueda en la base de datos utilizando el ID
 * De no existir parametros se utilizar el metodo find de mongoose para obtener todos los registros de la coleccion
 */
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

/** 
 * Se valida que no existan campos vacios
 * Mediante el metodo findByIdAndUpdate actualizamos el documento haciendo uso del ID que se manda como parametro en la URL
*/
exports.updateProduct = (req, res) => {
    const id = req.body.id
    products.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "No se encontro el producto" })
            } else {
                axios.get('http://localhost:80/api/products')
                    .then(function (response) {
                        axios.get('http://localhost:80/api/categories')
                            .then(function (categorie) {
                                axios.get('http://localhost:80/api/brands')
                                    .then(function (brand) {
                                        res.render('productos', { products: response.data, categories: categorie.data, brands: brand.data, mensaje: "Producto Actualizado", confirmation: true, icon: 'success' })
                                    })
                                    .catch(err => {
                                        res.send(err)
                                    })
                            })
                            .catch(err => {
                                res.send(err)
                            })
                    })
                    .catch(err => {
                        res.send(err)
                    })
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Ocurrio un error al intentar actualizar" })
        })
}

/** 
 * Mediante el metodo findByIdAndDelete eliminamos el documento haciendo uso del ID que se manda como parametro en la URL
*/
exports.deleteProduct = (req, res) => {
    const id = req.query.id
    products.findByIdAndDelete(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: 'Producto no encontrado' })
            } else {
                axios.get('http://localhost:80/api/products')
                    .then(function (response) {
                        axios.get('http://localhost:80/api/categories')
                            .then(function (categorie) {
                                axios.get('http://localhost:80/api/brands')
                                    .then(function (brand) {
                                        res.render('productos', { products: response.data, categories: categorie.data, brands: brand.data, mensaje: "Producto Eliminado", confirmation: true, icon: 'success' })
                                    })
                                    .catch(err => {
                                        res.send(err)
                                    })
                            })
                            .catch(err => {
                                res.send(err)
                            })
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
exports.searchProducts = async (req, res) => {
    const key = req.params.key
    products.find(
        {
            "$or": [
                { product: { $regex: key } },
                { categorie: { $regex: key } },
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

exports.countProduct = (req, res) => {
    products.find().count({ status: "true" }).then(count => {
        if (count) {
            products.find().count({ status: "false" }).then(countF => {
                if (countF) {
                    let data = [count, countF]
                    res.send(data)
                } else {
                    res.send('nada')
                }
            }).catch(err => {
                res.send(err)
            })
        } else {
            res.send('nada')
        }
    }).catch(err => {
        res.send(err)
    })
}

exports.countCategorie = (req, res) => {
    products.aggregate()
        .group({
            _id: "$categorie",
            count: { $count: {} }
        })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send(err)
        })
}

