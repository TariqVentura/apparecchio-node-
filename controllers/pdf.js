const fs = require('fs')
const pdf = require('pdf-creator-node')
const path = require('path')
const axios = require('axios')
const options = require('../helpers/format/options')


exports.getInvoice = (req, res) => {
    const html = fs.readFileSync(path.join(__dirname, '../helpers/templates/bill.html'), 'utf-8')
    const fileName = req.params.key + '.pdf'

    axios.get('http://localhost:3000/api/details' + '/' + req.params.key)
        .then(function (detail) {
            let document = {
                html: html,
                data: {
                    details: detail.data,
                },
                path: "./docs/" + fileName,
                type: "",
            }
            pdf.create(document, options)
                .then(res => {
                    res.redirect('/carrito')
                }).catch(error => {
                    console.log(error)
                })
        })
        .catch(err => {
            res.send(err)
        })
}