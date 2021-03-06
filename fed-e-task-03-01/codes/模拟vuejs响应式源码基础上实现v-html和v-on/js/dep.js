/*
 * @Descripttion: 
 * @version: 
 * @Author: QinJiaJun
 * @Date: 2020-12-06 12:05:57
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-06 13:40:30
 */
class Dep{
	constructor(){
		// 储存所有观察者
		this.subs = []
	}
	// 添加观察者
	addSub(sub){
		if(sub && sub.update){
			this.subs.push(sub)
		}
	}
	// 发送通知
	notify(){
		this.subs.forEach(sub => {
			sub.update()
		})
	}
}