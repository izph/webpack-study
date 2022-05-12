const { runLoaders } = require('loader-runner');
const fs = require('fs');
const path = require('path');

runLoaders({
    resource: path.join(__dirname, './loaders/index.css'),  // 资源绝对路径
    // 需要执行的loader，绝对路径
    loaders: [
        path.resolve(__dirname, './loaders/sprite-loader')
    ],
    // 读取资源的函数
    readResource: fs.readFile.bind(fs)
}, (err, result) => {
    // 打印结果
    err ? console.log(err) : console.log(result);
});