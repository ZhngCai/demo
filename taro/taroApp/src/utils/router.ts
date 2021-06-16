import { getCurrentInstance } from "@tarojs/taro";

/**
 * 获取页面参数
 * @returns
 */
export function getPageParams() {
  const page = getCurrentInstance();
  return page.router?.params || {};
}
