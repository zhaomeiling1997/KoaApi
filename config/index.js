const path = require('path'),
  serverRoot = path.dirname(__dirname),
  dev = require('./dev.config.js'),
  prod = require('./prod.config.js'),
  _ = require('lodash')

let config = {
  app: {
    name: 'koa',
    port: 888,
    adminPath: '/api',
    staticPath: '/static',
  },
  apiCode: {
    errCode: 'QM40004',
    normalCode: 'QM88888'
  },
  debug: false,
  env: 'development',
  dir: {
    server: serverRoot,
    controller: path.join(serverRoot, 'controllers'),
    resource: path.join(serverRoot, 'resource'),
    upload: path.join(serverRoot, 'resource', 'upload')
  }
}

// 本地调试环境
if (process.env.NODE_ENV === 'development') {
  config = _.merge(config, dev)
}

// 生产环境
if (process.env.NODE_ENV === 'production') {
  config = _.merge(config, prod)
}

module.exports = config