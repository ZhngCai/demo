# vue-test-pay-keyboard


> 一个vue插件复用到其他项目的方法，详情到[这里](https://www.imooc.com/article/19691).

### vue插件使用

``` bash
ES6
import vuePayKeyboard from 'vue-pay-keyboard'

//  通过require 导入
var vuePayKeyboard = require('vuePayKeyboard')

// 通过use挂载
Vue.use(vuePayKeyboard)

// 或者直接导入js文件
<script src="./dist/vue-pay-keyboard.js"></script>
```


### vue插件的规范
vue官网有给出明确的文档[vue插件开发](https://cn.vuejs.org/v2/guide/plugins.html#开发插件) .

``` bash
// plug.js 
const plug = {  //  定义一个对象
    install (Vue, options) {  // 需要拥有一个 install 方法
    }
}
// 导出这个对象
export default plug
```

### 初始化项目
``` bash
vue init webpack-simple 项目名称
```

### 初始化项目
``` bash
vue init webpack-simple 项目名称
```

### 修改 weppack.config.js 部分配置
``` bash
module.exports = {
 // entry: './src/main.js',  // 项目入口 我们通过npm run dev 就是从这里进去的 我们通过run build 打包编译也是
  // 因为我们要打包的插件在lib里面 所以稍稍改一下
   entry: './src/lib/index.js', // 注释掉原有的
  output: {
    path: path.resolve(__dirname, './dist'), 
    publicPath: '/dist/',
   // filename: 'build.js' // 打包后输出的文件名
    filename: 'vue-pay-keyboard.js' // 我们可不想打包后叫build.js 多low啊 起一个与项目相对应的
    library: 'PayKeyboard', // library指定的就是你使用require时的模块名，这里便是require("PayKeyboard")
    libraryTarget: 'umd', //libraryTarget会生成不同umd的代码,可以只是commonjs标准的，也可以是指amd标准的，也可以只是通过script标签引入的。
    libraryExport: 'default', // 兼容 ES6(ES2015) 的模块系统、CommonJS 和 AMD 模块规范
    globalObject: 'this' // 兼容node和浏览器运行，避免window is not undefined情况
    umdNamedDefine: true // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define。
  },
```

ok 通过 npm run build 打包一次

再次打包 可以看到已经成功了
最后发布npm 最重要的是我们需要先修改package.json文件

### 修改package.json文件
``` bash
private:false, // 默认是true 私人的 需要改为false 不然发不上去 你可以试试..
"license": "MIT", // 许可证
 "main": "dist/vue-pay-keyboard.js", // 这个超级重要 决定了你 import xxx from “vue-pay-keyboard” 它默认就会去找 dist下的vue-pay-keyboard 文件
  "repository": {
    "type": "git",
    "url": "https://github.com/yucccc/vue-pay-keyboard"
  }, // 配置这个地址存放你项目在github上的位置 也尤为重要
```

OK 一切搞定 发布npm吧  
注册好npm后 添加用户

```
npm adduser 
Username: your name
Password: your password
Email: yourmail[@gmail](/user/gmail).com
```

接着
```
npm whoami
```
没问题
```
npm login // 登陆 
npm publish // 发布
```
如果出现
![WechatIMG43.png](https://i.loli.net/2020/10/30/HuBfzbdD8sCIPGY.png)
已存在相同版本，删除版本，重新发版
```
npm unpublish --force

```

OK 我们发布成功.就可以安装依赖
```
npm install vue-test-pay-keyboard
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
