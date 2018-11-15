const config = require('./../config')
const fs = require('fs')
const dns = require('dns')
const path = require('path')
const dbPath = path.join(__dirname, './../storage/db.json')


module.exports = () => {
    let rawData = fs.readFileSync(dbPath, function (err, data) {
        if (err) {
            throw err
        }
        return data
    })

    let dbJSON = JSON.parse(rawData)
    let resources = Object.keys(dbJSON)
    resources.forEach((resource) => {
        if (Array.isArray(dbJSON[resource])) {
            dbJSON[resource] = dbJSON[resource].map((record) => {
                if (record.image)
                    record.image.uri = replaceBaseUrl(record.image.uri)

                if (record.logo)
                    record.logo.uri = replaceBaseUrl(record.logo.uri)

                if (record.highligh_image)
                    record.highligh_image = replaceBaseUrl(record.highligh_image)

                if (record.latest_posts)
                    record.latest_posts = record.latest_posts.map((post) => {
                        post.image.uri = replaceBaseUrl(post.image.uri)
                        return post
                    })

                return record;
            })
        }
    })

    return dbJSON;
}

const replaceBaseUrl = url => {
    return url.replace(
        'http://orama.origamisapp.com/',
        'http://' + config.host + ':' + config.port + '/')
}