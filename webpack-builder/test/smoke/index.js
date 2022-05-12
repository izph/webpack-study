const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
// 摩卡  单元测试用例
const Mocha = require('mocha');

const mocha = new Mocha({
    timeout: '10000ms'
});

// 进入的template目录
process.chdir(path.join(__dirname, 'template'));

// 删除dist成功的回调
rimraf('./dist', () => {
    const prodConfig = require('../../lib/webpack.prod.js');

    webpack(prodConfig, (err, stats) => {
        // 错误
        if (err) {
            console.error(err);
            process.exit(2);
        }
        // 成功
        console.log(stats.toString({
            colors: true,
            modules: false,
            children: false
        }));

        console.log('Webpack build success, begin run test.');

        mocha.addFile(path.join(__dirname, 'html-test.js'));
        mocha.addFile(path.join(__dirname, 'css-js-test.js'));
        mocha.run();
    });
});