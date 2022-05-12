// eslint ./lib --fix 自动处理空格
// 现在 babel-eslint 已经声明弃用, 改为 @babel/eslint-parser
// npm install eslint @babel/core @babel/eslint-parser -D
module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb-base",
    "env": {
        "browser": true,
        "node": true
    }
};