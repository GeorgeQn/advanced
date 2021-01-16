# 前端工程化

## 	搭建脚手架

### 		意义：提供项目基础结构，规范和约定

### 		vue-cli，angular-cli，create-react-app （特定项目类型）

### 		yeoman（通用脚手架工具）步骤：

![image-20201021141556507](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201021141556507.png)

#### 			1.先检测node,npm或yarn是否已安装 命令行:node -v，npm -v,yarn -v;

#### 			2.yarn global add yo

#### 			3.yeoman要搭配特定generator生成器，假设下载对应node_modules文件夹，下载generator-node，yarn global add generator-node

#### 			4.cd切换到对应目录，然后mkdir my-module创建新文件夹，cd my-module,

#### 然后yo node,然后填写一些项目配置

#### 			5.sub-generator，yo node:cli，创建了一个cli.js文件，yarn link 到全局范围，先yarn install，可以通过模块名字运行 刚加进来的模块

### 		自定义generator（一个模块）

![image-20201021143619132](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201021143619132.png)

​		特定名字，generator-<name>

​		midkr generator-sample,cd generator-sample

​		yarn init 创建package.json

​		yarn add yeoman-generator 创建基类，提供一些工具函数，便捷

​		![image-20201021144253029](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201021144253029.png)

​		yarn link 到全局范围，cd .. ，mkdir my-proj , cd my-proj ,yo sample

### 		根据模板创建文件

​				index.js根据模板引擎映射生成输出文件

​				EJS模板引擎 <%= title %> 

### 		接收用户输入数据

​				通过命令行交互

![image-20201021145310318](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201021145310318.png)

![image-20201021145337060](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201021145337060.png)

​		命令行通过this.answer 传入到模板引擎上面

![image-20201021150922670](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201021150922670.png)

![image-20201021150955752](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201021150955752.png)

#### 		发布generator，generator本身是一个npm模块，通过npm publish发布成一个公开的模块，把项目源代码托管到公开的源代码仓库上

![image-20201021151236818](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201021151236818.png)

​		git init 初始化本地空仓库

​		git status 看仓库状态，文件未被跟踪

​		git add . 跟踪

​		git commit -m "first commit" 提交本地

​		git remote add origin <远端仓库地址>  为本地仓库添加远端仓库的别名

​		git push -u origin master          push的时候直接push别名 

​		npm publish 或者 yarn publish  发布，是否需要更新依赖版本，填写远端仓库账号密码

​		可能提示报错，是国内淘宝镜像取代了官方提供的镜像，因为淘宝镜像是只读的,修改成yarn镜像

​		yarn publish --registry=https://registry.yarnpkg.com

​		在npm官网看![image-20201021152120820](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201021152120820.png)

​		如果需要在官方yeoman下出现自定义generator，可以写成yeoman-generator-zce-vue

​		npm install generator-zce-vue

​		yo generator

​		done~

## 	自动化构建（grunt，glup，fis）

### 		glup

​			package.json配置

## 

## 模块化开发

### 	意义：一种思想，代码复杂，需要分模块管理

​	![image-20201021170104046](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201021170104046.png)

### 模块化演进过程：

stage1：单独存放再不同文件当中，污染全局作用域，命名冲突，无法管理模块关系。

stage2：每个模块包裹一个全局对象，解决命名冲突，但是依赖关系和私有空间还是没有

stage3： 放在函数私有作用域当中，window.对象，暴露全局对象访问

### 模块化规范的出现

​	CommonJS （同步模式加载规范）： 一个文件就是一个模块；

​							每个模块都有单独作用域；

​							通过module.exports导出成员

​							通过require函数载入模块

​	AMD（异步模块定义规范）：Require.js(模块加载器); define(模块名,一个数组声明依赖项,函数参数与数组依														赖项一 一对应 )，rquire（）载入一个模块

### 模块化标准规范

​	浏览器遵循 ES Modules规范

​	node遵循CommonJs规范

### ES Modules

		<script type="module"> </script>>

​				相对于普通script的新特性，是严格模式：

​					1.this没有象，为undefined

​					2.运行在单独的私有作用域中

​					3.ESM是通过CORS方式请求外部js（外部请求需要支持CORS，						不支持文件形式访问，需要http访问 ）

​					4.ESM的script会延迟执行脚本

####  	导入导出 import export

​			因为es modules有私有作用域，直接访问不同模块的对象是不行的，所以需要导入导出

