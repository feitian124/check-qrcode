import jsQR from "jsqr";
import _ from 'lodash';
import image from 'get-image-data';

function component() {
  var element = document.createElement('div');

  element.innerHTML = _.join(['check', 'qrcode'], ' ');

  var imgs = document.getElementsByTagName("img");
  for (var i=0, len=imgs.length; i<len; i++) {

    image(imgs[i].src, function(error, info) {
      var height = info.height
      var width = info.width
      var imageData = info.data

      const code = jsQR(imageData, width, height);

      if (code) {
        console.log("Found QR code, value is: ", code.data);
      }
    })

  }

  return element;
}
  
document.body.appendChild(component());