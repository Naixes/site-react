const merge = require('webpack-merge')
const {join, resolve} = require('path')
const argv = require('yargs-parser')(process.argv.slice(2))
// console.log(process.argv.slice(2));
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const cssLoader = [
    // 提取css，下面配置输出文件
    MiniCssExtractPlugin.loader,
    {
        // 加载css文件，成为js的一部分（读取成字符串），可以解析@import这种语法，解析路径
        loader: 'css-loader',
        options: {
            // 处理css中@import引入的
            // 0表示只使用css-loader，1表示要经过postcss-loader解析
            importLoaders: 1
        }
    },
    {
        // 解析css next
        loader: 'postcss-loader'
    }
]

const _mode = argv.mode || 'development'
const _isProd = _mode === 'production'
console.log(_mode);
const _mergeConfig = require(`./config/webpack.${_mode}.js`)

const baseConfig = {
    entry: {
        app: resolve('src/index.tsx')
    },
    output: {
        path: join(__dirname, './dist/assets')
    },
    module: {
        rules: [
            // 解析ts和js
            {
                test: /\.(js|ts|jsx|tsx)$/,
                include: [resolve('src')],
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(css|scss)$/,
                use: cssLoader
            },
            // 资源解析，之前需要file-loader，url-loader单独处理图片，字体等，现在webpack5已经内置了，可以直接使用
            {
                test: /\.(png|jpeg|gif|eot|woff|woff2|ttf|svg|otf|webp)$/,
                type: 'asset'
            }
        ]
    },
    // 不需要打包的
    external: {
        // react:"react",
    },
    resolve: {
        alias: {
            "@assets": resolve("src/assets"),
            "@components": resolve("src/components"),
            "@models": resolve("src/models"),
            "@routes": resolve("src/routes"),
            "@pages": resolve("src/pages"),
            "@utils": resolve("src/utils"),
            "@recoil": resolve("src/recoil"),
            "@hooks": resolve("src/hooks"),
            "@api": resolve("src/api"),
        },
        extensions: [".js", ".ts", ".tsx", '.jsx']
    },
    plugins: [
        // 配置css输出文件
        new MiniCssExtractPlugin({
            filename: _isProd ? 'styles/[name].[contenthash:5].css' : 'styles/[name].css',
            chunkFilename: _isProd ? 'styles/[id].[contenthash:5].css' : 'styles/[id].css',
            // 忽略css引入顺序不同，消除警告
            ignoreOrder: true
        })
    ]
}

module.exports = merge.default(baseConfig, _mergeConfig) 