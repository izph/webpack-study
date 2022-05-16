
const path = require('path');
module.exports = {
    mode: 'development',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    // path.resolve(__dirname, 'loaders/console-loader/index.js')
                    loader: 'console-loader',
                    options: {
                        data: "console-loader"
                    }
                }
            }
        ]
    },
    resolveLoader: {
        modules: ['node_modules', path.resolve(__dirname, 'loaders')]
    }
}