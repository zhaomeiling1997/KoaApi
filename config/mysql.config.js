const Sequelize = require('sequelize')

const koaApi = new Sequelize('mysql://' + C.mysql.opts.user + ':' + C.mysql.opts.pass + '@' + C.mysql.url + '/' + C.mysql.name, {
  define: {
    timestamps: false
  }
})

module.exports = {
  koaApi
}