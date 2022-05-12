const { runLoaders } = require('loader-runner');
const fs = require('fs');
const path = require('path');

runLoaders({
    resource: path.join(__dirname, './src/demo.txt'),  // 资源绝对路径
    // 需要执行的loader，绝对路径
    loaders: [
        {
            loader: path.join(__dirname, './src/raw-loader.js'),
            options: {
                name: 'test'
            }
        }
    ],
    // 额外的loader 上下文参数
    context: {
        minimize: true, // 压缩
        emitFile: () => { }
    },
    // 读取资源的函数
    readResource: fs.readFile.bind(fs)
}, (err, result) => {
    // 打印结果
    err ? console.log(err) : console.log(result);
});