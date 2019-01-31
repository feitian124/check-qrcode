import jsQR from "jsqr";
import pixels from 'image-pixels';

async function check() {

  var imgs = document.getElementsByTagName("img");
  for (var i=0, len=imgs.length; i<len; i++) {
    try {
      var {data, width, height} = await pixels(imgs[i].src);
      const code = jsQR(data, width, height);
      if (code) {
        console.log(imgs[i], " Found QR code, value is: ", code.data);
        imgs[i].src = 'http://iph.href.lu/' + width + 'x'+ height +'?text=禁';
      }
    } catch (error) {
      console.error('get image data error:', imgs[i].src)
    }
  }
}

check();
