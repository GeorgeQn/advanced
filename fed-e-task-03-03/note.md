# Vuex数据管理及Vue.js服务端渲染

## 1.Vuex状态管理

### 	1.Vue组件间通信方式回顾

#### 			(1)父组件给子组件传值

​						props，通过相应属性传值

#### 		  （2）子组件给父组件传值

​						this.$emit

#### 		  （3）不同组件间传值	

​						eventBus.js ，创建一个公共vue实例

​						$emit,$on

#### 			(4)通过ref获取子组件

​						$root;$parent;$children;$refs

​					ref在普通html标签上获取到得是Dom，在组件标签上获取到的					是组件实例。万不得已下才使用，因为会导致数据管理的混乱

#### 			多个组件共享 吧  心概念和基本使用回顾\

### 	2.vuex回顾

#### 		（1）是专门为Vue.js设计的状态管理库

#### 		（2）采用集中式的方式存储需要共享的状态

#### 		（3）Vuex的作用是进行状态管理，解决复杂组件通信，数据共享

#### 		（4）Vuex集成到devtools中，提供了time-travel时光旅行历史回滚功能 

#### 			什么时候使用Vuex：中大型单页应用程序，多个视图依赖于同一状态，来自不同视图的行为需要变更同一状态，比如购物车。切忌乱用，否则业务会更麻烦

![image-20210227124207012](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210227124207012.png)

#### 		核心概念：store，state，getter（计算属性），mutation，action，module（模块）

#### 		基本结构：

​		![image-20210227124545341](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210227124545341.png)

![image-20210227124556059](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210227124556059.png)

#### 	state：单一状态树，响应式

​		![image-20210227125127127](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210227125127127.png)

#### 	getter:计算属性 计算state，方法里面传一个state的参数，返回计算后的值，...mapGetters和...mapStates 一个用法

#### 	Mutation：收集到所有状态修改，状态修改，一定要在这里执行，方便vue-devtools调试，时光旅行,调用$store.commit

#### ..mapMutations，放在组件的methods中

![image-20210227125748119](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210227125748119.png)

![image-20210227130052985](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210227130052985.png)

#### 	actions: 调用$store.dispatch ;...MapActions

#### 	Module:模块

​	![image-20210227131624436](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210227131624436.png)

![image-20210227131743626](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210227131743626.png)

![image-20210227131753449](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210227131753449.png)

#### 	因为所有某块的state，mutation都会挂在store里面，为了让模块有更好的封装度和复用性，可以给模块用命名空间

![image-20210227132708390](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210227132708390.png)

![image-20210227132901912](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210227132901912.png)

#### 	第一个参数是命名空间 

#### 	Vuex严格模式，不能直接修改state状态 ，需要通过mutation，可以通过vue-devtools观察到变化，不要在生产环境中开启严格模式，因为会深度检查状态树，影响性能：![image-20210227142924744](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210227142924744.png)

​	![image-20210227142646323](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210227142646323.png)

### 	3.购物车案例

#### 		（1）商品列表

![image-20210227144904937](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210227144904937.png)

![image-20210227144920885](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210227144920885.png)

#### 		添加购物车：点击的商品存储到一个位置，记录所有购物车数据

#### 		（2）购物车列表

#### 			功能：1.购物车列表展示；

#### 						2.全选（比较复杂，需要再次思考）

#### 						3.加减，统计小计（el-input-number）

#### 						4.删除（和弹出框一样）

#### 						5.统计选中商品的数量和总价

#### 		（3）弹出框

#### 			

#### ![image-20210227145818610](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210227145818610.png)

![image-20210227145914933](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210227145914933.png)

#### 购物车数据统计，可以 在store下cart.js，的getter里面计算

#### 		删除： ![image-20210227154030681](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210227154030681.png)

#### 		demo仓库地址，可以作练习

![image-20210227143826933](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210227143826933.png)

#### 	vue本地存储，因为用户没登录，就存储在本地，如果登录了，存储在服务器，发送请求。

#### 	vuex插件使用：需要在创建store之前创建

![image-20210227163547521](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210227163547521.png)

![image-20210227163607481](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210227163607481.png)

### 4.模拟实现Vuex

#### 	install方法：

