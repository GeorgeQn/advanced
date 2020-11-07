/*
 * @Descripttion: 
 * @version: 
 * @Author: QinJiaJun
 * @Date: 2020-11-05 23:03:16
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-07 12:11:13
 */
const path = require('path')
const common = require('./webpack.common')
const {merge} = require('webpack-merge')

const { CleanWebpackPlugin } = require('clean-webpack-plugin') 
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge(common,{
    mode:'production',
    devtool:false,
    plugins:[
        new CopyWebpackPlugin([
            path.resolve(__dirname,'public/favicon.ico')
        ]),
        new CleanWebpackPlugin()
    ]
}) 