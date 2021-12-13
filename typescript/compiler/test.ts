import ts from 'typescript'
// import path from 'path'

const program = ts.createProgram(['../src/math/test3.ts'], {});

const a = program.getSourceFiles();

console.log();

// console.log(a.map(item => item.fileName));


let checker = program.getTypeChecker();

// console.log(checker);

