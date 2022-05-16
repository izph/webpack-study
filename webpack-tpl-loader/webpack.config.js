const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: resolve(__dirname, 'src/index.js'),
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tpl$/, // 匹配loader需要处理的文件
                use: [
                    'babel-loader',
                    {
                        // 将tpl转化成字符串，交由babel-loader
                        loader: 'tpl-loader',
                        // loader: resolve(__dirname, 'loaders/tpl-loader'),  // 引入本地的tpl-loader
                        options: {
                            log: true,
                        }
                    }
                ]
            }
        ]
    },
    resolveLoader: { 
        modules: ['node_modules', resolve(__dirname, 'loaders')] 
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve(__dirname, 'index.html')
        }),
    ],
    devServer: {
        port: 3003
    }
}