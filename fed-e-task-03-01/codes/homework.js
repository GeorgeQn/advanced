/** 一、简答题 */
// 一、简答题
// 1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如何把新增成员设置成响应式数据，它的内部原理是什么。
let vm = new Vue({
    el: '#el',
    data: {
     o: 'object',
     dog: {}
    },
    method: {
     clickHandler () {
      // 该 name 属性是否是响应式的
      this.dog.name = 'Trump'
     }
    }
   })
//解答：不是响应式的 ，在Vue初始化的过程中将data选项中的值利用Object.defineProperty中的get/set将其转化为
//响应式。新增成员不是响应式。
//可以利用Vue.$set()将其转化为响应式。实现原理利用了Vue的Observer将其属性设置为响应式

//2、请简述 Diff 算法的执行过程
// 解答：

// diff 的过程就是调用名为 patch 的函数，比较新旧节点，一边比较一边给真实的 DOM 打补丁
// patch 函数接收两个参数 oldVnode 和 Vnode 分别代表新的节点和之前的旧节点,这个函数会比较 oldVnode 和 vnode 是否是相同的, 即函数 sameVnode(oldVnode, vnode), 根据这个函数的返回结果分如下两种情况：
// true：则执行 patchVnode
// false：则用 vnode 替换 oldVnode
// patchVnode 这个函数做了以下事情：
// 找到对应的真实 dom，称为 el
// 判断 vnode 和 oldVnode 是否指向同一个对象，如果是，那么直接 return
// 如果他们都有文本节点并且不相等，那么将 el 的文本节点设置为 vnode 的文本节点。
// 如果 oldVnode 有子节点而 vnode 没有，则删除 el 的子节点
// 如果 oldVnode 没有子节点而 vnode 有，则将 vnode 的子节点真实化之后添加到 el
// 如果两者都有子节点，则执行 updateChildren 函数比较子节点，这一步很重要
// 给新老节点定义开始、结束索引
// 循环比对新节点开始VS老节点开始、新节点结束VS老节点结束、新节点开始VS老节点结束、新节点结束VS老节点开始并移动对应的索引，向中间靠拢根据新节点的key在老节点中查找，没有找到则创建新节点。
// 循环结束后，如果老节点有多的，则删除。如果新节点有多的，则添加





/** 二、编程题 */
// 1、模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。
let _Vue = null
export default class VueRouter{
    static install(vue){
        //1.判断当前插件是否被安装
        if(VueRouter.install.installed) return
        VueRouter.install.installed = true
        //2.把Vue的构造函数记录在全局
        _Vue = vue
        //3.把创建Vue的实例传入的router对象注入到Vue实例
        //_Vue.prototype.$router = this.$options.router
        _Vue.mixin({
            beforeCreate(){
                if(this.$options.router){
                    _Vue.prototype.$router = this.$options.router
                }
            }
        })
    }   

    constructor(options){
        this.mode = options.mode || "hash"
        this.routes = options.routes
        this.routeMap = {}
        //observable
        this.data = _Vue.observable({
            current:'/'
        })
        this.init()
    }
    init(){
        this.initRouteMap()
        this.initComponent(_Vue)
        this.initEvent()
    }
    initRouteMap(){
        //遍历所有路由信息，把组件和路由的映射记录到routeMap对象中
        this.routes.forEach(route=>{
            this.routeMap[route.path] = route.component
        })
    }
    initComponent(Vue){
        //创建 router-link 和 router-view 组件
        const self = this
        Vue.component('router-link',{
            props:{
                to:String
            },
            render(h){
                return h("a",{
                    attrs:{
                        href:self.mode === 'history' ? '' : '#' + this.to
                    },
                    on:{
                        click:self.mode === 'history' ? this.clickHandler : this.hashClickhander
                    }
                },[this.$slot.default])
            },
            methods:{
                clickHandler(e){
                    history.pushState({},"",this.to)
                    this.$router.data.current = this.to
                    e.preventDefault()
                },
                hashClickhander(e){
                    this.$router.data.current = this.to
                },
            }
        })
    }
    initEvent(){
        //注册popstate事件 ，当路由地址发生变化，重新记录当前的路径
        const eventType = this.mode ==='history' ? 'popstate' : 'hashchange'
        const handle = this.mode === 'history' ? this.getLocation : this.getHash
        window.addEventListener(eventType,handle.bind(this))
    }
    getLocation(){
        this.data.current = window.location.pathname
    }
    getHash(){
        let href = window.location.href
        const index = href.indexOf('#')
        if(index < 0) return '/'
        this.data.current = href.slice(index+1)
    }

}

//2.在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令