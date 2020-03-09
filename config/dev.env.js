'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  //webpack.definePlugin 要求 字符串变量 单引号里面包双引号  变量替换成指定的内容
  //变量用的时候 直接就是字符串
  NODE_ENV: '"development"'
})
