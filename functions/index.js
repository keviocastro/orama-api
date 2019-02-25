const functions = require('firebase-functions')
const path  = require('path')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, './db.json'))
const middlewares = jsonServer.defaults()

server.use(jsonServer.bodyParser)

middlewares.push(require(path.join(__dirname,'./uploadImageMiddleware')))
middlewares.push(require(path.join(__dirname,'./prepareBodyMiddleware')))
server.use(middlewares)

server.use(router)

exports.api = functions.https.onRequest(server)
