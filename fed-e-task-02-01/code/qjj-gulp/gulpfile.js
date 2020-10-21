/*
 * @Descripttion: 
 * @version: 
 * @Author: QinJiaJun
 * @Date: 2020-10-20 17:19:49
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-21 11:03:00
 */

 //gulp重要的是流思想，一个入口文件，一个过程，然后输出一个出口文件
 
const {src,dest,parallel,series,watch} = require('gulp')//引入gulp依赖，
// src找源文件，dest指定路径新建构建后文件，parallel并行执行任务（即同时进行），series串行执行任务（即按顺序进行），
//watch是监听文件的变化
const del = require('del')
const browserSync = require('browser-sync') //Browsersync能让浏览器实时、快速响应您的文件更改（html、js、css、sass、less等）并自动刷新页面。
const bs = browserSync.create()
const loadPlugins = require('gulp-load-plugins')//gulp-load-plugins这是一款批量引入package.json文件中的依赖项工具。
const plugins = loadPlugins()

// 清除dist和temp文件夹，重置的作用
const clean = () => {
    return del(['dist','temp'])
}

const style = () => {
    return src("src/assets/styles/*.scss",{base:'src'})
    .pipe(plugins.sass({outputStyle:'expanded'}))
    .pipe(dest('temp'))
    .pipe(bs.reload({stream:true}))
}

const script = () => {
    return src('src/assets/scripts/*.js',{base:'src'})
    .pipe(plugins.babel({presets:['@babel/preset-env']}))
    .pipe(dest('temp'))
    .pipe(bs.reload({stream:true}))
}

//指定html文件到目标文件
const page = () => {
    return src('src/*.html',{base:'src'})
    .pipe(plugins.swig({data,defaults:{cache:false}}))//防止模板缓存导致页面不能及时更新
    .pipe(dest('temp'))
    .pipe(bs.reload({stream:true}))
}

//压缩图片
const image = () => {
    return src('src/assets/images/**', {base:'src'})
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

//压缩font字体图标
const font = () => {
    return src('src/assets/fonts/**',{base:'src'})
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

//
const extra = () => {
    return src('public/**',{base : 'public'})
    .pipe(dest('dist'))
}


//监听更新的代码，热更新服务器
const serve = () => {
    watch('src/assets/style/*.scss',style) //开发环境scss改变，后走style方法
    watch('src/assets/style/*.js',script)
    watch('src/*.html',page)

    watch([
        'src/assets/images/**',
        'src/assets/fonts/**',
        'public/**'
    ],bs.reload)
}

//browser-sync插件听一个一个静态服务器
bs.init(
    {
        notify:false,
        port:2080,
        server:{
            baseDir:['temp','src','public'],
            routes:{
                '/node_modules':'node_modules'
            }
        }
    }
)

//压缩js，css，html
const useref = () => {
    return src('temp/*.html',{base:'temp'})
    .pipe(plugins.if(/\.js$/,plugins.uglify()))
    .pipe(plugins.if(/\.css$/,plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/,plugins.htmlmin({
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true
    })))
}

//处理src文件转换成浏览器可识别的任务
const compile = parallel(style,script,page)

// 开发环境
const develop = series(compile,serve)


// 上线环境
const build = series(
    clean,
    parallel(
        series(compile,useref),
    )
)


//导出，然后例如 yo clean ， yo develop这样在node.js环境下执行 
module.exports = {
    clean,
    develop,
    build      
}