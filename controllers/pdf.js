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