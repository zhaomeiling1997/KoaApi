const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
/*
  初始化日志系统所需要的文件夹
*/
{
  let fs = require('fs')
  let confirmPath = function (pathStr) {
    if (!fs.existsSync(pathStr)) {
      fs.mkdirSync(pathStr);
      console.log('createPath: ' + pathStr);
    }
  }
  let logConfig = require('./config/log.config')
  let initLogPath = function () {
  //创建log的根目录'logs'
  if (logConfig.baseLogPath) {
    confirmPath(logConfig.baseLogPath)
    //根据不同的logType创建不同的文件目录
      for (let i = 0, len = logConfig.appenders.length; i < len; i++) {
        if (logConfig.appenders[i].path) {
          confirmPath(logConfig.baseLogPath + logConfig.appenders[i].path)
        }
      }
    }
  }
  initLogPath()
}

global.C = require('./config')
global.L = require('./utils/log')

// logger
app.use(async (ctx, next) => {
  //响应开始时间
  const start = new Date()
  //响应间隔时间
  var ms
  try {
    //开始进入到下一个中间件
    await next()

    ms = new Date() - start
    //记录响应日志
    global.L.logResponse(ctx, ms)

  } catch (error) {
    
    ms = new Date() - start
    //记录异常日志
    global.L.logError(ctx, error, ms)
  }
})

/*
  解析原始request请求 把解析后的参数绑定到ctx.request.body中
  注意：务必将该方法放到router之上 请了解middleware的执行顺序
*/
app.use(bodyParser())

/*
  启动静态服务器中间件 拦截/static的资源请求
*/
app.use(require('./middleware/static')('/static', C.dir.server + '/web/static'))

/*
  格式化api接口的输出内容
*/
app.use(require('./middleware/rest').restify(C.app.adminPath))

/*
  引入koa-router
*/
app.use(require('./middleware/router')())

/*
  监听我们配置的端口
*/
app.listen(C.app.port, () => {
  console.log('Server is running')
})
