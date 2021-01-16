# VUE

![image-20201107225556606](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201107225556606.png)

## 基础语法

![image-20201107230639230](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201107230639230.png)

new Vue({

​	el:'#app'

})



new Vue({

​	render(h){

​		return h();

​	}

}).$mount('#app')	



## vue的生命周期

beforeCreated > created > beforeMounted > mounted > beforeUpdated > updated > beforeDestroy > destroyed



## vue语法和概念

差值表达式： {{}} ，里面可以把html结构虚拟成文本，如果需要html结构，可以用v-html指令。



指令 ：内置有14个，可以创建自定义指令



计算属性和侦听器：如果模板中有太多逻辑需要处理的时候，可以使用计算属性，结果可以作缓存，下次再访问会从缓存中获取相应结果，提高性能；如果需要监听数据变化，作比较复杂的操作，比如异步或开销较大的操作，可以使用侦听器；


class 和 style 绑定：可以绑定数组或对象，推荐使用class绑定，样式可以复用；



条件渲染/列表渲染： v-if ;v-show;v-if是false不会输出相应元素，v-show会渲染到页面，但通过样式控制隐藏；列表渲染使用v-for，推荐给循环项使用上key，跟踪每个节点的身份，能最大程度得到重用，从而得到性能； 



表单输入绑定：v-model 绑定表单元素，负责监听用户的输入事件以及更新数据，即双向绑定



组件：可复用的vue实例



插槽：在自定义组件中挖个坑；让组件更灵活 



插件：比如vue-router，vuex



混入mixin：如果多个组件都有相同选项，可以使用混入，把相同选项进行合并，使代码进行重用；



深入响应式原理：



不同构建版本的vue：





## vue-router 原理实现

1.创建跟路由相关的组件

2.注册路由插件 vue.use()

3.创建router对象，配置routes规则

4.注册router对象，配置创建好的router对象，通过router-view设置占位，路径匹配成	功后，会把匹配到的组件替换到router-view的位置，通过router-link创建一些链接

## 动态路由

路由懒加载

component:() => import ('../views/Detail.vue')；用户点击才加载，增加性能

组件里获取id，两种方式：1.通过路由规则$route.params.id （不推荐，强依赖于路由）; 2. routes下的props:true的时候；把url的参数传给相应的组件，组件中接收这个参数，组件中传值的方式一样；props:['id'];

![image-20201108002347902](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201108002347902.png)

