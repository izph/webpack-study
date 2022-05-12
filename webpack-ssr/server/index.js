if (typeof window === 'undefined') {
    global.window = {};
}

const Koa = require('koa');
const Router = require('koa-router')
const router = new Router()
const path = require('path');

const static = require('koa-static');
const { renderToString } = require('react-dom/server');
const renderMarkup = require('./utils.js');
const SSR = require('../dist/index-server');

const data = require('./data.json');

const server = (port) => {
    const app = new Koa();

    // 静态资源目录对于相对入口文件index.js的路径
    const staticPath = './dist'

    app.use(static(
        path.join(__dirname, staticPath)
    ))

    router.get('/test', async (ctx) => {
        const html = renderMarkup(renderToString(SSR), data);
        ctx.body = html;
    })

    // 加载路由中间件
    app.use(router.routes())

    app.listen(port, () => {
        console.log('Server is running on port:' + port);
    });
};

server(process.env.PORT || 4000);