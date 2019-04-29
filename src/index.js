import jsQR from "jsqr";
import pixels from 'image-pixels';

/**
 * 检测页面中的图片是否有二维码
 */
async function check() {
  var imgs = document.getElementsByTagName("img");
  for (var i=0, len=imgs.length; i<len; i++) {
    try {
      var {data, width, height} = await pixels(imgs[i].src);
      const code = jsQR(data, width, height);
      if (code) {
        console.log(imgs[i], " Found QR code, value is: ", code.data);
        imgs[i].src = '/static/forbidden.jpg';
      }
    } catch (error) {
      console.error('get image data error:', imgs[i].src)
    }
  }
}

/**
 * 全局 ajax 事件监听器, 用于检测动态加载的图片
 */
function addAjaxListener() {
  var req = new Object();
  req.tempOpen = XMLHttpRequest.prototype.open;
  req.tempSend = XMLHttpRequest.prototype.send;
  req.callback = function () {
    // this.method :the ajax method used
    // this.url    :the url of the requested script (including query string, if any) (urlencoded) 
    // this.data   :the data sent, if any ex: foo=bar&a=b (urlencoded)
    console.log('ajax method:' + req.method);
    console.log('ajax url:' + req.url);
    console.log('ajax data:' + req.data);
    check();
  }
  
  XMLHttpRequest.prototype.open = function(a,b) {
    if (!a) var a='';
    if (!b) var b='';
    req.tempOpen.apply(this, arguments);
    req.method = a;  
    req.url = b;
    if (a.toLowerCase() == 'get') {
      req.data = b.split('?');
      req.data = req.data[1];
    }
  }
  
  XMLHttpRequest.prototype.send = function(a,b) {
    if (!a) var a='';
    if (!b) var b='';
    req.tempSend.apply(this, arguments);
    if(req.method.toLowerCase() == 'post')req.data = a;
    req.callback();
  }
}

addAjaxListener();
check();
