/** 
 * 手写清除console的loader
 * 参考：https://juejin.cn/post/7038413043084034062
 * loader实际上就是一个函数，但他不能是一个箭头函数，因为它需要继承webpack的this。
 * 多个loader是从右向左调用，上一个loader将结果返回给下一个loader使用
 * 输入输出都是字符串或者二进制数据，在loader函数中直接返回数字类型，会报错
 */


// webpack5 已经可以通过this.query直接获取loader的options配置，所以不需要利用loader-utils工具获取
// webpack5 内置了terser-webpack-plugin，如果使用的是webpack5，同时需要自定义配置，那么仍需要安装terser-webpack-plugin
// uglifyjs-webpack-plugin只支持ES5，terser-webpack-plugin支持ES6，压缩js，清除console前缀的语句

// source：表示当前要处理的内容
const reg = /(console.log()(.*)())/g;

function ConsoleLoader(source) {
    const { data } = this.query;
    console.log('data', data)
    // 通过正则表达式将当前处理内容中的console替换为空字符串
    source = source.replace(reg, "")
    // 再把处理好的内容return出去，坚守输入输出都是字符串的原则，并可达到链式调用的目的供下一个loader处理
    return source;
}

module.exports = ConsoleLoader;