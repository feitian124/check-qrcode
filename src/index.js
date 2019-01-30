import jsQR from "jsqr";
import _ from 'lodash'

function component() {
  var element = document.createElement('div');

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = _.join(['check', 'qrcode'], ' ');

  var imgs = document.getElementsByTagName("img");
  for (var i=0, len=imgs.length; i<len; i++) {
    console.log(imgs[i]);
    var width = imgs[i].naturalWidth;
    var height = imgs[i].naturalHeight;

    const code = jsQR(imageData, width, height);
    if (code) {
      console.log("Found QR code", code);
    }

  }

  return element;
}
  
document.body.appendChild(component());