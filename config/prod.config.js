module.exports = {
  env: 'production',
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
    'cert': 'koa-prod'
  }
}