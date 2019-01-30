import jsQR from "jsqr";
import _ from 'lodash';
import image from 'get-image-data';

function component() {
  var element = document.createElement('div');

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = _.join(['check', 'qrcode'], ' ');

  var imgs = document.getElementsByTagName("img");
  for (var i=0, len=imgs.length; i<len; i++) {
    console.log(imgs[i]);
    var width = imgs[i].naturalWidth;
    var height = imgs[i].naturalHeight;

    image(imgs[i].src, function(error, info) {
      var height = info.height
      var width = info.width
      var imageData = info.data

      const code = jsQR(imageData, width, height);
      if (code) {
        console.log("Found QR code", code);
      }
    })

  }

  return element;
}
  
document.body.appendChild(component());