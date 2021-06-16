/** @format */

const pattern = {
  integer: /^-?[1-9][0-9]*$/,
  posInteger: /^[1-9][0-9]*$/,
};

export function formatNumber(value: any, type: string): boolean {
  let flag = false;
  switch (type) {
    /* 整数*/
    case "integer":
      flag = value === "" || pattern.integer.test(value);
      break;
    /* 正整数*/
    case "posInteger":
      flag = value === "" || pattern.posInteger.test(value);
      break;
    /* 非负整数*/
    case "noNegInteger":
      flag = value === "" || value === "0" || pattern.posInteger.test(value);
      break;
    default:
      break;
  }
  return flag;
}
