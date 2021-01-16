/*
 * @Descripttion: 
 * @version: 
 * @Author: QinJiaJun
 * @Date: 2020-12-06 11:44:19
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-06 13:27:00
 */
class Vue{
    constructor(options){
            //1.通过属性保存选项的数据
        this.$options = options
            if(options.methods){
                this.initMethods(this,options.methods)
            }
            this.$data = options.data
            this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el,
            //2.把data中的成员转换成getter和setter，注入到vue实例中
            this._proxyData(this.$data)
            //3.调用observer对象，监听数据的变化
            new Observer(this.$data)
            //4.调用compiler对象，解析指令和差值表达式
            new Compiler(this)
    }
    initMethods(vm,methods){
        for(let key in methods){
            vm[key] = typeof methods[key] == 'function' && methods[key]
        }
    }
    _proxyData(data){
        //遍历data中的所有属性
        Object.keys(data).forEach(key => {
            //把data的属性注入到vue实例中
            Object.defineProperty(this,key,{
                enumerable:true,
                configurable:true,
                getr(){
                   return data[key] 
                },
                set(newValue){
                    if(newValue === data[key]) return
                    data[key] = newValue
                }
            })
        })
    }
}