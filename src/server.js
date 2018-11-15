const path = require('path')
const jsonServer = require('json-server')
const fileUpload = require('express-fileupload')
const config = require('./../config.json')

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

server.use(fileUpload)
server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
  console.log('Open http://localhost:3000/segments')
});
