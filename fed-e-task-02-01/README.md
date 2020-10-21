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

​		

