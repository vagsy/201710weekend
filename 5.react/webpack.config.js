let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  //指定入口文件
  entry: './src/index.js',
  //指定输出的位置
  output: {
    //输出的路径，必须放一个绝对路径
    path: path.resolve('build'),
    //打包后的文件名
    filename: 'bundle.js'
  },
  //配置模块
  module: {
    //转译的规则 什么样的文件，用什么样的预设来进行转译
    rules: [
      //如果加载的模块的文件名是以.js结尾的话，用babel来加载
      //还要为babel配置三个预设,分别编译es6 es7 react
      {
        test: /\.js$/,
        loader: 'babel-loader',
        //不扫描node_modules里面的文件
        exclude:/node_modules/,
        query: {
        presets: ["es2015", "stage-0", "react"]
      }
      },
      //如果要加载的模块是以.css结尾的话，使用css style loader
      {test: /\.css$/, loaders: ["style-loader", "css-loader"]},
      {
        test: /\.(jpg|png|gif|eot|svg|woff|woff2|ttf)$/,
        loader: 'url-loader'
      }
    ]
  },
  //插件
  plugins: [
    //用来自动产出html文件,并且向里面插入打包后的JS文件
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
}