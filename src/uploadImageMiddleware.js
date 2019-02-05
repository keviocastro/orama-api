const fs = require('fs');
const path = require('path');

const removeBase64Header = base64String => base64String.split(';base64,').pop();
const checkExistParamImage = (req, paramName) => {
  const image = req.body[paramName];
  if (
    image &&
    Object.prototype.hasOwnProperty.call(image, 'base64') &&
    image.base64.search(';base64') > -1
  ) {
    return true;
  }
  return false;
};
const imageSave = (req, paramName, relativePaht) => {
  const image = req.body[paramName];
  const { id } = req.body;

  const base64Image = removeBase64Header(image.base64);
  const imageName = `${id}-${image.name}`;
  const imagePath = path.join(__dirname, `../public/${relativePaht}/${imageName}`);
  const imageUrl = `${req.protocol}://${req.headers.host}/${relativePaht}/${imageName}`;

  fs.writeFile(imagePath, base64Image, { encoding: 'base64' }, (err) => {
    if (err) {
      console.log('uploadImageMIddlware. Error while recording image: ', err);
    }
  });

  req.body[paramName] = imageUrl;
};

module.exports = (req, res, next) => {
  if (req.method === 'PUT' || req.method === 'POST') {
    if(req.originalUrl.search("segments")){
      if (checkExistParamImage(req, 'image')) {
        imageSave(req, 'image', 'images/segments');
      }
    }

    if(req.originalUrl.search("partners")){
      if (checkExistParamImage(req, 'logo')) {
        imageSave(req, 'logo', 'images/partners/logos');
      }

      if (checkExistParamImage(req, 'highlight_image')) {
        imageSave(req, 'highlight_image', 'images/partners/highlights');
      }

      console.log('feed', req.body)
      if (checkExistParamImage(req, 'feed_image')) {
        imageSave(req, 'feed_image', 'images/partners/feeds');
      }
    }
  }

  next();
};
