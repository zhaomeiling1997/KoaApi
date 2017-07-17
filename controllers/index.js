const fs = require('fs')
const LoginSev = require('../models/login.js')

var products = [{
    name: 'iPhone',
    price: 6999
}, {
    name: 'Kindle',
    price: 999
}];

module.exports = {
    'GET /api/products': async (ctx, next) => {
        ctx.rest('QM88888', 'ada', products)
    },
    'GET /': async (ctx, next) => {
        ctx.response.body = await new Promise(function(reslove, reject) {
            fs.readFile(C.dir.server + '/web/index.html', 'binary', function(err,data) {
                if (err) reject(err)
                else reslove(data)
            })
        })
    },
    'GET /api/login': async (ctx, next) => {
        ctx.rest('QM88888', 'Ok', await LoginSev.getLoginByPhone('17600082709'))
    },
}