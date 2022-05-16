const JSZip = require('jszip');
const path = require('path');
const RawSource = require('webpack-sources').RawSource;
const zip = new JSZip();

module.exports = class ZipPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        // tap/tapAsync 同步、异步钩子
        compiler.hooks.emit.tapAsync('ZipPlugin', (compilation, callback) => { // compilation对象
            // 没传filename 默认为 example
            const zipFileName = this.options.filename || 'example';
            // 创建目录
            const folder = zip.folder(zipFileName);

            for (let filename in compilation.assets) {
                // source存放的是main.js里面的代码
                const source = compilation.assets[filename].source();
                // 添加文件  main.js
                folder.file(filename, source);
            }
            // 将zip对象上的文件生成出来
            zip.generateAsync({
                // 还有很多参数可以设置
                type: 'nodebuffer'  // glob  
            }).then((content) => {
                // console.log(content)  content是一个buffer

                // compilation.options.output.path  是在webpack.config.js设置的出口dist目录
                // const outputPath = path.join(
                //     compilation.options.output.path,
                //     zipFileName + '.zip'
                // );
                // 把绝对路径转化为相对路径，把路径设置为dist的相对路径
                // const outputRelativePath = path.relative(
                //     compilation.options.output.path,
                //     outputPath
                // );
                // 把buffer转化成 source
                // compilation.assets[outputRelativePath] = new RawSource(content);

                
                compilation.assets[`${zipFileName + '.zip'}`] = new RawSource(content);
                callback();
            });
        });
    }
}