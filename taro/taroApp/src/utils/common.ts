/** @format */



/**
 * 判断是否是基本数据类型
 * @param value
 * @returns
 */
export const isBaseType = (value: any) => {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "symbol" ||
    typeof value === "boolean"
  );
};

export const isObject = (value: any) => {
  return Object.prototype.toString.call(value) === "[object Object]";
};

// 深度复制
export function deepClone<T>(params: T): T {
  function baseClone(value: any) {
    let res: any;
    if (isBaseType(value)) {
      return value;
    } else if (Array.isArray(value)) {
      res = [...value];
    } else if (isObject(value)) {
      res = { ...value };
    }
    Reflect.ownKeys(res).forEach((key) => {
      if (typeof res[key] === "object" && res[key] !== null) {
        res[key] = baseClone(res[key]);
      }
    });
    return res;
  }
  return baseClone(params);
}

/**
 * 获取本地缓存
 *
 * @param params
 * @returns
 */
export function getLocalStorage(params: string) {
  const value = localStorage.getItem(params);
  return value ? value : "";
}

/**
 * 加法
 * @param arg1
 * @param arg2
 * @returns
 */
export function accAdd(arg1: number, arg2: number) {
  var r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
}

/**
 * 减法
 * @param arg1
 * @param arg2
 * @returns
 */
export function accSubtr(arg1: number, arg2: number) {
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  //动态控制精度长度
  n = r1 >= r2 ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

/***
 * 乘法，获取精确乘法的结果值
 * @param arg1
 * @param arg2
 * @returns
 */
export function accMul(arg1: number, arg2: number) {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) {
    // console.log(e);
  }
  try {
    m += s2.split(".")[1].length;
  } catch (e) {
    // console.log(e);
  }
  return (
    (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
    Math.pow(10, m)
  );
}

/***
 * 除法，获取精确乘法的结果值
 * @param arg1
 * @param arg2
 * @returns
 */
export function accDivCoupon(arg1: number, arg2: number) {
  var t1 = 0,
    t2 = 0,
    r1,
    r2;
  try {
    t1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    // console.log(e);
  }
  try {
    t2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    // console.log(e);
  }
  r1 = Number(arg1.toString().replace(".", ""));
  r2 = Number(arg2.toString().replace(".", ""));
  return (r1 / r2) * Math.pow(10, t2 - t1);
}
