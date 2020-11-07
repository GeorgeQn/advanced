/*
 * @Descripttion: 
 * @version: 
 * @Author: QinJiaJun
 * @Date: 2020-11-05 23:03:16
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-07 12:18:30
 */
const path = require('path')
const webpack = require('webpack')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')


/**
 * @type {import('webpack').Configuration}
 */


module.exports = {
    mode:'none',//webpack4之后必须设置，否则会警告
    entry:'./src/main.js',
    output:{
        path:path.join(__dirname,'dist'),
        filename:'js/bundle.[contenthash:6].js'//设置hash值，并将文件放置在dist/js下
        //hash值有三种：hash，chunkhash，contenthash
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]   
            },
            {
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ]
            },
            {
                test:/\.vue$/,
                use:'vue-loader'
            },
            {
                //注：可以直接使用file-loader处理图片文件，不过配合url-loader更好
                // url-loader可以将小文件直接转化为base64格式，减少资源请求
                // 在遇到不符合条件的文件时，会使用file-loader处理文件
                test:/\.(png|jpe?g|gif)$/,
                use:{
                    loader:'url-loader',//适合小文件，转换未base64
                    options:{
                        name:"img/[name].[contenthash:6].[ext]",
                        limit:8 * 1024, //8kb 超出则使用file-loader
                        esModule:false
                    }
                }
            },
        ]
    },
    plugins:[
        new VueLoaderPlugin(),//将rules中的规则运用到vue单文件组件中
        // new CleanWebpackPlugin(),//每次打包前先自动清除原有文件
        new HtmlWebpackPlugin({
            title:'Webpack Vue',
            favicon:path.resolve(__dirname,'public/favicon.ico'),
            template:path.resolve(__dirname,'public/index.html')
        }),
        new webpack.DefinePlugin({
            BASE_URL:'"/"'
        }),
        // new CopyWebpackPlugin([
        //     path.resolve(__dirname,'public/favicon.ico')
        // ])
    ],
    
}