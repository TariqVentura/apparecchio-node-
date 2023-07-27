/**
 * Se declaran las constantes para mandar a llamar al controlador y las dependencias de node
 */
const orders = require("../models/orders");
const orderDetails = require("../models/ordersDetails");
const products = require('../models/products')
const axios = require('axios')
const fecha = new Date()

/**
 * Por medio de la depencia de axios se obtiene la informacion de las API utilizando el metodo GET y se renderizan las paginas con la informacion obetnida
 * Haciendo uso ddel metodo SAVE de mongoose se guardan los datos en el servidor de Atlas
 */
exports.createOrder = (req, res) => {
  if (!req.body.name) {
    axios.get('http://localhost:3000/api/brands')
      .then(function (response) {
        axios.get('http://localhost:3000/api/categories')
          .then(function (categorie) {
            res.render('carrito', { branches: response.data, categories: categorie.data, mensaje: "No se permiten campos vacios", confirmation: true, icon: "error" })
          })
          .catch(err => {
            res.send(err)
          })
      })
      .catch(err => {
        res.send(err)
      })
  } else {
    let newDate = fecha.toISOString()
    const newOrder = new orders({
      name: req.body.name,
      client: req.body.user,
      date: newDate.substring(0, 10)
    })

    newOrder
      .save(newOrder)
      .then((order) => {
        if (order) {
          axios.get('http://localhost:3000/api/brands')
            .then(function (response) {
              axios.get('http://localhost:3000/api/categories')
                .then(function (categorie) {
                  axios.get('http://localhost:3000/api/orders' + '/' + req.body.user)
                    .then(function (order) {
                      res.render('carrito', { orders: order.data, branches: response.data, categories: categorie.data, mensaje: "Lista creada exitosamente", confirmation: true, icon: "success", user: req.body.user })
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
          axios.get('http://localhost:3000/api/brands')
            .then(function (response) {
              axios.get('http://localhost:3000/api/categories')
                .then(function (categorie) {
                  axios.get('http://localhost:3000/api/orders')
                    .then(function (order) {
                      res.render('carrito', { orders: order.data, branches: response.data, categories: categorie.data, mensaje: "Ocurrio un error al crear la Lista", confirmation: true, icon: "error" })
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
  }
}

exports.createDetail = (req, res) => {
  if (!req.body.amount) {
    axios.get('http://localhost:3000/api/brands')
      .then(function (response) {
        axios.get('http://localhost:3000/api/categories')
          .then(function (categories) {
            axios.get('http://localhost:3000/api/products')
              .then(function (product) {
                res.render('index', { branches: response.data, categories: categories.data, products: product.data, mensaje: "No se permiten campos vacios", confirmation: true, icon: "errorr", user: req.session.user })
              })

          })

      })
      .catch(err => {
        res.send(err)
      })
  } else {
    let total = Number(req.body.price) * Number(req.body.amount)
    const newDetail = new orderDetails({
      product: req.body.product,
      price: req.body.price,
      amount: req.body.amount,
      total: total.toFixed(2),
      order: req.body.order
    });

    newDetail
      .save(newDetail)
      .then((detail) => {
        if (detail) {
          const id = req.body.id
          const value = { stock: Number(req.body.stock) - Number(req.body.amount) }
          products.findByIdAndUpdate(id, value, { useFindAndModify: false })
            .then(data => {
              if (!data) {
                res.send('error')
              } else {
                axios.get('http://localhost:3000/api/brands')
                  .then(function (response) {
                    axios.get('http://localhost:3000/api/categories')
                      .then(function (categories) {
                        axios.get('http://localhost:3000/api/products')
                          .then(function (product) {
                            res.render('index', { branches: response.data, categories: categories.data, products: product.data, mensaje: "producto agregado", confirmation: true, icon: "success", user: req.session.user })
                          })

                      })

                  })
                  .catch(err => {
                    res.send(err)
                  })
              }
            })
            .catch(err => {
              res.send(err)
            })
        } else {
          res.status(500).send({
            message: "Error al guardar los datos",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Ocurrio un error mientras se ejecutaba el proceso",
        });
      });
  }

};

/**  
 * obtenemos el parametro de la URL (key) y lo utilizamos para hacer una 
 * busqueda en la collecion donde se busca una coincidencia entre los 
 * datos que tienen los campos que se especifica y el parametro que se envia
*/
exports.getOrders = (req, res) => {
  //obtener un solo registro por medio del id
  if (req.params.key) {
    const key = req.params.key;
    orders
      .find({
        $or: [{ client: { $regex: key } }, { status: { $regex: key } }, { date: { $regex: key } }, { name: { $regex: key } }],
      })
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: `Sin datos` });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.send(err);
      });
  } else {
    //obetener todos los registros
    orders
      .find()
      .then(order => {
        res.send(order)
      })
      .catch(err => {
        res.status(500).send({ message: err.message || "Ocurrio un error al tratar de obtener la informacion" })
      })
  }
};

/**  
 * obtenemos el parametro de la URL (key) y lo utilizamos para hacer una 
 * busqueda en la collecion donde se busca una coincidencia entre los 
 * datos que tienen los campos que se especifica y el parametro que se envia
*/
exports.getDetails = (req, res) => {
  const key = req.params.key;
  orderDetails
    .find({
      $or: [{ order: { $regex: key } }],
    })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Sin datos` });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.send(err);
    });
};

/** 
 * Se valida que no existan campos vacios
 * Mediante el metodo findByIdAndUpdate actualizamos el documento haciendo uso del ID que se manda como parametro en la URL
 * le asignamos al campo status el tipo "cancelado"
*/
exports.finishOrder = (req, res) => {
  let id = null
  if (req.query.id) {
    id = req.query.id;
    const value = { status: "cancelado" };
    orders
      .findByIdAndUpdate(id, value, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "No se encontro el pedido" });
        } else {
          axios.get('http://localhost/api/orders')
            .then(function (response) {
              res.render('pedidos', { pedidos: response.data, mensaje: "Se cancelo el pedido", confirmation: true, icon: "success" })
            })
            .catch(err => {
              res.send(err)
            })
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Ocurrio un error al intentar actualizar" });
      });
  } else if (req.body.id) {
    id = req.body.id
    const value = { status: "finalizado" };
    orders
      .findByIdAndUpdate(id, value, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "No se encontro el pedido" });
        } else {
          let user
          if (req.session.user) {
            user = req.session.user
          } else {
            user = 'no user'
          }
          axios.get('http://localhost:3000/api/brands')
            .then(function (response) {
              axios.get('http://localhost:3000/api/categories')
                .then(function (categories) {
                  res.render('index', { branches: response.data, categories: categories.data, mensaje: "Compra completada", confirmation: true, icon: "success", user: user })
                })

            })
            .catch(err => {
              res.send(err)
            })
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Ocurrio un error al intentar actualizar" });
      });
  }

};

exports.deleteDetail = (req, res) => {
  const key = req.params.key
  orderDetails.findByIdAndDelete(key, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.send('error')
      } else {

        let user
        if (req.session.user) {
          user = req.session.user
        } else {
          user = 'no user'
        }
        axios.get('http://localhost:3000/api/brands')
          .then(function (response) {
            axios.get('http://localhost:3000/api/categories')
              .then(function (categories) {
                res.render('index', { branches: response.data, categories: categories.data, mensaje: "Se elimino el producto", confirmation: true, icon: "success", user: user })
              })
          })
          .catch(err => {
            res.send(err)
          })
      }
    })
    .catch(err => {
      res.send(err)
    })
}

exports.countOrder = (req, res) => {
  orders.aggregate()
    .group({
      _id: "$status",
      count: { $count: {} }
    })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.send(err)
    })
}
