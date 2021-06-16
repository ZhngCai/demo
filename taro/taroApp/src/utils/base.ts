/** @format */
/**
 * 判断配置
 */
export function detectVersion() {
  let ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf("Android") > -1 || ua.indexOf("Linux") > -1) {
    return "Android";
  }
  if (ua.indexOf("like mac os x") > 0) {
    return "Iphone";
  }
  if (ua.indexOf("isapp") > 0) {
    return "App";
  }
  if (ua.indexOf("micromessenger") > 0) {
    return "Weapp";
  }
  return "";
}

/**
 * 判断是否是iphonex
 */
export function getIsIphonex() {
  var u = navigator.userAgent;
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  if (isIOS) {
    if (screen.height == 812 && screen.width == 375) {
      return true;
    } else {
      return false;
    }
  }
}
