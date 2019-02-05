const fs = require('fs')
const path = require('path')
const ip = require('ip')
const $configPath = path.join(__dirname, './../config.json')

let rawConfig = fs.readFileSync($configPath)
let config = JSON.parse(rawConfig)
config.host = ip.address()
rawConfig = JSON.stringify(config)
fs.writeFileSync($configPath, rawConfig)
