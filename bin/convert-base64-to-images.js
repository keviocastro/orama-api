const fs = require('fs')
const path = require('path')

const dbPath = path.join(__dirname, '../storage/db.json')
let DB = require(dbPath)

const base64ToJpg = (base64, imageName) => {
    base64 = base64.split(';base64,').pop()
    imageName = imageName.replace(/[^a-z0-9]/gi, '_').toLowerCase()
    imageRelativePath = `images/partners/logos/${imageName}.jpg`
    let imagePath = path.join(__dirname, `../public/${imageRelativePath}`)
    
    fs.writeFile(imagePath, base64, { encoding: 'base64' }, (err) => {
      if (err) {
        console.log('Error while saving image: ', err);
      }
    })
  
    return `http://orama.origamisapp.com/${imageRelativePath}`
}

const imageConvert = (entity) => {
    if(entity.logo != undefined && 
        entity.logo.uri != undefined && 
        entity.logo.uri.search(";base64,") != -1){
            entity.logo.uri = base64ToJpg(entity.logo.uri, `${entity.name}-${entity.id}`)
            delete entity.logo.name
    }

    if(entity.image != undefined && 
        entity.image.uri != undefined && 
        entity.image.uri.search(";base64,") != -1){
            entity.image.uri = base64ToJpg(entity.image.uri, `${entity.name}-${entity.id}`)
            delete entity.image.name
    }

    return entity
}

DB.partners = DB.partners.map((partner) => imageConvert(partner) )

DB.segments = DB.segments.map((segment) => imageConvert(segment) )

fs.writeFile(dbPath, JSON.stringify(DB, null, 4), (err) => {
    if(err) 
        console.log('Error while saving db: ', err) 
    else 
        console.log('Finish!')
})