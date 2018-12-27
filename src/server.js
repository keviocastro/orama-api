const express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    // morgan = require('morgan'),
    restful = require('node-restful'),
    mongoose = restful.mongoose
const app = express()
const config = require('./../config')

// app.use(morgan('dev'))
app.use(bodyParser.urlencoded({'extended':'true'}))
app.use(bodyParser.json())
app.use(bodyParser.json({type:'application/vnd.api+json'}))
app.use(methodOverride())

mongoose.connect('mongodb://localhost/orama', { useNewUrlParser: true })
const Resource = app.resource = restful.model('segment', mongoose.Schema({
  name: String,
  image: String,
})).methods(['get', 'post', 'put', 'delete'])
Resource.register(app, '/segments')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error:'));
db.once('open', function() {
  console.log('mongo connected')
});

app.listen(config.port, () => {
  console.log('API running on port '+config.port)
})