​	![image-20210227164311020](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210227164311020.png

![image-20210227164525577](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210227164525577.png)

#### 	store类：（- -！需要再次理解）

## 2.服务端渲染基础

​	![image-20210301160137005](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210301160137005.png)

### 	（1）渲染

​				数据+模板

### 	（2）传统的服务端渲染

​					art-template,render方法 渲染

### 	     (3)   客户端渲染

​			![image-20210401090640611](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210401090640611.png)

![image-20210401090903861](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210401090903861.png)

前端更独立；

缺点：首屏渲染慢，不利于seo；

为什么首屏渲染慢：

​	客户端渲染，需要多个请求（至少三次）；第一次页面请求；第二次js请求；第三次动态数据请求；

​	服务端渲染，页面只出，服务端返回出来的直接就是结果。

为什么CSR（客户端渲染）不利于seo：

​	seo即搜索引擎我们的网站的时候的关键字排名，数据是否存在啥的。

​	搜索引擎是怎么获取网页内容的：

![image-20210401093355418](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210401093355418.png)

客户端渲染的网页，body是空的，内容是经过解析执行js

![image-20210401094335086](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210401094335086.png)

搜索引擎拿到的是网页html字符串，不会重新发送请求或者执行js，只会看body里面有没有内容，那么既然没有东西，seo几乎为0；因为所有内容都是通过客户端js生成的；

### （4）现代化的服务端渲染（同构渲染 = 后端渲染 + 前端渲染）

​		解决CSR；结合服务端渲染。解决这两个问题。

​	![image-20210401095513776](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210401095513776.png)

![image-20210401095824252](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210401095824252.png)

 	npm i nuxt > nuxt会自动配置好路由 > nuxt 自带钩子函数 asyncData 和 钩子函数里面return 一个data 

## 3.NuxtJS基础

​	一款基于vue.js第三方开源服务端渲染应用框架；可以帮助我们使用vue.js技术栈构建同构应用。

​	功能：

使用方式：

​	1.初始项目；

​	2.已有的node.js服务端项目

​		直接把nuxt当作一个中间件集成到node web server 中

​	3.现有的Vue.js项目

​		非常熟悉nuxt.js

​		至少百分之10的代码改动

路由导航

​	a标签（刷新页面不推荐使用）

​	nuxt-link 组件

​	编程式导航

asyncData

​		![image-20210403102804369](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210403102804369.png)

注意：页面组件不经过asyncData()

​	asyncData没有上下文对象需要通过参数去获取

## 4.NuxtJS综合案例

​	可以上这个开源仓库去学习应用各种技术栈，用各种技术去实现这个项目，（已经有页面模板和接口文档了，重点让我们专注于技术上）

![image-20210522105141367](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210522105141367.png)

![image-20210522105917205](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210522105917205.png)

demo：

![image-20210522105358914](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210522105358914.png)

![image-20210522110355783](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210522110355783.png)

### （1）初始化项目

​	mkdir realworld-nuxtjs

​	cd.\realworld-nuxtjs

​	npm init

​	npm i nuxt

​	找到package.json的scripts 里面"test" 改为  "dev":"nuxt"

​	根目录创建pages 目录 比如 里面加一个index.vue

​	启动：npm run dev 生成了.nuxt的资源文件，并且启动成功

## （2）导入页面模板

​		打开模板文档

​				

#### 		1.导入样式资源

​				![image-20210521214107507](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210521214107507.png)

​				![image-20210521214138046](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210521214138046.png)

#### 		三个资源本土化处理（因为国外的）

cdn服务的提供，有很多npm的包在这里可以找到

![image-20210521214514689](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210521214514689.png)

找到国内节点的对应css，注意版本要相同

​			根目录创建app.html

​			![image-20210521214250701](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210521214250701.png)

#### 		2.配置布局组件

​				pages下创建一个layout 里面放个index.vue，抽出公共布局组件，例如头部，脚步，中间就子路由nuxt-child : 自定义路由配置，根目录创建nuxt.config.js : module.exports = { router: { //自定义路由规则，查官网，找extendRoutes拉进来，清除nuxt.js基于pages目录生成的路由规则: routes.splice(0) ，   然后再push我们的路由规则} }

​	![image-20210521215931684](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210521215931684.png)

#### 		3.配置页面组件

​			1.导入登录注册页面

​					因为业务不算复杂，login 和 resgiter 共用一个页面，根据computed里面设置一个变量isLogin 获取this.routes.name得值是否等于''，从而从页面上					判断渲染对应内容；

​					（在nuxt里面如果遇到a标签，用nuxt-link标签去替代）

​			2.导入剩余页面

​					包括profile ， setting ，article尽量按照文档上的路由指南去配置路由地址，profile 动态路由 path:'/profile/:username'

​			3.处理顶部导航链接

​					主要是各个点击的子路由跳转和配置，然后高亮的话，可以通过文档里面有一个linkActiveClass一个属性在nuxt.config.js里面配置对应激活后的类名，因为home的 path是"/"，包括其他的比如/editor，所以需要精确匹配，在home那里加一个exact属性

​			4.封装请求模块

​				基于axios

​				npm i axios ,根目录建一个utils，下面起一个request.js，在这里面封装

​				import axios from 'axios'

​				//创建一个axios实例，更灵活，不会污染全局

​				const request = axios.create({

​					baseURL:''

​				})

​				//请求拦截器

​				//响应拦截器

​				export default request 

​			5.登录注册

​				-实现基本登录功能

​					v-model 绑定 form @submit  ； async ... await ... const { data } = request ....

​				-封装请求方法

​					把接口统一放在api文件夹下管理

​				-表单验证

​					原生input 标签 加上required，表单提交的时候，会走这些规则先，可以从type里面加email 或者password ，但是，兼容性不好。

​				-错误处理

​					登录或者注册失败以后。把代码放在try {} catch {}里面捕获异常，console.dir(err)

​				-用户注册

​					多一个userName，然后判断 await login 或者 await register

​				-解析存储登录状态实现流程

​					跨域身份认证（JWT）

​					//存储到容器vuex是为了方便共享：this.$store.commit('setAuth',auth)

​					//存储到cookie:Cookie.set('setAuth',auth)       ;        如果是客户端加载这个包   const Cookie = process.client ? require('js-cookie') : undefined      					（涉及 同构渲染，服务端不会拿到这个包） ；不能本地存储，因为服务端不能访问  

​					 const cookieparser= process.server? require('cookieparser') : undefined       //用在服务端下，用来解析cookie字符串转换成对象

​					store 下 

​					![image-20210522165135983](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210522165135983.png)

​					再通过权限过了与否去访问中间件

​					![image-20210522165622003](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210522165622003.png)

​				-将登录状态存储到容器中

​					nuxt中已经继承了vux ，直接在根目录创建store（只能叫这个名字）下index.js即可

​						不用创建容器实例了，直接index.js里面写state ,mutations,actions ,modules即可，因为nuxt会实例化并注入

​				![image-20210522170624233](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210522170624233.png)		

​				-登录状态持久化

​					通过第三方包js-cookie：先下载 npm i js-cookie; 仅在客户端加载js-cookie包： const Cookie = process.client ? require('js-cookie') : undefined 				（process是nuxt中提供的数据）;为了防止页面刷新数据丢失，我们需要把数据持久化，Cookie.set('user',data.user);

​					刷新后，需要通过cookie 给 容器初始化数据，因为刷新后的容器的数据没了； 

![image-20210522171951660](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210522171951660.png)

​			-处理导航栏链接展示状态

​				![image-20210522172531650](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210522172531650.png)

​				方便使用容器数据，页面中这样辅助函数映射出来；

​				通过template v-if v-else 通过这个值判断用户登录过没有，从而给对应展示的导航栏链接

​			-处理页面访问权限

​				上面的处理，只是表面的权限处理，其实本质并未做处理，因为一些页面登录了再能访问，但是即便未登录，url上面直接写路由跳转到一些页面是可以				跳转的（以前vue里面可以用路由拦截器，但是这里不能，因为是同构渲染这个页面的拦截，假如从服务端角度出发，进入页面处理之前，通过中间件进				行拦截，nuxt提供了一种方案：路由中间件）    nuxt当中独有的拦截方式

​				![image-20210522173905365](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210522173905365.png)

​				store是上下文的容器，redirect是上下文的重定向，如果你想保护哪个页面，就设置给哪个页面；

​				找到对应页面的index.vue，在export default 下面设置一个属性 ，middlware:''，在路由匹配组件渲染之前会先执行中间件处理，可以支持数组（多个中间件，也可以支持单个中间件即字符串）

​				![image-20210522174338945](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210522174338945.png)

​			![image-20210522174755132](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210522174755132.png)

​			6.首页

​				-首页-业务介绍

​				-首页-展示公共文章列表

​					封装接口 》 引入接口 》》列表展示； （get方法 用parmas ， post方法用data）；

​					![image-20210522212500414](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210522212500414.png)

​			推荐不适用a标签，用nuxt-link代替，因为a标签会刷新页面

​				![image-20210522213010375](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210522213010375.png)

​			数据绑定。。。

​			-首页-分页参数的使用

​				这里之前没用过offset这个参数，是偏移量，就是跳过多少条

​			7.文章详情

​			8.发布部署

## 5.作业

## 6.直播一

## 7.直播二

## 8.直播三

