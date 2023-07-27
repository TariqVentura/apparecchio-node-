/**
 * Se utilizan las dependencias fs, pdf-creator-node, axios y el archivo options
 * fs nos ayuda a navegar entre los documentos creados en el servidor
 * pdf-creator-node crea el archivo pdf usando un template creado en herlpers y usando el archivo options para la configuracion del documento
 * axios utiliza las api previamente creadas para buscar la informacion que se utilizaran en los reportes
 */

const fs = require('fs')
const pdf = require('pdf-creator-node')
const path = require('path')
const axios = require('axios')
const options = require('../helpers/format/options')
const formatRecord = require('../helpers/format/records')
const formatOrder = require('../helpers/format/order')

exports.getInvoice = (req, res) => {
    const html = fs.readFileSync(path.join(__dirname, '../helpers/templates/bill.html'), 'utf-8')
    const fileName = req.params.key + '.pdf'

    axios.get('http://localhost:3000/api/details' + '/' + req.params.key)
        .then(function (detail) {
            const date = new Date()
            let obj = detail.data
            let total = 0
            let order
            let format = date.toISOString()

            obj.forEach(i => {
                total += i.total
                order = i.order
            });

            const data = {
                user: req.session.user,
                details: detail.data,
                total: total,
                _id: order,
                date: format.substring(0, 10)
            }

            let document = {
                html: html,
                data: {
                    data: data,
                },
                path: "./docs/" + fileName,
                type: "",
            }
            pdf.create(document, options)
                .then(p => {
                    res.redirect('/' + req.params.key + '.pdf')
                }).catch(error => {
                    console.log(error)
                })
        })
        .catch(err => {
            res.send(err)
        })
}

exports.getRecord = (req, res) => {
    const html = fs.readFileSync(path.join(__dirname, '../helpers/templates/report.html'), 'utf-8')
    const fileName = req.params.key + '_reporte' + '.pdf'

    axios.get('http://localhost/api/records' + '/' + req.params.key)
        .then(function (record) {
            const data = record.data
            const date = new Date()

            let format = date.toISOString().substring(0, 10)

            let obj = {
                data: data,
                date: format
            }

            let document = {
                html: html,
                data: {
                    obj: obj,
                },
                path: "./docs/" + fileName,
                type: "",
            }

            pdf.create(document, formatRecord)
                .then(p => {
                    res.redirect('/' + fileName)
                }).catch(error => {
                    console.log(error)
                })
        })
        .catch(err => {
            res.send(err)
        })
}

exports.getAllRecord = (req, res) => {
    const date = new Date()
    let format = date.toISOString().substring(0, 10)
    const html = fs.readFileSync(path.join(__dirname, '../helpers/templates/report.html'), 'utf-8')
    const fileName = 'Reporte_Productos_Stock_' + format + '.pdf'

    axios.get('http://localhost/api/records')
        .then(function (record) {
            const data = record.data

            let obj = {
                data: data,
                date: format
            }

            let document = {
                html: html,
                data: {
                    obj: obj,
                },
                path: "./docs/" + fileName,
                type: "",
            }

            pdf.create(document, formatRecord)
                .then(p => {
                    res.redirect('/' + fileName)
                }).catch(error => {
                    console.log(error)
                })
        })
        .catch(err => {
            res.send(err)
        })
}

exports.getOrdersReport = (req, res) => {
    const date = new Date()
    let format = date.toISOString().substring(0, 10)
    const html = fs.readFileSync(path.join(__dirname, '../helpers/templates/orders.html'), 'utf-8')
    const fileName = 'Reporte_Ordenes_' + req.params.key + '_' + format + '.pdf'

    axios.get('http://localhost/api/orders/' + req.params.key)
        .then(function (record) {
            const data = record.data

            let obj = {
                data: data,
                date: format
            }

            let document = {
                html: html,
                data: {
                    obj: obj,
                },
                path: "./docs/" + fileName,
                type: "",
            }

            pdf.create(document, formatOrder)
                .then(p => {
                    res.redirect('/' + fileName)
                }).catch(error => {
                    console.log(error)
                })
        })
        .catch(err => {
            res.send(err)
        })
}