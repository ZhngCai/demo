

// import {
//   Project,
//   ObjectLiteralExpression,
//   PropertyAssignment,
//   Node,
//   TypeAssertion,
//   TypeReferenceNode,
//   OptionalKind,
//   ParameterDeclarationStructure,
//   JSDocTagStructure
// } from "ts-morph";
const fs = require('fs')
const path = require('path')

function _fileDisplay(filePath: string): void {
  console.log(filePath);

  // 根据文件路径读取文件，返回一个文件列表
  const files = fs.readdirSync(filePath);
  // 遍历读取到的文件列表
  for (const filename of files) {

    // path.join得到当前文件的绝对路径
    const filepath = path.join(filePath, filename);
    paths.push(filepath);
  }
}
const paths: string[] = [];
_fileDisplay('../src/math');
console.log("files>>>", paths);
