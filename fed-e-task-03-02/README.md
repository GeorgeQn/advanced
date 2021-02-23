# Vue源码解析-响应式原理

### 1.目录结构

​	

![image-20210116122450720](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210116122450720.png)

## 2.打包 工具Rollup

​	再package.json里面 dev 加一个 sourceMap，便于调试，记录源码和打包后的联系

## 3.Vue的不同构建版本

![image-20210116123643209](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210116123643209.png)

基于vue-cli创建的项目使用的是运行时和esm版本，vue.runtime.esm.js；效率更高，少了3000多行代码

node命令行 vue inspect > output.js （前面命令运行的结果输出到后面的文件来查看）

## 4.寻找入口文件

npm run dev

package.json 里面

找到 dev下的 打包路径，然后script/config.js最下面一层层找暴露的文件 

## 5.从入口开始

![image-20210116134630216](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210116134630216.png)

![image-20210116134745843](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210116134745843.png) 

## 6.Vue初始化的过程

![image-20210116141604654](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210116141604654.png)

## 7.Vue初始化-两个问题

flow语法的红线去掉，打开setting.json 语法检测改为true；

Babel JavaScript ：vscode插件，高亮显示；flow 泛型会有问题，后面的代码跳转的问题

## 8.Vue初始化-静态成员

initGlobalAPI

初始化 config：

![image-20210116142741252](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210116142741252.png)

uitl里的方法不推荐使用（内部调用）

Vue.set

Vue..delete

Vue.nextTick

observe 

## 9.Vue初始化-实例成员



![image-20210118214927091](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210118214927091.png)

## 10.Vue初始化-实例成员-InitState

## 11.调试Vue初始化过程

​	四个导出Vue的文件， 看到 Vue构造函数的变化 ，Vue初始化静态成员和实例的过程

## 12.首次渲染过程

##  13.首次渲染过程-总结

![image-20210119214812233](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210119214812233.png)

## 14.数据响应式原理-响应式处理入口

## 15.数据响应式原理-Observer

## 16.数据响应式原理-defineReactive

## 17.数据响应式原理-依赖收集

## 18.数据响应式fen原理-依赖收集-调试

## 19.数据响应式原理-数组

​		把会改变原有数组的元素的方法进行重新修补，当这些方法被调用的时候，dep.notify();observeArray遍历数组中所有的元素，把对象的元素转换成响应式的对象

## 20.数据响应式原理-数组练习

​	arr.length ; arr[0]这两个修改的话·，视图不会更新；因为数组原生的属性和索引没做响应式，只有那几个增删的方法做了响应式

## 21.数据响应式原理-Watcher

## 22.数据响应式原理-调试

## 23.数据响应式原理-总结

![image-20210122073052254](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210122073052254.png)

## 24.动态添加一个响应式属性  

## 25.set源码

两个：1.构造函数中的set方法，静态方法

​			2.实例方法，$set

​			对数组和对象做响应式处理，数组用了Vue的数组方法splice（不是原生数组的方法），对象用了defineReactive把key设置为响应式；然后ob的依赖dep 发送通知notify（）

## 26.set调试

## 27.delete

​		用法和$set一致；一个是新增响应式属性，一个是删除你

## 28.watch回顾 

## 29.三种类型的Watcher

没有静态方法，因为$watch要用到Vue的实例

三种类型：计算属性Watcher，用户Watcher，渲染Watcher

创建顺序：计算属性Watcher，用户Watcher，渲染Watcher

# 

# Vue.js 源码剖析-虚拟Dom

## 1.虚拟Dom概念

​	即使用js对象描述真实Dom：Vue.js中的虚拟Dom借鉴Snabbdom，比如Vue虚拟dom的模块机制，diff算法，钩子函数；并添加了Vue.js的特性，例如指令和组件机制

​	为什么要使用虚拟dom：避免直接操作Dom，提高开发效率；作为一个中间层可以跨平台，支持服务端渲染，以及跨移动端平台；虚拟Dom不一定能提高性能：首次渲染的时候会增加开销，复杂视图情况下提升渲染性能，通过给节点增加key属性，避免大量重用，提高性能

## 2.代码演示

​	new Vue()里面，el指向dom，render里面的h函数作用是创建虚拟节点Vnode，h(tag,data,children)

​	![image-20210124105822919](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210124105822919.png)

h函数的返回结果：

![image-20210124105841287](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210124105841287.png)

## 3.整体过程分析

​		![image-20210124110401639](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210124110401639.png)

## 4.createElement

​	h函数即

​	updateComponent= ()=>{

​		vm._update(vm._render(),hydrating)

}

​	updateComponent

​	update方法将render生成的虚拟Dom Vnode转换成真实Dom

​	render方法在render.js下

​	vm.$createElement和vm._c都是调用createElement方法，区别是第五个参数，前者传true，后者传false ；

​	render函数是用户传递的时候内部调用$createElement，模板编译的时候调用的是后者_c；都是调用createElement

​	updateComponent方法传给new Watcher	

## 5.update

## 6.patch

##### 	createEle:Vnode转换成真实dom并且挂载到dom树上

##### 	patchVnode：对比新旧dom，对比差距，更新到真实dom，即执diff	算法

## 7.updateChildren

## 

## 8.虚拟Dom总结

​		vm._render() > vm._update() > vm. __ patch __()  > createElm(vnode,insertedVnodeQueue) > patchVnode > updateChildren

# 

# Vue.js源码分析---模板编译介绍

## 1.模板编译介绍

开发时，用运行时版本，这时候，不带编译器，体积小，速度快

打包的时候构建时编译+，用webpack把模板编译成render函数

## 2.模板编译的结果

![image-20210202210832437](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210202210832437.png)

​	

### 3.Vue Template Explorer

html转render函数的工具

​	Vue2模板 空格 和 换行 会增加内存

​	Vue3模板 不会

## 4.编译模板的入口

![image-20210211141140013](C:\Users\JUN\AppData\Roaming\Typora\typora-user-images\image-20210211141140013.png)

## 5.模板编译过程

​	入口 》compileToFunctions 》 compile 》 baseCompile-AST 》baseCompile-parse 》

​	AST即抽象语法树，使用对象形式描述树形结构的代码结构，可通过AST对模板做优化处理，标记模板中的静态内容，在patch的过程中静态内容不需要对比和重新渲染

 