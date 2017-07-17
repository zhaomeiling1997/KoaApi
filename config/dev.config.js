module.exports = {
  env: 'development',
  debug: true,
  mysql: {
    url: '',
    name: 'koa',
    opts: {
      user: 'root',
      pass: ''
    }
  },
  'jwt': {
    'cert': 'koa-dev'
  }
}