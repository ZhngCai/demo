import fs from 'fs';
import { isTypeScriptFile } from './utils';

/**
 * 映射类：记录修改时间和创建时间
 * 用来保存文件/文件夹的创建时间和修改时间，并生成json文件
 *
 * @class ModifyMap 
 * @method add 添加记录
 * @method writeFile 创建/更新json文件
 * @method getOldMap 读取旧的map文件
 */
export class ModifyMap {
  
  private mapFilePath: string;
  private map: { [path: string]: string };
  private oldMap: { [path: string]: string };

  constructor(path?: string) {
    this.mapFilePath = path || 'spec/modify-map.json';
    this.map = {};
    this.oldMap = {};
    this.getOldMap();
  }

  /**
   * 添加记录
   *
   * @param {string} path 文件/文件夹路径
   * @param {fs.Stats} stats fs.statSync的值
   * @memberof ModifyMap
   */
  add(path: string, stats: fs.Stats): void {
    const { ctimeMs, mtimeMs } = stats;
    this.map[path] = `${ctimeMs} - ${mtimeMs}`
  }

  /**
   * 创建json文件
   *
   * @param {string} [path] 生成路径，默认为'spec/modify-map.json'
   * @memberof ModifyMap
   */
  writeFile(path?: string): void {
    path = path || this.mapFilePath;
    const pathArr = path.split('/');
    const folderPath = pathArr.splice(0, pathArr.length - 1).join('/');
    if (!fs.existsSync(path)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    fs.writeFile(
      path,
      JSON.stringify(this.map),
      (err) => {
        if (!err) {
          console.log('修改记录文件创建成功');
        }
      }
    )
  }

  /**
   * 获取旧的map文件
   *
   * @param {string} [path]
   * @return {*}  {{ [path: string]: string }}
   * @memberof ModifyMap
   */
  getOldMap(path?: string): { [path: string]: string } {
    path = path || this.mapFilePath;
    if (!fs.existsSync(path)) return {};
    const sourceFile = fs.readFileSync(path, 'utf-8');
    const oldMap = JSON.parse(sourceFile);
    this.oldMap = oldMap;
    return oldMap;
  }

  getDifference(): { createFiles: string[], removeFiles: string[], removeFolders: string[] } {
    // 合并新旧修改记录文件的路径信息
    const { oldMap, map } = this;
    const oldMapPaths = Object.keys(oldMap);
    const mapPaths = Object.keys(map);
    const allPaths = new Set([...oldMapPaths, ...mapPaths]);

    // 收集路径信息，并按操作需求分类
    const createFiles: string[] = []; // 需要创建的文件列表
    const removeFiles: string[] = []; // 需要删除的文件列表
    const removeFolders: string[] = []; // 需要删除的文件夹列表
    allPaths.forEach(path => {
      const isTsFile = isTypeScriptFile(path);

      const oldModifyTime = oldMap[path];
      // 这个路径不存在于旧记录，按新增处理
      if (!oldModifyTime) {
        // 收集需要新增的文件路径
        if (isTsFile) {
          createFiles.push(path)
        }
        return;
      }

      const newModifyTime = map[path];
      // 这个路径不存在于新记录，按删除处理
      if (!newModifyTime) {
        // 收集需要删除的文件路径和文件夹路径
        if (isTsFile) {
          removeFiles.push(path);
        } else {
          removeFolders.push(path);
        }
        return;
      }

      // 新旧记录不一致，按修改处理
      if (oldModifyTime !== newModifyTime) {
        // 收集需要修改的文件路径（先删除，在创建）
        if (isTsFile) {
          removeFiles.push(path);
          createFiles.push(path);
        } else {
          removeFolders.push(path);
        }
        return;
      }
    })

    return { createFiles, removeFiles, removeFolders }
  }
}