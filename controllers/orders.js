/**
 * Se declaran las constantes para mandar a llamar al controlador y las dependencias de node
 */
const orders = require("../models/orders");
const orderDetails = require("../models/ordersDetails");
const axios = require('axios')

/**
 * Por medio de la depencia de axios se obtiene la informacion de las API utilizando el metodo GET y se renderizan las paginas con la informacion obetnida
 * Haciendo uso ddel metodo SAVE de mongoose se guardan los datos en el servidor de Atlas
 */
exports.createOrder = (req, res) => {
  //validar campos vacios
  if (!req.body) {
    res.status(400).send({ message: "El contenido no puede estar vacio" });
    return;
  }

  const newOrder = new orders({
    client: req.body.user,
  });

  newOrder
    .save(newOrder)
    .then((data) => {
      if (data) {
        const newDetail = new orderDetails({
          product: req.body.product,
          price: req.body.price,
          amount: req.body.amount,
          total: Number(req.body.price) * Number(req.body.amount),
          order: data._id
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
                err.message ||
                "Ocurrio un error mientras se ejecutaba el proceso",
            });
          });
      } else {
        res.status(500).semd({
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
        $or: [{ client: { $regex: key } }, { status: { $regex: key } }, { date: { $regex: key } }],
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