![](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201108002354918.png

![image-20201108002421797](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201108002421797.png)

## 嵌套路由

  ![image-20201108002658789](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201108002658789.png)

![image-20201108003024599](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201108003024599.png)

## 编程式导航

两种方式：this.$router.push('/') 或 this.$router.push({name:'HOME'}) ；name在routes规则下有命名；

this.$router.replace('/login')和push()，replace()不会记录本次历史；就是没有后退了

this.$router.push({name:'Detail',params:{id:1});带参数跳转

this.$router.go(-2);跳转到历史中的某一次，比如现在的-2；

this.$router.go(-1) 等于 this.$router.back()；

## hash和history模式区别

都是客户端路由的实现方式，就是路径发生变化时不会向服务器发送请求，用js监视路径的变化，根据不同地址渲染不同内容，如果需要服务器端内容，会发送ajax形式来获取。

![image-20201108004424688](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201108004424688.png)

![image-20201108004557666](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201108004557666.png)

history.push()和history.pushState()的区别，前者会向服务器发送请求，后者不会发送请求，只会改变浏览器地址栏中的地址，并记录下来；如果IE9包括IE9以前的话，就要用hash模式；



history模式需要服务器的支持，

![image-20201108005155076](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201108005155076.png)

<router-link to="/video"> , 

![image-20201108005353253](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201108005353253.png)

默认是hash；

vue-cli自带的服务器配置好对history模式的支持，要不的话刷新。浏览器会向服务器发送请求，请求服务器上的这个页面，如果服务器上没有这个页面，会返回404

 

![image-20201108010034829](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201108010034829.png)

使用history。通过node

![image-20201108010427306](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201108010427306.png)



把app.use(history())打开就可以了

原理：开启服务器支持时，浏览器刷新，向服务器发送请求，开始了对history模式的			支持，服务器会判断，当前请求的页面服务器上没有，会把单页面的应用默认首			页index.html返回给浏览器，浏览器接收到页面之后，再去判断路由地址，加载			这个地址，并渲染

使用history。通过nginx服务器配置

![image-20201108011051541](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201108011051541.png)

注意：文件夹名称不能有中文

![image-20201108011137179](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201108011137179.png)



nginx启动成功(默认使用80端口，如果不成功，可以关掉使用该端口的程序或者改配置文件改80端口为其他端口):

![image-20201108011509948](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201108011509948.png)

把前端打包后的dist里面的内容放在nginx的html文件夹下，替换

没处理vue-router的history模式会出现以下（服务器不存在请求的路径中对应的文件，所以返回404页面）

![image-20201108011803056](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201108011803056.png)

nginx的配置文件: congf > nginx.conf >

 http{

​		serer{

​			listen 80;

​			server_name localhost;

​			location / {

​					root html; //指定了当前网站所在的根目录

​					index index.html index.htm ;默认的首页

​					try_files $uri $uri/ /index.html;

​				}

​			}

​	}

try_files 》》》nginx默认返回index.html，接下来就是在客户端去解析对应组件



## vueRouter 实现原理

![image-20201108150131643](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201108150131643.png)

## 手写vue-router模块

替换掉 import VueRouter from 'vue-router' ,我们手写的只接收routes选项

let _Vue = Vue

install：

1.判断当前插件是否已经被安装

2.把vue构造函数记录到全局变量

3.把创建vue实例时传入的router对象注入到vue实例上

创建构造函数：

constructor(options){

​	this.options = options

​	this.routeMap = {}

​	this.data = _Vue.observable({

​		current:'/'

​	})

}

...(后面补全)





## Vue响应式原理模拟 

### 数据驱动

![image-20201112233152373](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201112233152373.png)

### 响应式核心原理

vue2.x:

​	基于Object.defineProperty()来实现，代理对象的属性

![image-20201112234629841](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201112234629841.png)

vue3.x:

​	基于Proxy来实现，代理整个对象；性能比defineProperty好

![image-20201112234428518](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201112234428518.png)

### 发布订阅模式和观察者模式

发布订阅模式：

let vm = new Vue();

发布可以n个事件，每个事件包括n个函数

发布：vm.$on('click',()=>{});

订阅：vm.$emit('click')

![image-20201114005709237](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201114005709237.png)

观察者模式：

![image-20201114011721928](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201114011721928.png)

![image-20201114011845427](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201114011845427.png)

两个模式的区别

![image-20201114011908652](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201114011908652.png)

## vue响应式原理(下面模拟一个小型vue)

![image-20201114132026674](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201114132026674.png)

各个js的依赖关系决定script引入的顺序（注意）

![image-20201115212005792](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201115212005792.png)

### Vue：

![image-20201114132236421](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201114132236421.png)

vue.min.js:

`class Vue{`

​	`constructor(options){`

​			`//1.通过属性保存选项的数据`

​			`this.$options = options || {}`

​			`this.$data = options.data || {}`

​			`this.$el = typeof options.el === 'string' 					            document.querySelector(options.el) : options.el`

​			`//2.把data中的成员转换成getter和setter，注入到vue实例中`

​			`this._proxyData(this.$data)`

​			`//3.调用observer对象，监听数据的变化`

​			new Observer(this.$data)

​			`//4调用compiler对象，解析指令和插值表达式`

​			new Compiler(this)

​		`_proxyData(data){`

​			`//遍历data中的所有属性`

​			`Object.keys`.forEach(key => {

​					Object.defineProperty(this,key,{

​						enumerable:true,//可遍历

​						configurable:true,//可枚举

​						get (){

​							return data[key]	

​							}

​						set(newValue){

​								if(newValue === data[key]){

​									return;	

​								}

​								data[key] = newValue;

​							}

​						})

​				})

​		`}`

​	`}`

`}`

html中：

<script>
	let vm = new Vue({
        el:'#app',
        data:{
            mst:'Hello Vue',
            count:100
        }
    })
</script>

### Observer(数据劫持):

![image-20201114135525007](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201114135525007.png)

observer.js:

`class Observer{`

​	`constructor(){`

​		`this.walk(data)`

​	`}`

​	`walk(data){`

​		`//1.判断data是否是对象`

​		`if (!data || typeof data !== 'object'){`

​				`return`

​			`}`

​		`//2.遍历data对象的所有属性(此方法用箭头函数，因为调用这个方法用到了this)`

​		`Object.keys(data).forEach(key => {`

​			`this.defineReactive(data,key,data[key])`

​		`})`

​	`}`

​	`defineReactive(obj,key,val){`

​		let that = this;

​		//负责收集依赖并发送通知

​		let dep = new Dep();

​		this.walk(val) //如果val此时是对象，把val内部的属性转换成响应式数据

​		`Object.defineProperty(obj,key,{`

​			enumerable:true,

​			configurable:true,

​			get(){

​				Dep.target && dep.addSub(Dep.target)

​				return val;

​			},

​			set(newValue){

​				if(newValue === val){

​						return;

​					}

​					val =newVal;

​					that.walk(newValu);

​					//发送通知

​					dep.notify()

​				}

​			`})`

​	`}`

`}`

为什么defineReactive第三个参数用val不用obj[key]？ 

因为堆栈溢出，this.$data对new Observer 里的defineReactive有引用；get里面return的val形成了闭包，没有把val有释放掉 （暂时不理解！！！）

如果data属性中有是对象的：此对象的属性是响应式的，可是内部的属性暂时不是响应式；

在defineReactive里面再次调用walk方法

如果重新给data中的msg赋值，并且重新赋值成对象，验证赋值后的对象，是否是相应式的：暂时不是；需要再走walk方法



### Compiler

![image-20201114143143729](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201114143143729.png)



`class Compiler {`

​	`constructor(vm){`

​		this.el = vm.$el

​		this.vm = vm

​		this.compile(this.el)

​	`}`

​	//编译模板，处理文本节点和元素节点

​	compile(el){

​		let childNodes = el.childNodes //不是children,childNodes是伪数组

​		Array.from(childNodes).forEach(node => {

​			if(this.isTextNode(node)){

​				//处理文本节点

​				this.compileText(node)

​			}else if (this.isElementNode(node)){

​				//处理元素指点

​				this.compileElement(node)

​			}

​		})

​		//判断node节点，是否有子节点，如果有子节点，需要递归调用compile

​		if(node.childNodes && node.childNodes.length){

​			this.compile(node)

​		}

​	}

​	//编译元素节点，处理指令

​	compileElement(node){

​		//遍历所有的属性节点

​		Array.from(node.attributes).forEach(attr => {
​			//判断是否是指令
​			let attrName = attr.name

​			if(this.isDirective(attrName)){

​					// v-text --> text

​					attrName = attrName.substr(2)

​					let key = attr.value

​					this.update(node,key,attrName)

​				}

​		})

​	}

​		

​	update(node,key,attrName){

​			let updateFn = this[attrName + 'Updater']

​			updateFn && updateFn.call (this,node,this.vm[key],key)   //call改变指向，从而让node这个参数this指向compiler对象，从而成功获取this.vm

​		}

​		//处理v-text指令

​	textUpdater(node,value,key){

​			node.textContent = value

​			new Watcher(this.vmm,key,(newValue) => {

​				node.textContent = newValue

​			})

​		}

​		//处理v-model

​	modelUpdater(node,value,key){

​			node.value = value

​			new Watcher(this.vmm,key,(newValue) => {

​				node.value= newValue

​			})

​				//双向绑定

​			node.addEventListener("input",()=>{

​				this.vm[key]  = node.value    //当视图文本发生改变时候，v-text和{{}}也会跟着变，因为

​				vm.msg发生了改变，data改变了，触发了响应式机制，所以v-text和{{}}跟着变动

​			})

​	}

​	//编译文本节点，处理插值表达式

​	compileText(){

​		//{{     msg}}

​		//正则匹配双大括号

​		`let reg = /\{\{(.+?)\}\}/`

​		let value = node.textContent

​		if(reg.test(value)){

​			let key = RegExp.$1.trim();

​			node.textContent = value.replace(reg,this.vm[key])



​			//创建watcher对象，当数据改变，更新视图

​			new Watcher(this.vm,key,(newValue)=>{

​				node.textContent = newValue

​			})

​		}

​	}

​	//判断元素属性是否是指令

​	isDirective(attrName){

​		return attrName.startsWidth('v-')

​	}

​	//判断节点是否是文本节点

​	isTextNode(node){

​		return node.nodeType === 3

​	}

​	//判断节点是否是元素节点

​	isElementNode(node){

​		return node.nodeType === 1

​	}

`}`

//分清节点和元素

### Dep(发布者，作用是收集依赖)

![image-20201114235251509](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201114235251509.png)

 

class Dep{

​	constructor(){

​		//存储所有的观察者

​		this.subs = []

​	}

​	//添加观察者

​	addSub(sub){

​		if(sub && sub.update){

​			this.subs.push(sub)

​		}

​	}

​	//发送通知

​	notify(){

​		this.subs.forEach(sub => {

​			sub.update();

​		})

​	}

}

### watcher(观察者)

![image-20201115210100870](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201115210100870.png)

![image-20201115210120343](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201115210120343.png)

class Watcher {

​		constructor(vm,key,cb){

​			this.vm = vm;

​			//data中的属性名称

​			this.key = key;

​			//回调函数负责更新试图

​			this.cb = cb

​			//把watcher对象记录到Dep类的静态属性target中

​			Dep.target = this

​			//触发get方法，在get方法中调用addSub

​			this.oldValue = vm[key]

​			Dep.target = null

​		}

​		//当数据发生变化时更新视图

​		update(){

​			let newValue = this.vm[this.key]

​			if ( this.oldValue === newValue){

​				return

​			}

​			this.cb(newValue)

​		}

}

### 双向绑定（数据<==>视图）

给视图的文本框注册一个input的事件，把数据重新赋值给数据

### 调试-首次渲染&数据改变（得过一遍，深度理解）

![image-20201115214119432](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201115214119432.png)

###  总结

​				![image-20201115221832630](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201115221832630.png)

第一个问题：是的。在observer里面得set方法判断是否是对象， 如果是，会走walk方法，重新定义成相应式数据

第二个问题：不是。![image-20201115222210713](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201115222210713.png)

，因为响应式数据实在new Vue里面执行的，把新增属性转换成响应式数据：

![image-20201115222404652](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201115222404652.png)



### 整体流程

（问题：data里动态增加属性，并不是响应式的）





## 虚拟dom

用普通js对象来描 述dom对1象

![image-20201117000917026](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201117000917026.png)

并不是所有情况使用虚拟dom都能提高性能，如果视图数据交互复杂，就能大幅度提升性能

### snabbdom

安装，然后参照官网，到那时官网用require，我们用import {init,h,thunk} from 'snabbdom'

//1.hello world

let patch = init([])

//第一个参数：标签+选择器

//第二个参数：如果是字符串的话就是标签中的内容

let vnode = h('div#container.cls','hello world')

let app = document.querySelector('#app')

//第一个参数：可以是DOM元素，内部会把DOM元素转换成vnode

//第二个参数：vnode

//返回值：vnode

let oldVnode =  patch(app,vnode)

//假设的时刻

vnode = h('div','hello snabbdom')

patch(oldVnode,vnode)





//2.div中放置子元素h1,p

import {h,init,} from 'snabbdom'

let patch = init([])

let vnode = h('div#container',[

​	h('h1','hello snabbdom'),

​	h('p','这是一个P标签')

])

let app = document.querySelector('#app')

let oldVnode = patch(app,vnode)

setTimeout(()=>{

​	vnode=h('#container',[

​		h('h1','hello world'),

​		h('p',''hello p')

​	])

​	patch(oldVnode,vnode)

​	//清空页面元素 --官网上是错误的

​	patch(oldVnode,h('!'))

},2000)

snabbdom引入模块

import {init,h} from 'snabbdom'

1.导入模块

import style from 'snabbdom/modules/style'

import eventlisteners from 'snabbdom/modules/eventlisteners'

2.注册模块

let patch = init([

​	style,

​	eventlisteners

])

3.使用模块，h（）函数的第二个参数传入模块需要的数据（对象）

let vnode = h('div',{

​	style:{

​		backgroundColor:'red'

​	},

​	on:{

​		click:eventHandler

​	}

},[

​	h('h1','hello snabbdom),

​	h('p','this is p')

])



function eventHandler(){

​	console.log('点击了')

}

let app = document.querySelector('#app')

patch(app,vnode)

### snabbdom源码解析

![image-20201117225132054](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201117225132054.png)

h函数：

函数的重载:参数的个数，参数的类型，不同但是同名的函数当作不同的函数

patch函数:

![image-20201118224951084](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20201118224951084.png)

(高阶函数，函数里面放函数：init里面returnpatch)

init函数：

createElm：

addVnode和removeNode：

patchVnode：

updateChildren：