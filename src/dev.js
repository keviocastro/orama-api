const config = require('./../config')
const fs = require('fs')
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
                    record.image = replaceBaseUrl(record.image)

                if (record.logo)
                    record.logo = replaceBaseUrl(record.logo)

                if (record.highligh_image)
                    record.highligh_image = replaceBaseUrl(record.highligh_image)

                if (record.latest_posts)
                    record.latest_posts = record.latest_posts.map((post) => {
                        post.image = replaceBaseUrl(post.image)
                        return post
                    })

                return record;
            })
        }
    })
    
    console.log('API ON: http://'+config.host);
    return dbJSON;
}

const replaceBaseUrl = url => {
    return url.replace(
        'http://api.o-rama.store/',
        'http://' + config.host + ':' + config.port + '/')
}
