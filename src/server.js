const path  = require('path')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, './../storage/db.json'))
const middlewares = jsonServer.defaults()

server.use(jsonServer.bodyParser)

middlewares.push(require(path.join(__dirname,'./uploadImageMiddleware')))
middlewares.push(require(path.join(__dirname,'./prepareBodyMiddleware')))
server.use(middlewares)

server.use(router)
server.listen(8080, () => {
  console.log('JSON Server is running')
})