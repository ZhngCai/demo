# 如何生成文档
命令行执行`yarn doc`即可生成文档和说明文件：
+ 描述文件（d.ts）在`fake-request-declaration`
+ JSON描述文件在`api-index`
+ 文档（HTML）在`docs`

# 注意事项
**目前的文档生成规则只支持以下两种写法，请编写fake接口时遵守以下格式**
```typescript
interface IFakeRequest1Props {
  /**
   * value1 comment
   */
  value1: string;
  value2?: string;
  [key: string]: string;
}

const group = {
  /**
   * comment1
   */
  fake_request_1: <IFakeServerWorker<IFakeRequest1Props>> { ... },
  /**
   * comment2
   */
  fake_request_1: <IFakeServerWorker<{ 
    /**
     * value1 comment
     */
    value1: string; 
    value2?: string; 
    [key: string]: string; 
  }>> { ... },
}
```

# 踩坑总结
+ 两个ts文件不能同时声明相同名字的变量 [tsConfig 配置相关](https://www.cnblogs.com/libinfs/p/11857187.html)
+ 如何直接运行ts代码（支持import等写法） [ts-node](https://github.com/TypeStrong/ts-node)
+ 如何在Chrome浏览器调试node代码（打断点） [node --inspect](https://nodejs.org/zh-cn/docs/guides/debugging-getting-started/)
+ typedoc无法正常生成文档，原因是typescript去检查node_modules里的@types不规范声明文件 [skipLibCheck](https://github.com/webpack/webpack/issues/12185)

# 参考资料
[node.js (path, fs)](https://nodejs.org/dist/latest-v14.x/docs/api/)
[ts-morph](https://github.com/dsherret/ts-morph/tree/latest/packages/ts-morph)

# 辅助工具
[TypeScript AST Viewer](https://ts-ast-viewer.com/)
