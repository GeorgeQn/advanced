// 简单题 一：
//JS是语言是单线程，某个特定的时间点只有特定代码能够执行，并阻塞其他代码。
//回调函数做到了异步编程，但是会有错误处理和嵌套上的副作用，ES6的promise做到了解决这个的作用，并一直发展到现在的ES7的async和await。
//EventLoop是一个程序结构，JS上主线程外会有一个消息队列，作用是等待异步任务的结果，异步任务有了运行结果后，就会加入到消息队列上排队执行
//宏任务可以理解为主队列中的同步任务，而微任务就是同步任务上额外的任务，不需要等到重新等待宏任务走完再执行微任务。


//代码题 一：
function someWord(word, time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(word);
            resolve();
        }, time)
    })
}
someWord('hello', 10) + someWord('lagou', 10) + someWord('I ❤ U', 10);


//代码题 二：
const fp = require('lodash/fp');
const { reject } = require('lodash');
// horsepower 马力，dollar_value 价格，in_stock 库存
const cars = [
    { name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true },
    { name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false },
    { name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false },
    { name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false },
    { name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true },
    { name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false }
]
//1.
const carsLastInStock = fp.flowRight(fp.prop('in_stock'), fp.last());
console.log(carsLastInStock(cars));
//2.
const carsFirstName = fp.flowRight(fp.prop('name'), fp.first());
console.log(carsFirstName(cars));
//3.
let _average = function (xs) { return fp.reduce(fp.add, 0, xs) / xs.length }
const averageDollarValue = fp.flowRight(_average, fp.map(value => value.dollar_value))
console.log(averageDollarValue(cars))
//4.
let _underscore = fp.replace(/\W+/g, '_') // <-- 无须改动，并在 sanitizeNames 中使用它
const sanitizeNames = fp.flowRight(fp.map(_underscore), fp.map(fp.toLower), fp.map(value => value.name));
console.log(sanitizeNames(cars));

//代码题三
//1.使用 fp.add(x, y) 和 fp.map(f, x) 创建一个能让 functor 里的值增加的函数 ex1
// const fp = require('lodash/fp')
const { Maybe, Container } = require('./support');
let ex1 = maybe.map(x => fp.map(fp.add(1),x))
console.log(ex1);
//2.练习2：实现一个函数 ex2，能够使用 fp.first 获取列表的第一个元素
let ex2 = fp.map(fp.first)
console.log(xs.map(ex2))
//练习3：实现一个函数 ex3，使用 safeProp 和 fp.first 找到 user 的名字的首字母
let ex3 = fp.flowRight(fp.map(fp.first), safeProp('name'))
console.log(ex3(user))
//练习4：使用 Maybe 重写 ex4，不要有 if 语句
let ex4 = fp.flowRight(fp.map(parseInt), Maybe.of)
//题目四，手写myPromise 源码

//promise是一个类
class myPromise {
    constructor(executor) {
        //promise有三个状态，pending fulfilled rejected，pending之后一旦执行一个状态，就不会改变状态
        //初始化state为等待状态
        this.state = 'pending';
        //成功的值
        this.value = undefined;
        //失败的值
        this.reason = undefined;
        //成功回调存放的数组
        this.onResolvedCallbacks = [];
        //失败回调存放的数组
        this.onRejectedCallbacks = [];
        let resolve = value => {
            //如果state状态改变，resolve调用就会失败
            if (this.state === 'pending') {
                //state调用后，状态改为成功态
                this.state = 'fulfilled'
                //储存成功的值
                this.value = value;
                //一旦resolve执行， 调用每一个数组里的成功方法
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        };
        let reject = reason => {
            //如果state状态改变，reject调用就会失败
            if (this.state === 'pending') {
                //state调用后，状态改为失败态
                this.state = 'rejected';
                //储存失败的值
                this.reason = reason;
                //一旦rejected执行，调用每一个数组里的失败方法
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        };
        //如果executor执行报错，直接执行reject
        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err)
        }
    }

    //promise里面有then方法，有两个参数，onFulfilled和onRejected
    //考虑到异步情况，状态还为pending时，先分别储存成功和失败的回调，又由于pending可以有多个then，把方法都存在一个数组里；当分别状态为resolve或是reject时，立刻调用数组里的各自成功和失败回调方法
    //链式调用，new Promise().then().then(),每个then()里面返回一个新promise，这里声明为promise2;需要判断第一个then() return出来的值，新promise出来的onFulfilled()或onRejected的值，声明resolvePromise方法判断return出来的x值
    then(onFulfilled, onRejected) {
        //判断onFulfilled，如果不是函数，忽略onFulfilled，直接返回value；
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        //判断onRejected，如果不是函数，忽略onRejected，直接返回value；
        onRejected = typeof onRejected === 'function' > onRejected : err => { throw err };
        let promise2 = new myPromise((resolve, reject) => {
            if (this.state === 'fulfilled') {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, rejcet)
                    }
                    catch (e) {
                        reject(e);
                    }
                }, 0)
            }
            if (this.state === 'rejected') {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, rejcet)
                    }
                    catch (e) {
                        reject(e)
                    }
                }, 0)
            }
            if (this.state === 'pending') {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, rejcet)
                        }
                        catch (e) {
                            reject(e);
                        }
                    }, 0)
                });
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, rejcet)
                        }
                        catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
            }
        });
        return promise2;
    }
}


//声明的resolvePromise函数是为了判断上面promise返回出来的x值得类型
// 1.x是Object或者Function，继续
// 2.x不能是null
// 3.x是普通值，直接resolve（x）
// 4.x如果是对象或者函数， let then = x.then
// 5.声明then
// 6.如果then报错，走reject（）
// 7.如果then是个函数，则call来执行then第一个参数是this，后面参数是成功或者失败得回调
// 8.如果成功的对象还是promise，递归继续解析，
// 9.成功和失败只能调用一个，声明一个called状态来防止多次调用
function resolvePromise(promise2, x, resolve, rejcet) {
    //循环引用报错
    if (x === promise2) {
        //reject报错
        return reject(new TypeError('Chaining cycle detected for promise'));
    }
    //防止多次调用
    let called;
    // x不是null，并且是对象或者函数
    if (x != null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then;
            //如果then是函数，就默认是promise
            if (then === 'function') {
                then.call(x, y => {
                    if (called) return;
                    called = true;
                }, err => {
                    if (called) return;
                    called = true;
                })
            } else {
                resolve(x);
            }
        } catch (e) {
            //失败
            if (called) return;
            called = true;
        }
    } else {
        //如果then是对象，直接成功输出x即可
        resolve(x);
    }
}


//promise的catch,resolve,reject,race,all方法

myPromise.resolve = function(val){
    return new myPromise((resolve,reject)=>{
        resolve(val)
    });
}

myPromise.rejcet = function(val){
    return new myPromise((resolve,reject)=>{
        reject(val)
    })
}

myPromise.all = function (promises) {
    let arr = [];
    let i = 0;
    function processData(index,data) {
        arr[index] = data;
        i++;
        if(i == promises.length){
            resolve(arr)
        }
    };
    return new myPromise((resolve,reject)=>{
        for(let i = 0 ;i < promises.length;i++){
            promises[i].then(data => {
                processData(i,data)
            },reject)
        }
    })
}