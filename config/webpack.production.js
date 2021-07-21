const HtmlWebpackPlugin = require('html-webpack-plugin')
const {join, resolve} = require('path')
// 压缩，不提取css的情况下有默认压缩
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// 清除代码
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    mode: 'production',
    output: {
        assetModuleFilename: 'images/[name].[contenthash:5].bundle.[ext]',
        filename: 'scripts/[name].[contenthash:5].bundle.js',
        // 静态资源访问路径，cdn/公共目录
        publicPath: '/assets'
    },
    optimization: {
        minimize: true,
        // 将webpack运行时提取为公共代码
        runtimeChunk: {
            name: 'runtime',
        },
        // 代码分割
        // https://segmentfault.com/a/1190000039730567
        splitChunks:{
            chunks:"async", // initial all  函数
            minChunks:1, // 最少被引用次数，超出才分割
            maxAsyncRequests:5, // 并行最大请求数
            maxInitialRequests:3,
            name:false, // 不重新命名
            cacheGroups: {
                commons: {
                    chunks: "initial",
                    minChunks: 2,
                    name: "commons"
                }
            },
            minSize:{
                // 单位字节
                javascript: 100000,
                style: 100000,
            },
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // 自定义属性，模版中可以获取
            // <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'naixes',
            filename: 'index.html',
            template: resolve(__dirname, '../src/index-prod.html'),
            // 压缩
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            // cssnano，清除无用css
            // 报错，this.options.cssProcessor.process is not a function
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                preset: [
                    'defaut',
                    {
                        discardComments: {
                            removeAll: true
                        }
                    }
                ]
            }
        })
    ]
}