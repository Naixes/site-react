const HtmlWebpackPlugin = require('html-webpack-plugin')
const {join, resolve} = require('path')

module.exports = {
    mode: 'development',
    // 会合并
    output: {
        assetModuleFilename: 'images/[name][ext]',
        filename: 'scripts/[name].bundle.js'
    },
    devServer: {
        historyApiFallback: true,
        contentBase: join(__dirname, '../dist'),
        // host: '0.0.0.0', // 有默认，不设也行
        // inline: true, // 监听文件变化，iframe模式效果一样，默认inline，不设也行
        // quiet: true, // 关闭错误警告，配合friendly-error-webpack-plugin和node-notifier或者webpack-build-notifier
        port: 8082,
        watchContentBase: true
    },
    devtool: 'source-map', //代码映射
    plugins: [
        new HtmlWebpackPlugin({
            // 自定义属性，模版中可以获取
            // <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'naixes',
            filename: 'index.html',
            template: resolve(__dirname, '../src/index-dev.html')
        })
    ]
}