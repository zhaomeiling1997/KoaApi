const koaApi = require('../config/mysql.config').koaApi,
      loginModel = '../schema/login'

const Login = koaApi.import(loginModel)

const getLoginByPhone = async (phone) => {
  const info = await Login.findOne({
    where: {
      phone: phone
    }
  })

  return info
}

module.exports = {
  getLoginByPhone
}