​			xxx as yyy 重命名 ； export {xxx , yyy } 和impor{xxx,yyy}不是解构，而是固定用法，导出引用关系，不是拷贝值（改变模块内部的指向地址，模块外部也会跟着变） ；export default {xxx,yyy}导出对象字面量；导入的成员是只读的成员（模块外i不能改变模块内部的值），

#### 	 特殊用法，注意点：

##### 		1.导入的地址要完整名称,'./module.js; 

##### 		2.import {} from './module.js'   执行这个模块

##### 		3.import *  as mod from  ”./module.js“ ;mod 就是导出的对象每个成员是这个对象的属性

##### 		4.不能嵌套if，函数当中。可以动态加载模块：import('./module.js').then((module)=>{console.log(module)});导入完module.js这		个函数return 一个promise，导入完后自动执行后面的方法

##### 		5.导入default，需要重命名 import {default as title} from './module.js'

##### 	import {xxx} from './module.js'      import改为export ，导入的成员直接作为导出成员（通过index.js一起导出，作为桥梁）

#### 	考虑兼容性，兼容旧版本的浏览器 又是IE（Polyfill兼容方案 ）

##### 		ES MODULE LOADER 用法 ![image-20201022110637312](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201022110637312.png)

##### 		两个脚本文件引入到模块当中，npm的模块的话，可以网站：unpkg.com/??? 比如unpkg.com/browser-es-module-loader 打开![image-20201022110829226](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201022110829226.png)

然后script 引入这两个http网站 即cdn服务

引入完还会报错，IE 不支持 promise，为IE再引入一个 promise-polyfill

script 可以通过标签 nomodule，来以防在支持ES MODULE 的浏览器中，会执行两次，所以通过此标签，就做到判断浏览器支持与否来选择执行这些兼容的脚本

######  	（这种兼容只适合开发阶段，因为原理是动态解析脚本，效率差，生产环境中要预先编译，直接在浏览器当中用）

#### 	ES MODULES 在node.js的支持情况，运行

​		node版本大于8.5可以原生写modules 

​		node --experimental-modules index.mjs

​		内置fs 可以解构出来用，一些第三方模块，比如lodash，需要import {_} from 'lodash' 然后 _.xxxxx方法

​		module.exports 是 exports 的别名 ，导出默认

​		node 原生环境中不支持直接通过CommonJs载入ES Module，ES Module可以载入Common JS模块，

####     ES MODULES 在node 和在COMMONJS 的差异

#### 	ESM 没有commonJS的全局成员

#### 	比如 require , module, exports ,__filename ,__dirname ，可以用	下面替换

​	![image-20201022143658436](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201022143658436.png)

#### 	package.json 加一个 {’type‘:'module'}，就是module的执行模式，mjs改回js

#### 	esmodules 在node.js下Babel方案 

### 	



### webpack打包

##### 			ES MODULES 有兼容问题，前端资源不止js文件

##### 			开发阶段 到 生产阶段，编译成生产环境能用的；将散落的模块文件打包在一起，解决了浏览器对模块文件频繁请求的问题。

#### 模块打包器（Module Blunder）（整个前端项目的整体模块化，不单指js模块化）		

##### 	loader 编译转换 ； 代码拆分（增量加载，渐进式加载）；资源模块

#### 快速上手

##### 		yarn init

##### 		yarn add webpack webpack-cli --dev

##### 		yarn webpack --version

##### 		yarn webpack 打包4以后版本，按照约定从src/index.js开始打包，多出了dist目录，打包结果存放再，dist/main.js

##### 		若嫌每次yarn webpack 去打包麻烦，可以在package.json 加 "script":{"build" : "webpack"}； 然后webpack即可

#### webpack配置文件

##### 		项目根目录下添加 webpack.config.js,里面

![image-20201023120045994](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201023120045994.png)

##### 		直接打包，会用mode ： ‘production’模式，  可以yarn webpack --mode development 为开发模式，这模式会优化打包速度，和添加一些调试的辅助；还有none模式 ： 原始打包，不作任何处理

#### webpack工作原理：

#### 导入资源模块

#####       css-loader 可以执行 js代码去操作，但是图片之类不能 ，可以用file-loader

![image-20201023151907007](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201023151907007.png)

yarn add file-loader --dev

​											![image-20201023151947608](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201023151947608.png)

显示不出来，有可能是.png默认放在了网站的根目录下去，output:{publicPath:'dist/'}

​	![image-20201023152508860](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201023152508860.png)

####  url-loader加载器

​	文件路劲转换为data-url，把二进制通过base64编译后的代码存放在代码里，而不再是资源文件，对于小文件比较好，减少对服务器请求图片的请求次数；大文件单独提取存放，反而会提高加载速度

