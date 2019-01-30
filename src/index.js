import jsQR from "jsqr";
import image from 'get-image-data';

function check() {

  var imgs = document.getElementsByTagName("img");
  for (var i=0, len=imgs.length; i<len; i++) {

    image(imgs[i].src, function(error, info) {
      const height = info.height
      const width = info.width
      const imageData = info.data

      const code = jsQR(imageData, width, height);

      if (code) {
        console.log("Found QR code, value is: ", code.data);
      }
    })

  }

}

check();
