/**
 * Se declaran las constantes para mandar a llamar al controlador y las dependencias de node
 */
const orders = require("../models/orders");
const orderDetails = require("../models/ordersDetails");
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
                  axios.get('http://localhost:3000/api/orders')
                    .then(function (order) {
                      res.render('carrito', { orders: order.data, branches: response.data, categories: categorie.data, mensaje: "Se creo la Lista Exitosamente", confirmation: true, icon: "success" })
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
  const newDetail = new orderDetails({
    product: req.body.product,
    price: req.body.price,
    amount: req.body.amount,
    total: Number(req.body.price) * Number(req.body.amount),
    order: req.body.order
  });

  newDetail
    .save(newDetail)
    .then((detail) => {
      if (detail) {
        res.send(detail);
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
      .then((product) => {
        res.send(product);
      })
      .catch((err) => {
        res
          .status(500)
          .send({
            message:
              err.message ||
              "Ocurrio un error al tratar de obtener la informacion",
          });
      });
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
  const id = req.query.id;
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
};

