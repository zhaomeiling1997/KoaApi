const fs = require('fs')

function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4)
            router.get(path, mapping[url])
            console.log(`register URL mapping: GET ${path}`)
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5)
            router.post(path, mapping[url])
            console.log(`register URL mapping: POST ${path}`)
        } else {
            console.log(`invalid URL: ${url}`)
        }
    }
}

function addControllers(router) {
    var files = fs.readdirSync(C.dir.controller)
    var js_files = files.filter((file) => {
        return file.endsWith('.js')
    });

    for (var js_file of js_files) {
        console.log(`process controller: ${js_file}...`)
        let mapping = require(C.dir.controller + '/' + js_file)
        addMapping(router, mapping)
    }
}

module.exports = function () {
    let
        router = require('koa-router')()
    addControllers(router, C.app.controllersDir)
    return router.routes()
}