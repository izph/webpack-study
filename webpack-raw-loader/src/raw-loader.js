// 在loader里面通过loader-utils的getOptions方法获取参数
const loaderUtils = require('loader-utils');
const fs = require('fs');
const path = require('path');

// loader在options传递参数

module.exports = function (source) {
    // 在loader里面通过loader-utils的getOptions方法获取参数
    const { name } = loaderUtils.getOptions(this);
    console.log('name', name);

    // interpolateName用来替换占位符
    const url = loaderUtils.interpolateName(this, "[name].[ext]", {
        source,
    });
    // name.ext  如 index.js
    console.log(url);

    // loader进行文件输出，this.emitFile(指定位置, 输出的内容)
    this.emitFile(path.join(__dirname, url), source);

    // webpack中默认开启loader缓存，使用this.cacheable(false)关闭缓存，cacheable: false
    // this.cacheable(false);

    /** 
     * 避免安全性问题：
     * 编码为2028的字符为行分隔符，会被浏览器理解为换行，而在Javascript的字符串表达式中是不允许换行的，从而导致错误。
     * 2029为段分隔号，同理
    */
    const json = JSON.stringify(source)
        .replace('foo', '')
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029');


    // 模拟异步loader异步场景，需要this.async(error对象，处理结果);
    // const callback = this.async();
    // fs.readFile(path.join(__dirname, './async.txt'), 'utf-8', (err, data) => {
    //     if (err) {
    //         callback(err, '');
    //     }
    //     callback(null, data);
    // });
    // 


    // 抛出异常-方法一
    // throw new Error('Error');
    // 抛出异常-方法二
    // this.callback(new Error('Error'), json);


    // 返回结果-方式一
    return `export default ${json}`;
    // 返回结果-方式二  result: ['bar', 2, 3, 4]
    // this.callback(null, json, 2, 3, 4);

}

// 对编写loader有点不解的地方就是像this.emitFile 和this.callback 还有this.async这些方法是什么时候挂载到this这个对象上面的


// 首先loader都是一个函数，然后都会被loader-runner这个上下文调用，想要访问别的上下文也就是this,
// 在调用这个loader函数的时候无非也就是call, apply, bind和对象方法调用。