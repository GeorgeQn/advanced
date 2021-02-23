一、简答题

1、请简述 Vue 首次渲染的过程。

答：（1）首先进行Vue的初始化，初始化Vue的实例成员以及静态成员。

​		（2）当初始化结束之后，开始调用构造函数，在构造函数中调用this._init(),这个方法相当于整个Vue的入口。

​		（3）在_init中调用this.$mount(),共有两个this.$mount()

​				第一个this.$mount()是entry-runtime-with-compiler.js入口文件，这个$mount()的核心作用是帮我们把模板编译成render函数，但它首先会判断一下当前是否传入了render选项，如果没有传入的话，它会去获取我们的template选项，如果template选项也没有的话，他会把el中的内容作为我们的模板，然后把模板编译成render函数，它是通过compileToFunction()函数，帮我们把模板编译成render函数的，当把render函数编译好之后，它会把render函数存在我们的options.render中。



​				第二个this.$mount()是runtime/index.js中的 this.$mount() 方法，这个方法首先会重新获取el，因为如果是运行时版本的话，是不会走entry-runtime-with-compiler.js这个入口中获取el，所以如果是运行时版本的话，我们会在 runtime/index.js的$mount()中重新获取el。

​		

​		（4）接下来调用mountComponent()，在src/core/instance/lifecycle.js中定义，在这个方法中，首先会判断render选项，如果没有render，但是传入了模板，并且当前是开发环境的话，会发送警告，警告运行时版本不支持编译器，接下来会触发beforeMount这个生命周期中的钩子函数，也就是开始挂在之前

​		（5）然后定义了updateComponet(),在这个方法中，定义了_render 和 _update , _render的作用是生成虚拟Dom， _update的作用是将虚拟DOM转换成真实DOM，并且挂在到页面上来

​		（6）再接下来就是创建Watcher对象，在创建Watcher时，传递了updateComponent这个函数，这个函数最终时在Watcher内部调用的。在Watcher创建之后还调用了get方法，在get方法中，会调用 updateComponent()。

​		（7）然后触发了生命周期的钩子函数mounted挂在结束，最终返回Vue实例

​				



2、请简述 Vue 响应式原理。

​		（1）Vue的响应式是从实例init()方法中开始的，在init（）方法中先调用initState（）初始化Vue实例的状态，在initState方法中调用initData(),initData()是把data属性注入到Vue实例上，并且调用observe(data)将data对象转化成响应式的对象。

​		（2）observe是响应式的入口，在observe（value）中，首先判断传入的参数value是否是对象，如果不是对象直接返回，再判断value对象是否有__ ob __ 这个属性，如果有说明做过了响应式处理，则直接返回，如果没有，创建observer对象，并且返回observer对象。

​		（3）在创建observer对象时，给当前的value对象定义不可枚举的__ ob __ 属性，记录当前的observer对象，然后再进行数组的响应式处理和对象的响应式处理，数组的响应式处理就是拦截数组的几个特殊的方法，push，pop，shift等等，然后找到数组对象中的__ ob __ 对象中的dep,调用dep的notify()方法，再遍历数组中每一个成员，对每个成员调用observer（），如果这个成员是对象的话，也会转换成响应式对象。对象的响应式处理，就是调用walk方法，walk方法就是遍历对象的每一个属性，对每个属性调用defineReactive方法

​		（4）defineReactive会为每一个属性创建对应的dep对象，让dep去收集依赖，如果当前属性的值是对象，会调用observe。defineReactive中最核心的方法是getter和setter。getter的作用是收集依赖，收集依赖时，为每一个属性收集依赖，如果这个属性的值是对象，那也要为子对象收集依赖，最后返回属性的值。在setter中，先保存新值，如果新值是对象，也要调用observe，把新设置的对象也转换成响应式的对象，然后派发更新（发送通知）调用dep.notify()

​		（5）收集依赖时，在watcher对象的get方法中调用pushTarget，记录Dep .target 属性，访问data中的成员的时候收集依赖，defineReactive的getter中收集依赖，把属性对应的watcher对象添加到dep的subs数组中，给childOb收集依赖，目的是子对象添加和删除成员时发送通知。

​		（6）在数据发生变化的时候，会调用dep .notify（）发送通知，dep.notify()会调用watcher对象的update（）方法，update（）中的调用的queueWatcher（）会去判断watcher是否被处理，如果这个watcher对象没有的话，添加到queue队列中，并调用flushScheduleQueue（），flushScheduleQueue（）触发beforeUpdate钩子函数调用watcher.run() ：run() >>>  get() >>> getter() >>> updateComponent()

​		（7）然后清空上一次的依赖

​		（8）触发actived的钩子函数

​		（9）触发updated钩子函数





3、请简述虚拟 DOM 中 Key 的作用和好处。

​		v-for的过程中，为给每一个节点设置key属性的作用

​		以便它能够跟踪每个节点的身份，在进行比较的时候，会基于key的变化重新排列元素顺序，并且会移出key不存在的元素。方便让vnode在diff的过程中找到对应的界定啊，然后成功复用。

​		好处：可以减少dom的操作，减少diff和渲染所需要的时间，提升了性能。



4、请简述 Vue 中模板编译的过程。

​		（1）编译的入口函数会从compileToFunctions开始，寻找缓存中的编译结果，如有缓存直接返回；没有则调用compile（），将模板编译为对象将编译的字符串形式的js代码转为函数形式，然后缓存并返回。

​		（2）在compile中合并选项，调用baseCompile编译，记录错误返回编译好的对象

​		（3）baseCompile作为核心内容：调用parse()将模板字符串转为抽象语法树AST；调用optimize ()优化抽象语法树，标记静态节点&静态根节点，使得patch中可跳过；调用generate把抽象语法树转为字符串形式的js代码