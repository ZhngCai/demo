var fs = require('fs');
var ts = require('typescript');
// var TGROUP = require('../src/math/test.ts')
let writerStream = fs.createWriteStream('./replaceDesUtils.ts');
// import {TGROUP} from '../src/math/test.ts'

// 创建可读流
let readerStream = fs.createReadStream('../src/math/test.ts');
readerStream.setEncoding('UTF8');

let data = '';

// 处理流
readerStream.on('data', (chunk) => {
   data += chunk;
   // console.log(data);
//   data += "interface ClientTrainingLaiqiang {";
//   var patt1 = /\/\*[\s\S]*?\*\//g;
//   let group = {};
//   let patt2 = /(group)\s*(=)\s*\{[\s\S]*?\}/;
  
//   console.log("data>>>>>",ts);
//   data += chunk.match(patt2);
//   data+="}"
});

readerStream.on('end',() => {
   writerStream.end(data);
});

// 可不写
readerStream.on('error', (err) => {
   console.log(err.stack);
});