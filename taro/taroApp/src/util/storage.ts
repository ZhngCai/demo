import {
  getStorageSync,
  setStorageSync,
  removeStorageSync
} from "@tarojs/taro";

export interface IStorage {
  get(key: string): string;
  set(key: string, value: string): void;
  remove(key: string): void;
}
const storage: IStorage = {
  get: getStorageSync,
  set: setStorageSync,
  remove: removeStorageSync
};

export function initStorage() {
  return Promise.resolve();
}

export default storage;
