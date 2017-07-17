let codes = require('../utils/code')

module.exports = {
	restify: (pathPrefix) => {
		pathPrefix = pathPrefix || '/api'
		return async(ctx, next) => {
			if (ctx.request.path.startsWith(pathPrefix)) {
				ctx.rest = (code, msg, data) => {
					ctx.response.type = 'application/json'
					ctx.response.body = {code, msg, data}
				}
				try {
					await next()
          if (ctx.response.body) {
            if (ctx.response.body.code !== C.apiCode.normalCode) {
              ctx.rest(ctx.response.body.code, codes[ctx.response.body.code], null)
            }
          } else {
            ctx.rest(C.apiCode.errCode, codes[C.apiCode.errCode], null)
          }
				} catch (e) {
					// 记录日志
				}
			} else {
				if (ctx.path !== '/' && !ctx.request.path.startsWith(C.app.staticPath)) {
					ctx.redirect('/')
				}
				await next()
			}
		}
	}
}