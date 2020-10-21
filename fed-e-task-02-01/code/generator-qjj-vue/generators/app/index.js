/*
 * @Descripttion: 
 * @version: 
 * @Author: QinJiaJun
 * @Date: 2020-10-21 15:27:58
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-21 15:55:07
 */
const Generator = require('yeoman-generator')

module.exports = class extends Generator{
    prompting () {
        return this.prompt([
            {
                type:'input',
                name:'name',
                message:'Your project name plz',
                default: this.appname
            }
        ])
        .then(answers => {
            this.answers = answers
        })
    }

    writing(){
        const templates = [
            './templates/public/favicon.ico',
            './templates/public/index.html',
            './templates/src/main.js',
        ];
        const context = this.answers;
        templates.forEach(item => {
            this.fs.copyTpl(
                this.templatePath(item),
                this.destinationPath(item),
                context
            )
        })
    }
}