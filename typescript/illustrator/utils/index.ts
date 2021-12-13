import fs from 'fs';
import {
  TypeReferenceNode,
  Node,
  TypeLiteralNode,
  ParameterDeclarationStructure,
  JSDocTagStructure,
  OptionalKind,
  SourceFile,
  InterfaceDeclaration
} from 'ts-morph';
import { IParamsDescriptionObject } from '../types';

const BASE_PATH = 'spec/fake-request-declaration';
const BASE_FAKE_REQUEST_JSON = 'spec/api-index';
const BASE_FAKE_REQUEST_URL_PREFIX = 'https://public.choiceform.com/fake-request-exploits/dist';

/**
 * 把第一个字母变成大写
 *
 * @param {string} str 字符串
 * @return {*}  {string}
 */
const toUpperCaseFirstChat = (str: string): string => {
  const firstChat = str.charAt(0);
  if (/[A-Za-z]/.test(firstChat)) {
    str = firstChat.toUpperCase() + str.slice(1);
  }
  return str
}

/**
 * 根据路由生成类名
 *
 * @param {string} path
 * @return {*}  {string}
 */
export const getClassNameByPath = (path: string): string => {
  path = path.replace('.ts', '');
  const pathArr = path.split('/');
  pathArr.splice(0, 1);
  const className = pathArr.reduce((
    classNamePart,
    pathPart
  ) => {
    if (pathPart.includes('-')) {
      pathPart = pathPart
        .split('-')
        .map(item => toUpperCaseFirstChat(item))
        .join('');
    } else {
      pathPart = toUpperCaseFirstChat(pathPart);
    }
    classNamePart += pathPart;
    return classNamePart;
  }, '')
  return className
}

/**
 * 把路由前级（src）移除，并修改为fake-request-declaration
 * 例如：src/client/builtin/ui/option.ts => fake-request-declaration/client/builtin/ui/option.ts
 *
 * @param {string} path 原路径
 * @return {*}  {string} 修改后的路径
 */
export const transformToSourcePath = (path: string): string => {
  const newPathArr = path.replace('.ts', '.d.ts').split('/');
  newPathArr.splice(0, 1);
  return `${BASE_PATH}/${newPathArr.join('/')}`;
}

/**
 * 把路由转化为JSON文件的路由
 *
 * @param {string} path
 * @param {string} fakeRequestName
 * @return {*}  {string}
 */
export const transformToJSONSourcePath = (path: string, fakeRequestName: string): string => {
  const newPath = path.replace('src', '')
  return `${BASE_FAKE_REQUEST_JSON}${newPath}/${fakeRequestName}.json`
}

/**
 * 拼接接口地址
 *
 * @param {string} path 文件路径
 * @param {string} fakeRequestName 接口名词
 * @return {*}  {string}
 */
export const getFakeRequestURL = (path: string, fakeRequestName: string): string => {
  const urlPath = path.replace('.ts', '').replace('src', '');
  return `${BASE_FAKE_REQUEST_URL_PREFIX}${urlPath}/${fakeRequestName}`
}

/**
 * 判断路径是不是ts文件路径
 *
 * @param {string} path
 * @return {*}  {boolean}
 */
export const isTypeScriptFile = (path: string): boolean => {
  return path.endsWith('.ts');
}

/**
 * 删除所有的文件(将所有文件夹置空)
 *
 * @param {string} path 文件夹路径
 */
export const emptyDir = (path: string): void => {
  const files = fs.readdirSync(path)//读取该文件夹
  files.forEach((file) => {
    const nextFilePath = `${path}/${file}`
    const states = fs.statSync(nextFilePath)
    if (states.isDirectory()) {
      emptyDir(nextFilePath)
    } else {
      fs.unlinkSync(nextFilePath)
    }
  })
}

/**
 * 删除所有的空文件夹
 *
 * @param {string} path 文件夹路径
 */
export const rmEmptyDir = (path: string): void => {
  const files = fs.readdirSync(path)
  if (files.length === 0) {
    fs.rmdirSync(path)
  } else {
    let tempFiles = 0
    files.forEach((file) => {
      tempFiles++
      const nextFilePath = `${path}/${file}`
      rmEmptyDir(nextFilePath)
    })
    //删除母文件夹下的所有字空文件夹后，将母文件夹也删除
    if (tempFiles === files.length) {
      fs.rmdirSync(path)
    }
  }
}

