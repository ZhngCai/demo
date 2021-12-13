import path from 'path';
import fs from 'fs';
import { ModifyMap } from './modify-map'
import {
  rmEmptyDir,
  emptyDir,
  transformToSourcePath
} from './utils';
console.log('resolve-file-path>>>>>>>>');

const paths: string[] = [];
const modifyMap = new ModifyMap();

function isExcluded(pathName) {
  const result = [/demo/, /training/, /assets/].some(reg => {
    return reg.test(pathName);
  })
  return result;
}

function isInclude(pathName) {
  const result = [/\/[^.]+\.ts/].every(reg => {
    return reg.test(pathName);
  })
  return result;
}

function isExists(path: string): boolean {
  return fs.existsSync(path)
}

/**
 * 删除路径内包含的所有空文件夹（包括路径自己）
 *
 * @param {string} path
 * @return {*}  {boolean}
 */
function rmEmptyFolderByPath(path: string): boolean {
  // 如果这个路径不存在，当作删除成功
  const exists = isExists(path);
  if (!exists) return true;

  // 如果这个路径只有自己，没有子文件或文件夹，则删除
  const files = fs.readdirSync(path);
  if (files.length === 0) {
    fs.rmdirSync(path);
    return true;
  }

  // 如果有子级，则递归查找
  const result = files.reduce((results, filename) => {
    const filepath = `${path}/${filename}`;
    const stats = fs.statSync(filepath);
    if (stats.isDirectory()) {
      results.push(rmEmptyFolderByPath(filepath));
    } else {
      results.push(false);
    }
    return results
  }, []).every(res => res);
  // 如果所有子级都是空文件夹，则删除自己
  if (result) {
    fs.rmdirSync(path);
  }

  return result
}

/**
 * 根据路径查找并收集文件
 *
 * @param {string} filePath
 */
function fileDisplay(filePath: string): void {

  // 根据文件路径读取文件，返回一个文件列表
  const files = fs.readdirSync(filePath);
  // 遍历读取到的文件列表
  for (const filename of files) {

    // path.join得到当前文件的绝对路径
    const filepath = path.join(filePath, filename);

    const stats = fs.statSync(filepath); // 根据文件路径获取文件信息
    const isFile = stats.isFile(); // 是否为文件
    const isDir = stats.isDirectory(); // 是否为文件夹

    if (isFile && isInclude(filepath)) {
      paths.push(filepath);
      modifyMap.add(filepath, stats); // 收集修改记录
    }
    if (isDir && !isExcluded(filepath)) {
      fileDisplay(filepath); // 递归，如果是文件夹，就继续遍历该文件夹里面的文件
      modifyMap.add(filepath, stats); // 收集修改记录
    }
  }
}

// 递归扫描要处理的文件
fileDisplay('./atest');
// 生成最新的修改记录文件
modifyMap.writeFile();
const {
  createFiles,
  removeFiles,
  removeFolders
} = modifyMap.getDifference();
// 删除旧文件
removeFiles.forEach(path => {
  // 删除声明文件(d.ts)
  const declarationFilePath = transformToSourcePath(path);
  isExists(declarationFilePath) && fs.unlinkSync(declarationFilePath);
  // 删除JSON文件
  const jsonFolderPath = path.replace('src', 'spec/api-index');
  try {
    if (isExists(jsonFolderPath)) {
      emptyDir(jsonFolderPath);
      rmEmptyDir(jsonFolderPath);
    }
  } catch (err) {
    console.log('rm json', path)
  }
})

// 删除旧文件夹 （临时做法，删除整个spec文件夹里的空文件夹）
if (removeFolders.length > 0) {
  rmEmptyFolderByPath('spec');
}

export default createFiles;