![image-20201023153829482](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201023153829482.png)

设置限制大小，超过10kb 就单独存放， 雄安与10kb的转换为data urls嵌入代码中

url-loader 同时要安装file-loader，因为如果大于10kb，还是会使用file-loader

#### 常用加载器			编译转换类  比如  css-loader  .css >>> bundle.js里的模块去用js使用

##### 			文件操作类  比如  file-loader .png >>>访问在bundle.js里向外导出

##### 			代码检查类  比如  eslint-loader 统一代码风格 

##### webpack es5

babel-loader ；yarn add babel-loader @babel/core @babel/preset-env --dev

​									![image-20201023161403452](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201023161403452.png)

#### 	webpack兼容多种模块化标准，如非必要，每个项目尽量用一个标准就可以了

##### 	 几乎代码中有需要引入资源的地方，都可以找出来，通过配置，对应loader处理，整体打包到输出目录

#### loader

​		loader管道最后必须返回一个js代码，比如 可以return ’console.log('aaa')‘ ,不可以 return 'aaa'

​		![](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201026104809311.png

![image-20201026104825859](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201026104825859.png)

loader工作原理，输入到输出的转换，等同于一个管道概念，多个loader之间的配合

#### plugin（webpack插件机制）

​	除了资源加载以外其他的自动化工作

​	比如清除dist，拷贝静态文件到输出目录，压缩输出代码

​	使用：安装所需插件，然后在webpack.config.js引入，下面plugn:[]下new 一个；

​	自动生成html的插件 html-webpack-plugin,output里的publicPath可以去掉，路劲改过来

​	若html有太多自定义内容：可以在src下弄一个html，通过ejs模板引擎配置数据，通过在webpack.config.js下		   template配置引入这个模板文件

![image-20201026143248490](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201026143248490.png)

​	输出多个页面文件：

​		在webpack.config.js插件多个html插件的实例对象

#### 总结

​		copy-webpack-plugin

​		建议看一些热点插件，心中有数；用法几乎类似

#### plugin通过钩子机制实现

一个函数或者是一个包含apply方法的对象

实现移出webpack注释插件的过程。插件是通过往webpack生命周期里面的沟子函数挂载一些任务来实现的



![](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201026150522568.png![image-20201026150644899](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201026150644899.png)

#### webpack开发体验

​		1.以Http Server运行；2.	自动编译+自动刷新；3.提供source map支持，快速定位源代码错误位置		

​		增强开发体验：1.watch工作模式：监听文件变化，自动打包，webpack --watch；

​									2.编译后自动刷新，browserSync

​									1和2有劣势，读写磁盘两次，效率低等

​									3.webpack dev server ，提供了http server，继承了1和2 的功能。yarn webpack-dev-server --dev；打包结果暂时存放在内存中，而不是磁盘中，提高构建效率

​		copyWebpackPlugin 开发阶段不用，上线才用，因为频繁打包会影响效率，可以用devServerd对象下的contentBase配置，为开发环境服务器，额外自定静态资源项目的路径

#### 开发阶段接口跨域问题

​	webpack dev server 支持配置代理服务

​	proxy:{}

![image-20201026213326845](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201026213326845.png)

主机名，http协议（回头了解一下）

#### SourceMap 定位错误 （逆向源代码和转换后代码，便于控制台调试错误）

devtool:'source-map', 

webpack 有12种生成source-map的方式，效果和效率成反比

![image-20201026214354158](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201026214354158.png) 

可以用devtool:'eval'模式，构建速度最快，效果比较简单

module.exports可以存放一个数组，执行多个任务，用于比较不同devtool模式的效果

![image-20201026223635258](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201026223635258.png)

![image-20201026224055901](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201026224055901.png)

开发环境的时候 可以用 cheap-module-eval-source-map，调试是开发阶段的事情

生产打包 可以用 none， source map 会暴露源代码，如果非要在生产环境种调试，可以使用nosources-source-map,可以找到位置，但不暴露内容（综上选择不绝对）

#### webpack自动刷新

自动刷新导致页面状态丢失   ：可以用HMR解决 模块热更新

HMR集成在webpack-dev-server中，不需要安装， webpack-dev-server --hot  ；或者 引入import HMR from 'html-webpack-plugin'; plugin:[new HMR(title:'')];devServer:{hot:true};

hotOnly:true;

#### webpack不同环境下的配置，

![image-20201027104512663](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201027104512663.png)

#### 不同环境对应不同配置文件

思路：通常有三个配置文件，一个公用，一个开发环境，一个生产环境；

公用的写好后，另外两个环境，需要下载webpack-merge这个插件，Object.assign这个js方法是替换属性值，而不是原有公用配置属性上增加，所以使用merge

![image-20201027105349010](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201027105349010.png)

可以在package.js可以定义"script":{"build":"webpack --config webpack.prod.js"}

#### webpack DefinePlugin

webpack内置插件

![image-20201027105910095](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201027105910095.png  )

#### Tree Shaking

摇掉为引用的代码，生产模式下自动启用

![image-20201027111542492](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201027111542492.png)

#### Tree Shaking 和 babel



#### sideEffects

没有用到的模块移出，package.json里面设置false

#### 代码分割

模块打包有必要，应用越来越大后，需要适当分割；

多入口打包，动态导入

多入口打包：

![image-20201027145705740](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201027145705740.png)

提起公共模块:

所有公共模块提起到单独的blunder当中

![image-20201027150033330](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201027150033330.png)

按需加载：

需要用时，才导入 

![image-20201027150603714](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201027150603714.png)

##### 魔法注释

![image-20201027151649538](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201027151649538.png)

#### css超过150kb左右，可以尝试将css文件提取到单独文件当中；不需要用style-loader；

#### Webpack OptimizeCssAssetsWebpackPlugin

#### webpack 输出文件名 Hash

解决静态资源缓存问题； hash chunkhash contenthash:8



#### Rollup

yarn add rollup --dev

yarn rollup ./src/index.js --format iife --file ./dist/bundle.js

新建 rollup.config.js

​	export default {}

roolup 也可以加载commonJs模块，需要导入 rollup-plugin-commonjs插件

rollup代码拆分

优点：输出结果更加扁平；自动移出为引用代码；打包结果依然完全可读；

缺点：加载非ESM 的第三方模块比较复杂；模块最终被打包到一个函数中，无法实现HMR；浏览器环境中，代码			拆分功能依赖AMD库；

vue和react用rollup；webpack大而全，rollup小而美

建议：应用程序用webpack；库/框架开发使用rollup

#### Parcel

零配置的前端打包器

用html文件为入口文件

yarn parcel ./src/index/html

优点会启动开发服务器；自动安装依赖；支持加载其他类型资源模块；比webpack快，多进程

yarn build ./src/index/html

缺点：webpack越来越好用，parcel也好

### 规范化

#### 为什么要有规范化标 



![image-20201028170551504](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201028170551504.png)



#### 哪里需要规范化标准

![image-20201028170636420](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201028170636420.png)

#### 实施规范化的方法

![image-20201028170741384](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201028170741384.png)

#### ESLint

安装eslint ：npm install eslint --save-dev

检查eslint：npx eslint --version 

![image-20201028171507845](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201028171507845.png)

![image-20201028171825695](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201028171825695.png)

#### eslint结合自动化工具

gulpfile是管道执行任务，script 的babel前面对源代码做一个引用eslint插件的任务，要初始化一个eslint的配置文件

![image-20201029221841766](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201029221841766.png)

#### eslint结合webpack

eslint以loader的形式

安装eslint模块，安装eslint-loader模块，初始化.eslintrc.js配置文件

webpack的laoder ，第一种方法： use:[]，从后到前执行

第二种方法：

![image-20201029222835581](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201029222835581.png)

#### 结合现代化用eslint

比如vue-cli快速搭一个

npm install @vue/cli -g 全局安装脚手架

create vue sample-vue 创建项目

选择配置 manually select features > babel >  Eslint+standard > lint on save & commit > in dedicated config files > 是否把操作进行保存:n

#### styleLint

类似eslint 的一款检验css代码工具 ，配置文件，需要安装插件，不同于eslint的默认调用对应配置

#### prettier自动格式化

通用前端代码格式化工具；

使用：npm install prettier -D

npx prettier style.css ; 默认是把执行的代码放在node中，直接覆盖就npx prettier style.css --write

npx prettier . --write 将根目录所有文件格式化操作并覆盖;

#### Git Hooks

通过Git Hooks 强制在代码前执行lint 

esint结合 Git Hooks 改.git 下的hooks 文件夹

npm install husky -D

package.json : 

"husky":{"hooks":{“pre-commit”:"npm run test"}};

"script":{"test":"eslint"}

经过检查的代码格式化并覆盖：

npm install lint-staged -d

package.json:

"lint-staged":{"*.js":["eslint","git add"]}

"script":{"precommit":"lint-staged"}

# 实现webpack打包vue项目的任务-笔记

https://blog.csdn.net/qq_34875090/article/details/107161295

webpack版本的不同，会影响配置，详情可以百度