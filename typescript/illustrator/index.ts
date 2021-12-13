import {
  Project,
  ObjectLiteralExpression,
  PropertyAssignment,
  Node,
  TypeAssertion,
  TypeReferenceNode,
  OptionalKind,
  ParameterDeclarationStructure,
  JSDocTagStructure
} from "ts-morph";
import {
  transformToSourcePath,
  getClassNameByPath,
  // deleteOldSourceFiles,
  ProcessTypeNodeIntoParamsDescriptionObject,
  ProcessParamsIntoParametersAndDocsTags,
  getFakeRequestURL,
  transformToJSONSourcePath
} from './utils';
import paths from './resolve-file-path';
// 删除旧描述文件
// deleteOldSourceFiles();

if (paths.length > 0) {
  console.log('index>>>>>');

  // 创建AST项目，并读取符合处理条件的源文件
  const project = new Project();
  project.addSourceFilesAtPaths(paths);

  paths.forEach(path => {
    // 获取源文件
    const sourceFile = project.getSourceFile(path);

    // 获取group并收集group中的方法（fake-request）
    const groupDeclaration = sourceFile.getVariableDeclaration('group');
    // 有些ts文件只是用来存一些处理方法或常量数据，没有group对象，如果不是执行文件则跳过编译
    if (!groupDeclaration) return
    const groupExpression = (groupDeclaration.getInitializer()) as ObjectLiteralExpression;

    // 生成类文件和对应的类
    const classFilePath = transformToSourcePath(path);
    const classFile = project.createSourceFile(classFilePath);
    const interfaceDeclaration = classFile.addInterface({
      name: getClassNameByPath(path)
    });

    // 把group上所有fake-request方法写入到生成的类中
    groupExpression.getProperties().forEach((property) => {
      // 如果group中有不符合规范的，则不生成类，例如参数中存在展开运算符
      if (!Node.isPropertyAssignment(property)) return;

      // 下面三步为了获取fakeRequest的对象表达式。
      // 由于此处要根据AST结构进行查找，需要对树节点有比较清晰的认识，
      // 如果迷惑，建议使用TypeScript AST Viewer，方便理解。
      // 地址：https://ts-ast-viewer.com/
      console.log(`${path} => ${property.getName()}`)
      property = property as PropertyAssignment;
      const typeAssertion = property.getInitializer() as TypeAssertion;

      // 获取fake-request方法的描述信息
      let fakeRequestComment = '';
      property.getChildren().forEach(child => {
        if (Node.isJSDoc(child)) {
          fakeRequestComment += child.getComment();
        }
      });

      // 获取fake-request方法参数
      let parameters: OptionalKind<ParameterDeclarationStructure>[] = [];
      let docsTags: OptionalKind<JSDocTagStructure>[] = [];
      let paramsDescriptionObject = [];
      let loose = false;
      // 有些接口不按规则写，没有<IFakeServerWorkerGroup<T>>结构，这里作下兼容
      if (typeAssertion.getTypeNode) {
        const parameterTypes = typeAssertion.getTypeNode() as TypeReferenceNode;
        const [params, isLoose] = ProcessTypeNodeIntoParamsDescriptionObject(parameterTypes, sourceFile);
        const {
          parameters: newParameters,
          docsTags: newDocsTags
        } = ProcessParamsIntoParametersAndDocsTags(params);
        parameters = newParameters;
        docsTags = newDocsTags;
        paramsDescriptionObject = params;
        loose = isLoose;
      }

      // 获取fake-request名称
      const fakeRequestName = property.getName();

      // 拼接fake-request描述信息
      const fakeRequestDescription = `${fakeRequestComment}\n\n接口地址：\n${getFakeRequestURL(path, fakeRequestName)}\n`;

      // 写入方法
      interfaceDeclaration.addMethod({
        name: fakeRequestName,
        parameters,
        returnType: '{ result: string, message: string }',
        docs: [{
          description: fakeRequestDescription,
          tags: docsTags,
        }]
      });
      console.log(fakeRequestName, "=>", parameters, "=>", fakeRequestDescription, "=>", docsTags);

      // create fake-request description json
      project.createSourceFile(
        transformToJSONSourcePath(path, fakeRequestName),
        `{
  "comment": "${fakeRequestDescription.replace(/\n/g, ' ')}",
  "loose": ${loose},
  "params": ${JSON.stringify(paramsDescriptionObject)}
}`
      );
    })
  })

  // 生成新描述文件
  project.saveSync();

}