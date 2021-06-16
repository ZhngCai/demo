/** @format */
import OSApi, { IRequestParams } from "@choiceform/os-api";
import { request } from "@tarojs/taro";
import storage from "../util/storage";
import { HOST } from "./api";

let api: OSApi;

/**
 * api对象
 */
export function getApi() {
  const session = storage.get("session");


  let jwt: string = "";
  if (session) {
    jwt = JSON.parse(session).jwt;
  }

  console.log('jwt', jwt);

  if (jwt) {
    api = new OSApi(jwt, options);
  } else {
    // location.href = location.origin + "/error";
  }
  return api;
}

const options = {
  // host: HOST,
  request: async <T, U>({
    headers,
    ...params
  }: IRequestParams<U>): Promise<T> => {
    const resp = await request({ ...params, header: headers });
    return resp.data;
  },
};