/**
 * 删除旧文件
 */
export const deleteOldSourceFiles = (): void => {
  const exists = fs.existsSync(BASE_PATH);
  if (exists) {
    emptyDir(BASE_PATH);
    rmEmptyDir(BASE_PATH);
    emptyDir(BASE_FAKE_REQUEST_JSON);
    rmEmptyDir(BASE_FAKE_REQUEST_JSON);
  }
}

/**
  * 把类型描述节点转化成对象描述形式
  *
  * @param {(TypeLiteralNode | InterfaceDeclaration)} typeLiteralNode 类型描述节点
  * @return {*}  {[IParamsDescriptionObject[], boolean]}
  */
export const ProcessTypeLiteralNodeIntoParamsDescriptionObject = (
  typeLiteralNode: TypeLiteralNode | InterfaceDeclaration
): [IParamsDescriptionObject[], boolean] => {
  const params: IParamsDescriptionObject[] = [];
  let isLoose = false;
  typeLiteralNode
    .getMembers()
    .forEach(member => {
      if (!isLoose && Node.isIndexSignatureDeclaration(member)) {
        isLoose = true;
      }
      if (!Node.isPropertySignature(member)) return;

      const comment = member
        .getJsDocs()
        .map(jsDoc => jsDoc.getDescription())
        .join('\n');

      params.push({
        name: member.getName(),
        type: member.getType().getText(),
        optional: member.hasQuestionToken(),
        comment
      })
    })
  return [params, isLoose]
}

/**
 * 把参数类型转化成对象描述形式
 *
 * @param {TypeReferenceNode} typeReferenceNode IFakeServerWorker的泛型参数
 * @param {SourceFile} sourceFile 源文件
 * @return {*}  {[IParamsDescriptionObject[], boolean]}
 */
export const ProcessTypeNodeIntoParamsDescriptionObject = (
  typeReferenceNode: TypeReferenceNode,
  sourceFile: SourceFile
): [IParamsDescriptionObject[], boolean] => {
  const isLooseArr = [];
  let params: IParamsDescriptionObject[] = [];

  typeReferenceNode.getTypeArguments().forEach(typeNode => {
    let paramsTypeNode = null;

    // 处理A<B>这种写法
    if (Node.isTypeReferenceNode(typeNode)) {
      const interfaceName =
        (typeNode as TypeReferenceNode)
          .getTypeName()
          .getText();
      paramsTypeNode = sourceFile.getInterface(interfaceName);
    }

    // 处理A<{ value: string }>这种写法
    if (Node.isTypeLiteralNode(typeNode)) {
      paramsTypeNode = typeNode;
    }

    if (paramsTypeNode) {
      const [newParams, isLoose] = ProcessTypeLiteralNodeIntoParamsDescriptionObject(paramsTypeNode);
      params = params.concat(newParams);
      isLooseArr.push(isLoose)
    }
  })

  // 调整必填和非必填选项位置
  params.sort(param => param.optional ? 1 : -1);
  return [params, isLooseArr.some(i => i)]
}

interface IResultObj {
  parameters: OptionalKind<ParameterDeclarationStructure>[],
  docsTags: OptionalKind<JSDocTagStructure>[]
}
/**
 * 把参数转化成ts-morph添加方法的参数的形式
 *
 * @param {IParamsDescriptionObject[]} params 参数描述对象数组
 * @return {*}  {IResultObj}
 */
export const ProcessParamsIntoParametersAndDocsTags = (
  params: IParamsDescriptionObject[]
): IResultObj => {
  return params.reduce<IResultObj>((resultObj, param) => {
    const { name, type, optional, comment } = param;

    // 生成 parameter
    resultObj.parameters.push({
      name: `${name}${optional ? '?' : ''}`,
      type
    })

    // 生成 docsTags
    resultObj.docsTags.push({
      tagName: 'param',
      text: `${name} ${comment.replace('\n', ' ').trim()}`
    })

    return resultObj
  },
    {
      parameters: [],
      docsTags: []
    }
  )
}
