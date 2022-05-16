// 一个loader其实就是一个函数

const { tplReplace } = require('../utils/tplReplace.js');
const loaderUtils = require('loader-utils');


function tplLoader(source) {

    // 去掉模板所有的空格
    const newSource = source.replace(/\s+/g, '');
    const { log } = loaderUtils.getOptions(this);
    const _log = log ? `console.log('compiled the file which is from ${this.resourcePath}')` : '';
    return `
        export default (options) => {
            ${tplReplace.toString()}
            ${_log.toString()}
            return tplReplace('${newSource}', options);
        }    
    `
}

module.exports = tplLoader;