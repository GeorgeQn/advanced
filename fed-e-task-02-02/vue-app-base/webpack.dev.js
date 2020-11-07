/*
 * @Descripttion: 
 * @version: 
 * @Author: QinJiaJun
 * @Date: 2020-11-05 23:03:16
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-07 12:12:09
 */
const path = require('path')
const common = require('./webpack.common') 
const {merge} = require('webpack-merge')

module.exports = merge(common,{
    mode:'development',
    devtool:'cheap-eval-module-source-map',
    devServer:{
        contentBase:path.join(__dirname,'dist'),//资源路径
        hot:true,//是否热加载
        open:true,//是否自动打开
        port:8081//接口
    }
}) 